import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { locales } from "@/lib/i18n";

/**
 * Pevný dátum poslednej úpravy. Pri `new Date()` by sa mapa menila pri každom
 * builde a vyhľadávače by dostávali falošný signál o zmene obsahu.
 */
const lastModified = new Date("2026-09-08");

type Route = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const routes: Route[] = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/technika", changeFrequency: "monthly", priority: 0.8 },
  { path: "/referencie", changeFrequency: "monthly", priority: 0.8 },
  { path: "/rezervacia", changeFrequency: "monthly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((lang) => ({
      url: `${site.url}/${lang}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          sk: `${site.url}/sk${route.path}`,
          en: `${site.url}/en${route.path}`,
        },
      },
    })),
  );
}
