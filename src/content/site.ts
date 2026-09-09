/**
 * Firemné údaje Webster Sound & Light.
 *
 * DÔLEŽITÉ: hodnoty `null` znamenajú "chýba v podkladoch". Web ich nikde
 * nevymýšľa ani nezobrazuje zástupný text: sekcie sa jednoducho nevykreslia,
 * kým sem nedoplníte reálnu hodnotu. Po doplnení sa objavia automaticky,
 * vrátane štruktúrovaných dát pre Google a právnych stránok.
 */

export type Maybe<T> = T | null;

const FALLBACK_URL = "https://www.webstersound.sk";

/**
 * Adresa webu z premennej prostredia, znormalizovaná.
 *
 * Hodnota sa zadáva ručne vo Verceli, takže sa v nej bežne ocitne adresa bez
 * protokolu alebo s lomkou na konci. Bez tejto normalizácie by `new URL()`
 * v metadátach vyhodilo výnimku a zhodilo predgenerovanie VŠETKÝCH stránok,
 * pričom hlásenie by ukazovalo na náhodnú stránku a nie na skutočnú príčinu.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK_URL;

  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(candidate).origin;
  } catch {
    console.warn(
      `[Webster] NEXT_PUBLIC_SITE_URL nie je platná adresa: "${raw}". Používa sa ${FALLBACK_URL}.`,
    );
    return FALLBACK_URL;
  }
}

export const site = {
  name: "Webster Sound & Light",
  shortName: "Webster",
  tagline: {
    sk: "Technika pre vaše podujatie.",
    en: "Technology for your event.",
  },

  /** Verejná adresa webu. Prepíše sa premennou NEXT_PUBLIC_SITE_URL. */
  url: resolveSiteUrl(),

  contact: {
    phone: "+421903549635" as Maybe<string>,
    phoneDisplay: "+421 903 549 635" as Maybe<string>,
    email: "davidpikla@gmail.com" as Maybe<string>,
    /** DOPLNIŤ, ak chcete uvádzať adresu: ulica a číslo */
    street: null as Maybe<string>,
    /** DOPLNIŤ, ak chcete uvádzať adresu: PSČ a mesto alebo obec */
    city: null as Maybe<string>,
    country: "Slovensko",
  },

  /** Oficiálne profily dodané firmou. Žiadne ďalšie sa nevymýšľajú. */
  social: {
    facebook: "https://www.facebook.com/webstersoundalight/" as Maybe<string>,
    instagram: "https://www.instagram.com/webster_soundalight/" as Maybe<string>,
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

/** Údaje, bez ktorých web nemá ako fungovať. Vypíše sa pri vývoji ako varovanie. */
export function missingSiteData(): string[] {
  const missing: string[] = [];
  if (!site.contact.phone) missing.push("contact.phone");
  if (!site.contact.email) missing.push("contact.email");
  return missing;
}

/**
 * Identifikačné údaje podnikateľa. Web bez nich funguje a právne stránky sa
 * vykreslia s kontaktom na prevádzkovateľa, ale zákon o elektronickom obchode
 * ich na podnikateľskom webe vyžaduje. Doplňte ich, keď budú k dispozícii.
 */
export function missingStatutoryData(): string[] {
  const missing: string[] = [];
  if (!site.legal.entity) missing.push("legal.entity");
  if (!site.legal.ico) missing.push("legal.ico");
  return missing;
}

export const hasAnyContact =
  Boolean(site.contact.phone) || Boolean(site.contact.email);

export const socialLinks = Object.entries(site.social)
  .filter(([, href]) => Boolean(href))
  .map(([key, href]) => ({ key, href: href as string }));
