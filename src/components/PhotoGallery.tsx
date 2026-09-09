import { Photo } from "@/components/Photo";
import { allPhotoSlugs, getPhoto } from "@/lib/photos";
import { references } from "@/content/references";
import { services } from "@/content/services";
import { equipment } from "@/content/equipment";
import type { Locale } from "@/lib/i18n";

/** Fotografie, ktoré už nesie iná sekcia. Do galérie sa nezaraďujú druhýkrát. */
const usedElsewhere = new Set<string>([
  "hero-koncert",
  ...references.map((r) => r.photo).filter((s): s is string => Boolean(s)),
  ...services.map((s) => s.photo).filter((s): s is string => Boolean(s)),
  ...equipment.map((c) => c.photo).filter((s): s is string => Boolean(s)),
]);

const gallerySlugs = allPhotoSlugs.filter((slug) => !usedElsewhere.has(slug));

/**
 * Galéria zvyšných fotografií z akcií.
 *
 * Rieši dve veci naraz: doplní vizuálnu hustotu stránky referencií a zaistí,
 * že žiadna z dodaných fotografií nezostane nevyužitá. Formát dlaždice sa
 * odvíja od reálneho pomeru strán fotografie, takže sa nič neoreže nasilu.
 */
export function PhotoGallery({
  locale,
  title,
}: {
  locale: Locale;
  title: string;
}) {
  if (gallerySlugs.length === 0) return null;

  return (
    <section className="border-t border-line py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-bold leading-tight tracking-tight">
          {title}
        </h2>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {gallerySlugs.map((slug) => {
            const meta = getPhoto(slug);
            const portrait = meta ? meta.aspect < 0.95 : false;
            return (
              <li
                key={slug}
                className={`group overflow-hidden rounded-md border border-line ${
                  portrait ? "row-span-2" : ""
                }`}
              >
                <Photo
                  slug={slug}
                  locale={locale}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 24vw"
                  className={`block w-full transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.05] ${
                    portrait ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
