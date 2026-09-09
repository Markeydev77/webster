// Zloží Open Graph karty 1200x630 px do public/og.
//
// Karta vzniká lokálne z už existujúcej reálnej fotografie v public/photos:
// fotka sa oreže, prekryje tmavým gradientom a doplní textom vykresleným
// cez SVG. Nič sa negeneruje umelou inteligenciou.
//
// Spustenie: node scripts/make-og.mjs
// Skript je idempotentný, opakované spustenie prepíše výstupy rovnakým obsahom.

import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const PHOTO_DIR = path.join(ROOT, "public", "photos");
const OUT_DIR = path.join(ROOT, "public", "og");

const WIDTH = 1200;
const HEIGHT = 630;

// Pri rasterizácii SVG nie sú k dispozícii webové fonty projektu, preto
// pracujeme len so systémovými. Poradie je zámerné: Linux (build na Verceli),
// Windows a macOS. Všetky uvedené fonty majú slovenskú diakritiku.
const FONT = "DejaVu Sans, Arial, Helvetica, sans-serif";

// Farby zodpovedajú palete webu.
const INK = "#F8F8F8";
const MUTED = "#9BA3AD";
const BRAND = "#40A0E0";
const ACCENT = "#2080D0";
const GROUND = "#0b0d10"; // rgba(11,13,16,...) v gradiente nižšie

const CARDS = [
  {
    lang: "sk",
    headline: ["Technika pre vaše", "podujatie."],
    sub: "Ozvučenie · Osvetlenie · Pódiá · LED obrazovky",
    brand: "WEBSTER SOUND &amp; LIGHT",
  },
  {
    lang: "en",
    headline: ["Technology for", "your event."],
    sub: "Sound · Lighting · Stages · LED screens",
    brand: "WEBSTER SOUND &amp; LIGHT",
  },
];

/**
 * Nájde najväčší dostupný hero-koncert-*.webp. WebP používame zámerne:
 * sharp ho prečíta spoľahlivo na každej platforme.
 */
async function findHeroPhoto() {
  const entries = await readdir(PHOTO_DIR);
  const candidates = entries
    .map((name) => {
      const match = /^hero-koncert-(\d+)\.webp$/i.exec(name);
      return match ? { name, width: Number(match[1]) } : null;
    })
    .filter((item) => item !== null)
    .sort((a, b) => b.width - a.width);

  if (candidates.length === 0) {
    throw new Error(
      `V priečinku ${PHOTO_DIR} nie je žiadny súbor hero-koncert-*.webp. ` +
        'Spustite najprv "npm run images".',
    );
  }
  return path.join(PHOTO_DIR, candidates[0].name);
}

/**
 * Tmavý prechod cez fotku. Vodorovne z rgba(11,13,16,0.92) vľavo do
 * rgba(11,13,16,0.15) vpravo, plus jemný spodný pás. Zápis cez stop-color
 * a stop-opacity je to isté ako rgba(), len ho rasterizér spracuje spoľahlivo.
 */
function gradientSvg() {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="side" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${GROUND}" stop-opacity="0.92"/>
      <stop offset="0.5" stop-color="${GROUND}" stop-opacity="0.8"/>
      <stop offset="0.78" stop-color="${GROUND}" stop-opacity="0.42"/>
      <stop offset="1" stop-color="${GROUND}" stop-opacity="0.15"/>
    </linearGradient>
    <linearGradient id="bottom" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${GROUND}" stop-opacity="0"/>
      <stop offset="1" stop-color="${GROUND}" stop-opacity="0.8"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="url(#side)"/>
  <rect x="0" y="${HEIGHT - 230}" width="${WIDTH}" height="230" fill="url(#bottom)"/>
</svg>`;
  return Buffer.from(svg, "utf8");
}

/**
 * Text karty. Diakritika prechádza cez explicitnú UTF-8 hlavičku a
 * Buffer.from(..., "utf8"), znak & je v zdrojových reťazcoch už ako &amp;.
 */
function textSvg(card) {
  const x = 112;
  const firstBaseline = 288;
  const lineStep = 84;
  const lastBaseline = firstBaseline + (card.headline.length - 1) * lineStep;

  const headline = card.headline
    .map(
      (line, i) =>
        `  <text x="${x}" y="${firstBaseline + i * lineStep}" font-family="${FONT}" font-weight="bold" font-size="68" fill="${INK}">${line}</text>`,
    )
    .join("\n");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect x="80" y="${firstBaseline - 56}" width="4" height="120" fill="${ACCENT}"/>
${headline}
  <text x="${x}" y="${lastBaseline + 62}" font-family="${FONT}" font-weight="normal" font-size="27" fill="${MUTED}">${card.sub}</text>
  <text x="80" y="558" font-family="${FONT}" font-weight="bold" font-size="22" letter-spacing="3" fill="${BRAND}">${card.brand}</text>
</svg>`;
  return Buffer.from(svg, "utf8");
}

async function buildCard(photo, card) {
  const file = path.join(OUT_DIR, `og-${card.lang}.png`);

  await sharp(photo)
    .rotate()
    .resize({ width: WIDTH, height: HEIGHT, fit: "cover", position: "attention" })
    .composite([
      { input: gradientSvg(), top: 0, left: 0 },
      { input: textSvg(card), top: 0, left: 0 },
    ])
    // Paletový PNG drží kartu pod 400 kB. Fotka je tmavá a zjednotená
    // gradientom, takže 256 farieb nie je na pohľad rozoznateľných.
    .png({ compressionLevel: 9, palette: true, quality: 92, effort: 10 })
    .toFile(file);

  const { size } = await stat(file);
  return { file, size };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const photo = await findHeroPhoto();
  console.log(`Zdrojová fotografia: ${path.relative(ROOT, photo)}`);

  let over = false;
  for (const card of CARDS) {
    const { file, size } = await buildCard(photo, card);
    const kb = (size / 1024).toFixed(0);
    console.log(`${path.relative(ROOT, file).padEnd(24)} ${WIDTH}x${HEIGHT}  ${kb} kB`);
    if (size > 400 * 1024) over = true;
  }

  if (over) {
    console.warn("Pozor: niektorá karta presiahla 400 kB, znížte kvalitu palety.");
  }
  console.log("Hotovo.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
