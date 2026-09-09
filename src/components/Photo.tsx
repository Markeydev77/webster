import { getPhoto, srcSet, fallbackSrc, photoAlt } from "@/lib/photos";
import type { Locale } from "@/lib/i18n";

type Props = {
  slug: string;
  locale: Locale;
  /** Hodnota atribútu sizes. Určuje, ktorý variant prehliadač stiahne. */
  sizes: string;
  className?: string;
  /** Trieda pre samotný <img> vnútri (napr. object-position). */
  imgClassName?: string;
  priority?: boolean;
  /** Prepíše alt text zo súboru photo-map, ak sekcia potrebuje presnejší popis. */
  alt?: string;
  /** Dekoratívna fotografia bez informačnej hodnoty. */
  decorative?: boolean;
};

/**
 * Fotografia z predspracovaného manifestu.
 *
 * Vždy vydá AVIF aj WebP variant a rozmery, takže sa nikde nepreskakuje layout
 * (CLS). Placeholder je 20 px rozmazaný náhľad zapečený priamo v HTML, aby
 * miesto fotky nikdy neblikla prázdna plocha.
 */
export function Photo({
  slug,
  locale,
  sizes,
  className = "",
  imgClassName = "",
  priority = false,
  alt,
  decorative = false,
}: Props) {
  const photo = getPhoto(slug);
  if (!photo) return null;

  const text = decorative ? "" : (alt ?? photoAlt(photo, locale));

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet(photo, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(photo, "webp")} sizes={sizes} />
      <img
        src={fallbackSrc(photo)}
        alt={text}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        aria-hidden={decorative || undefined}
        className={`h-full w-full object-cover ${imgClassName}`}
        style={{
          backgroundImage: `url(${photo.placeholder})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </picture>
  );
}
