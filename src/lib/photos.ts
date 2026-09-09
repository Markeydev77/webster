import manifest from "@/content/photos.generated.json";
import type { Locale } from "./i18n";

export type PhotoMeta = {
  slug: string;
  width: number;
  height: number;
  aspect: number;
  widths: number[];
  largest: number;
  placeholder: string;
  alt: { sk: string; en: string };
  source: string;
};

const photos = manifest as unknown as Record<string, PhotoMeta>;

export function getPhoto(slug: string): PhotoMeta | null {
  return photos[slug] ?? null;
}

export function photoAlt(photo: PhotoMeta, locale: Locale): string {
  return photo.alt[locale];
}

export function srcSet(photo: PhotoMeta, ext: "avif" | "webp"): string {
  return photo.widths.map((w) => `/photos/${photo.slug}-${w}.${ext} ${w}w`).join(", ");
}

export function fallbackSrc(photo: PhotoMeta): string {
  return `/photos/${photo.slug}-${photo.largest}.webp`;
}

export const allPhotoSlugs = Object.keys(photos);
