// Prevedie dodané originály (2-9 MB, až 6048 px) na responzívne AVIF + WebP
// varianty a vygeneruje manifest s rozmermi a LQIP placeholderom.
// Spustenie: npm run images

import sharp from "sharp";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { PHOTOS, LOGO_SRC, SOURCE_ROOT, TIER_WIDTHS } from "./photo-map.mjs";

const OUT_DIR = path.join(process.cwd(), "public", "photos");
const ICON_DIR = path.join(process.cwd(), "public");
const MANIFEST = path.join(process.cwd(), "src", "content", "photos.generated.json");

// Jednotný grading pre celý web: mierne vyšší kontrast, tiene stiahnuté,
// farebná teplota ponechaná (pódiové svetlo je farebné a to je správne).
const GRADE = { brightness: 1.0, saturation: 0.96 };

// Portréty obmedzujeme aj na výšku, inak by "šírka 1280" znamenala obrázok
// 1280x2275 a niekoľkonásobne väčší súbor než pri rovnako širokej krajinke.
const boxHeight = (w) => Math.round(w * 1.35);

async function variants(input, slug, widths, srcW, srcH) {
  const out = {};
  const jobs = [];
  const seen = new Set();

  for (const w of widths) {
    const scale = Math.min(w / srcW, boxHeight(w) / srcH, 1);
    const actual = Math.round(srcW * scale);
    if (actual < 200 || seen.has(actual)) continue;
    seen.add(actual);

    const base = sharp(input)
      .rotate()
      .resize({ width: w, height: boxHeight(w), fit: "inside", withoutEnlargement: true })
      .modulate(GRADE)
      .linear(1.04, -6);

    jobs.push(
      base
        .clone()
        .avif({ quality: 62, effort: 6 })
        .toFile(path.join(OUT_DIR, `${slug}-${actual}.avif`))
        .then((i) => {
          out[actual] = { avif: i.size, width: i.width, height: i.height };
        }),
    );
    jobs.push(
      base
        .clone()
        .webp({ quality: 76, effort: 5 })
        .toFile(path.join(OUT_DIR, `${slug}-${actual}.webp`))
        .then((i) => {
          out[actual] = { ...(out[actual] ?? {}), webp: i.size };
        }),
    );
  }
  await Promise.all(jobs);
  return out;
}

async function lqip(input) {
  const buf = await sharp(input)
    .rotate()
    .resize({ width: 20 })
    .blur(1.2)
    .webp({ quality: 32 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

async function buildIcons(logoPath) {
  // Favicony a app ikony sa odvodzujú z dodaného loga, negenerujú sa nanovo.
  const square = (size, pad, bg) =>
    sharp(logoPath)
      .resize({
        width: Math.round(size * (1 - pad * 2)),
        height: Math.round(size * (1 - pad * 2)),
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .extend({
        top: Math.round(size * pad),
        bottom: Math.round(size * pad),
        left: Math.round(size * pad),
        right: Math.round(size * pad),
        background: bg,
      })
      .png();

  const transparent = { r: 0, g: 0, b: 0, alpha: 0 };
  const ground = { r: 11, g: 13, b: 16, alpha: 1 };

  await square(512, 0.06, transparent).toFile(path.join(ICON_DIR, "icon-512.png"));
  await square(192, 0.06, transparent).toFile(path.join(ICON_DIR, "icon-192.png"));
  // maskable: značka v 80 % bezpečnej zóne, na plnej značkovej ploche
  await square(512, 0.16, ground).toFile(path.join(ICON_DIR, "icon-maskable-512.png"));
  await square(180, 0.12, ground).toFile(path.join(ICON_DIR, "apple-touch-icon.png"));
  await square(32, 0.04, transparent).toFile(path.join(ICON_DIR, "favicon-32.png"));
  await square(16, 0.04, transparent).toFile(path.join(ICON_DIR, "favicon-16.png"));

  // Logo pre navbar a pätičku (transparentné, dve šírky)
  for (const w of [320, 640]) {
    await sharp(logoPath)
      .resize({ width: w })
      .webp({ quality: 92 })
      .toFile(path.join(OUT_DIR, `logo-${w}.webp`));
    await sharp(logoPath)
      .resize({ width: w })
      .png({ compressionLevel: 9 })
      .toFile(path.join(OUT_DIR, `logo-${w}.png`));
  }
}

async function main() {
  if (existsSync(OUT_DIR)) await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(path.dirname(MANIFEST), { recursive: true });

  const manifest = {};
  let totalIn = 0;
  let totalOut = 0;

  for (const photo of PHOTOS) {
    const abs = path.join(SOURCE_ROOT, photo.src);
    if (!existsSync(abs)) {
      console.error(`CHÝBA ZDROJ: ${photo.src}`);
      process.exitCode = 1;
      continue;
    }
    const meta = await sharp(abs).metadata();
    // metadata() hlási rozmery pred EXIF rotáciou, .rotate() ich otočí.
    const rotated = (meta.orientation ?? 1) >= 5;
    const srcW = rotated ? meta.height : meta.width;
    const srcH = rotated ? meta.width : meta.height;

    const sizes = await variants(abs, photo.slug, TIER_WIDTHS[photo.tier], srcW, srcH);
    const placeholder = await lqip(abs);

    const available = Object.keys(sizes).map(Number).sort((a, b) => a - b);
    const largest = available[available.length - 1] ?? srcW;

    manifest[photo.slug] = {
      slug: photo.slug,
      width: sizes[largest]?.width ?? srcW,
      height: sizes[largest]?.height ?? srcH,
      aspect: +(srcW / srcH).toFixed(4),
      widths: available,
      largest,
      placeholder,
      alt: photo.alt,
      source: photo.src,
    };

    const outBytes = Object.values(sizes).reduce((a, v) => a + (v.avif ?? 0) + (v.webp ?? 0), 0);
    totalIn += meta.size ?? 0;
    totalOut += outBytes;

    console.log(
      `${photo.slug.padEnd(24)} ${String(srcW).padStart(4)}x${String(srcH).padEnd(5)}` +
        ` -> ${available.join("/").padEnd(22)} najväčší AVIF ` +
        `${((sizes[largest]?.avif ?? 0) / 1024).toFixed(0).padStart(4)} kB`,
    );
  }

  await buildIcons(path.join(SOURCE_ROOT, LOGO_SRC));
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8");

  console.log(
    `\nHotovo. ${Object.keys(manifest).length} fotografií. ` +
      `Zdroj ${(totalIn / 1048576).toFixed(1)} MB -> výstup ${(totalOut / 1048576).toFixed(1)} MB ` +
      `vo všetkých variantoch dohromady.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
