/**
 * Firemné údaje Webster Sound & Light.
 *
 * DÔLEŽITÉ: hodnoty `null` znamenajú "chýba v podkladoch". Web ich nikde
 * nevymýšľa ani nezobrazuje zástupný text: sekcie sa jednoducho nevykreslia,
 * kým sem nedoplníte reálnu hodnotu. Po doplnení sa objavia automaticky,
 * vrátane štruktúrovaných dát pre Google a právnych stránok.
 */

export type Maybe<T> = T | null;

export const site = {
  name: "Webster Sound & Light",
  shortName: "Webster",
  tagline: {
    sk: "Technika pre vaše podujatie.",
    en: "Technology for your event.",
  },

  /** Verejná adresa webu. Prepíše sa premennou NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.webstersound.sk",

  contact: {
    /** DOPLNIŤ: telefónne číslo v medzinárodnom tvare, napr. "+421903000000" */
    phone: null as Maybe<string>,
    /** DOPLNIŤ: zobrazovaný tvar telefónu, napr. "+421 903 000 000" */
    phoneDisplay: null as Maybe<string>,
    /** DOPLNIŤ: kontaktný e-mail */
    email: null as Maybe<string>,
    /** DOPLNIŤ: ulica a číslo */
    street: null as Maybe<string>,
    /** DOPLNIŤ: PSČ a mesto/obec */
    city: null as Maybe<string>,
    country: "Slovensko",
  },

  /** DOPLNIŤ: odkazy na oficiálne profily. Nevymýšľame žiadne ďalšie. */
  social: {
    facebook: null as Maybe<string>,
    instagram: null as Maybe<string>,
    youtube: null as Maybe<string>,
    tiktok: null as Maybe<string>,
  },

  /** DOPLNIŤ: bez týchto údajov nie je možné dokončiť právne stránky. */
  legal: {
    /** Presný obchodný názov podľa registra */
    entity: null as Maybe<string>,
    ico: null as Maybe<string>,
    dic: null as Maybe<string>,
    icDph: null as Maybe<string>,
    /** Napr. "Okresný úrad Námestovo, číslo živnostenského registra ..." */
    registration: null as Maybe<string>,
  },

  /**
   * Oblasť pôsobenia. Odvodené výhradne z reálnych referencií v podkladoch,
   * nič doplnené.
   */
  serviceArea: [
    "Zákamenné",
    "Klin",
    "Novoť",
    "Vavrečka",
    "Bziny",
    "Krušetnica",
    "Námestovo",
    "Tvrdošín",
    "Oravská Lesná",
    "Vyšný Kubín",
    "Kežmarok",
    "Žilina",
  ],
} as const;

/** Zoznam chýbajúcich povinných údajov: vypíše sa pri builde ako varovanie. */
export function missingSiteData(): string[] {
  const missing: string[] = [];
  if (!site.contact.phone) missing.push("contact.phone");
  if (!site.contact.email) missing.push("contact.email");
  if (!site.contact.city) missing.push("contact.city");
  if (!site.legal.entity) missing.push("legal.entity");
  if (!site.legal.ico) missing.push("legal.ico");
  return missing;
}

export const hasAnyContact =
  Boolean(site.contact.phone) || Boolean(site.contact.email);

export const socialLinks = Object.entries(site.social)
  .filter(([, href]) => Boolean(href))
  .map(([key, href]) => ({ key, href: href as string }));
