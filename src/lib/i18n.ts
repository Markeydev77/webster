export const locales = ["sk", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sk";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Pomocník pre dvojjazyčné polia v obsahových súboroch. */
export function pick<T>(field: { sk: T; en: T }, locale: Locale): T {
  return field[locale];
}

const sk = {
  nav: {
    services: "Služby",
    equipment: "Technika",
    references: "Referencie",
    reviews: "Recenzie",
    contact: "Kontakt",
    reserve: "Rezervovať termín",
    menu: "Menu",
    close: "Zavrieť",
    skip: "Preskočiť na obsah",
  },
  hero: {
    headline: "Technika pre vaše podujatie.",
    sub: "Zvuk, svetlo, pódiá a strechy pre obecné dni, festivaly, plesy, konferencie aj koncerty. Postavíme celé technické zabezpečenie a odvedieme ho až do konca programu.",
    primary: "Rezervovať termín",
    secondary: "Pozrieť našu techniku",
  },
  services: {
    eyebrow: "Čo zabezpečíme",
    headline: "Od prázdnej lúky po hotové podujatie",
    lead: "Pódium, strecha, ozvučenie, osvetlenie a obrazovka na jednu objednávku. Nemusíte skladať technikov z troch firiem a dúfať, že sa dohodnú.",
    evidenceLabel: "Doložené na akciách",
  },
  statement: {
    line: ["Zvuk.", "Svetlo.", "Pódium."],
    caption:
      "Tri veci, na ktorých stojí každé podujatie. Máme ich vlastné, vo vlastnom sklade, s vlastnou obsluhou.",
  },
  equipment: {
    headline: "Vlastný park techniky",
    lead: "Prezentačný prehľad toho, čo vozíme na akcie. Konkrétne zloženie zostavy vždy prispôsobíme veľkosti a typu vášho podujatia.",
    cta: "Zobraziť celý katalóg",
    pageTitle: "Technika",
    pageLead:
      "Prehľad vybavenia, ktoré máme k dispozícii. Nie je to e-shop: zostavu skladáme podľa konkrétneho podujatia, priestoru a počtu ľudí. Ozvite sa a preberieme, čo dáva zmysel práve pre vás.",
    askCta: "Napíšte nám, čo chystáte",
  },
  references: {
    eyebrow: "Referencie",
    headline: "Kde sme už stavali",
    lead: "Reálne podujatia, na ktorých sme technicky zabezpečovali program.",
    cta: "Všetky referencie",
    pageTitle: "Referencie",
    pageLead:
      "Podujatia, na ktorých sme zabezpečovali techniku. Filtrujte podľa typu akcie.",
    all: "Všetko",
    deliveredLabel: "Zabezpečili sme",
    gallery: "Ďalšie fotografie z akcií",
    count: (n: number) => `${n} ${n === 1 ? "podujatie" : n < 5 ? "podujatia" : "podujatí"}`,
  },
  eventTypes: {
    headline: "Čo od nás dostanete",
    lead: "Vyberte typ akcie a uvidíte, s čím pri nej obvykle prichádzame. Rovnaký typ sa predvyplní aj v rezervačnom formulári.",
    cta: "Rezervovať tento termín",
  },
  reviews: {
    headline: "Čo hovoria organizátori",
  },
  reservation: {
    eyebrow: "Rezervácia",
    headline: "Rezervujte si termín",
    lead: "Vyplňte základné údaje o podujatí. Ozveme sa vám a preberieme detaily. Rezervácia je nezáväzná, k ničomu sa ňou neviažete.",
    name: "Meno a priezvisko",
    phone: "Telefón",
    email: "E-mail",
    date: "Dátum podujatia",
    type: "Typ podujatia",
    typePlaceholder: "Vyberte typ podujatia",
    typeOther: "Upresnite typ podujatia",
    message: "Správa",
    messagePlaceholder: "Miesto konania, predpokladaný počet ľudí, čo potrebujete zabezpečiť.",
    consent: "Súhlasím so spracovaním osobných údajov na účel vybavenia tejto požiadavky.",
    consentLink: "Ochrana osobných údajov",
    submit: "Odoslať rezerváciu",
    sending: "Odosielam...",
    required: "Povinné",
    optional: "Nepovinné",
    afterSubmit: "Po odoslaní sa vám ozveme do dvoch pracovných dní.",
    successTitle: "Rezervácia odoslaná",
    successBody: "Ďakujeme. Ozveme sa vám do dvoch pracovných dní.",
    errorTitle: "Odoslanie zlyhalo",
    errorBody: "Skúste to prosím znova, alebo nám zavolajte.",
  },
  contact: {
    headline: "Nezáväzne nás kontaktovať",
    lead: "Napíšte nám, čo chystáte. Poradíme aj vtedy, ak ešte neviete presne, čo potrebujete.",
    formName: "Meno",
    formEmail: "E-mail",
    formMessage: "Správa",
    submit: "Odoslať správu",
    phoneLabel: "Telefón",
    emailLabel: "E-mail",
    addressLabel: "Adresa",
    areaLabel: "Pôsobíme na Orave a po celom Slovensku",
    socialLabel: "Sledujte nás",
  },
  validation: {
    nameRequired: "Zadajte meno.",
    phoneRequired: "Zadajte telefónne číslo.",
    phoneInvalid: "Zadajte platné telefónne číslo.",
    emailRequired: "Zadajte e-mail.",
    emailInvalid: "Zadajte platnú e-mailovú adresu.",
    dateRequired: "Vyberte dátum podujatia.",
    datePast: "Dátum musí byť v budúcnosti.",
    typeRequired: "Vyberte typ podujatia.",
    typeOtherRequired: "Upresnite typ podujatia.",
    messageRequired: "Napíšte nám aspoň krátku správu.",
    consentRequired: "Bez súhlasu nevieme požiadavku spracovať.",
    serverError: "Formulár sa nepodarilo odoslať.",
  },
  footer: {
    rights: "Všetky práva vyhradené.",
    legal: "Právne informácie",
    privacy: "Ochrana osobných údajov",
    terms: "Obchodné podmienky",
    cookies: "Cookies",
    madeNote: "Web nepoužíva analytické ani marketingové cookies.",
  },
  legal: {
    privacyTitle: "Ochrana osobných údajov",
    termsTitle: "Obchodné podmienky",
    cookiesTitle: "Zásady používania cookies",
    updated: "Naposledy aktualizované",
    incomplete:
      "Tento dokument zatiaľ nie je kompletný. Chýbajú identifikačné údaje prevádzkovateľa, bez ktorých nie je možné text dokončiť.",
  },
  common: {
    langLabel: "Jazyk",
    backHome: "Späť na úvod",
    notFound: "Stránka sa nenašla",
    notFoundBody: "Adresa, ktorú ste otvorili, na tomto webe neexistuje.",
  },
};

// Slovenčina je referenčný tvar slovníka. Anglická verzia sa typuje na Dict,
// takže chýbajúci alebo premenovaný kľúč zhodí typovú kontrolu.
type Dict = typeof sk;

const en: Dict = {
  nav: {
    services: "Services",
    equipment: "Equipment",
    references: "Projects",
    reviews: "Reviews",
    contact: "Contact",
    reserve: "Book a date",
    menu: "Menu",
    close: "Close",
    skip: "Skip to content",
  },
  hero: {
    headline: "Technology for your event.",
    sub: "Sound, lighting, stages and roofs for village days, festivals, balls, conferences and concerts. We build the whole technical setup and run it to the end of the programme.",
    primary: "Book a date",
    secondary: "See our equipment",
  },
  services: {
    eyebrow: "What we cover",
    headline: "From an empty field to a finished event",
    lead: "Stage, roof, sound, lighting and screen in a single booking. No need to assemble crews from three companies and hope they agree.",
    evidenceLabel: "Delivered at",
  },
  statement: {
    line: ["Sound.", "Light.", "Stage."],
    caption:
      "The three things every event stands on. We own them, store them ourselves and operate them ourselves.",
  },
  equipment: {
    headline: "Our own inventory",
    lead: "An overview of what we bring to an event. The exact configuration is always matched to the size and type of your programme.",
    cta: "View the full catalogue",
    pageTitle: "Equipment",
    pageLead:
      "An overview of the kit we have available. This is not a shop: we assemble the rig around the specific event, the venue and the audience size. Get in touch and we will work out what makes sense for you.",
    askCta: "Tell us what you are planning",
  },
  references: {
    eyebrow: "Projects",
    headline: "Where we have built",
    lead: "Real events where we handled the technical production.",
    cta: "All projects",
    pageTitle: "Projects",
    pageLead: "Events we supplied technically. Filter by the type of event.",
    all: "All",
    deliveredLabel: "We delivered",
    gallery: "More photographs from our events",
    count: (n: number) => `${n} ${n === 1 ? "event" : "events"}`,
  },
  eventTypes: {
    headline: "What you get from us",
    lead: "Pick the type of event and see what we usually arrive with. The same type is pre filled in the booking form.",
    cta: "Book this date",
  },
  reviews: {
    headline: "What organisers say",
  },
  reservation: {
    eyebrow: "Booking",
    headline: "Book your date",
    lead: "Fill in the basics about your event. We will get back to you and go through the details. The booking is non binding.",
    name: "Full name",
    phone: "Phone",
    email: "Email",
    date: "Event date",
    type: "Type of event",
    typePlaceholder: "Choose an event type",
    typeOther: "Please specify the type of event",
    message: "Message",
    messagePlaceholder: "Venue, expected number of people, what you need us to cover.",
    consent: "I agree to my personal data being processed in order to handle this request.",
    consentLink: "Privacy policy",
    submit: "Send booking request",
    sending: "Sending...",
    required: "Required",
    optional: "Optional",
    afterSubmit: "We will get back to you within two working days.",
    successTitle: "Booking request sent",
    successBody: "Thank you. We will get back to you within two working days.",
    errorTitle: "Sending failed",
    errorBody: "Please try again, or give us a call.",
  },
  contact: {
    headline: "Get in touch, no strings attached",
    lead: "Tell us what you are planning. We are happy to advise even if you do not yet know exactly what you need.",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    submit: "Send message",
    phoneLabel: "Phone",
    emailLabel: "Email",
    addressLabel: "Address",
    areaLabel: "Based in Orava, working across Slovakia",
    socialLabel: "Follow us",
  },
  validation: {
    nameRequired: "Please enter your name.",
    phoneRequired: "Please enter a phone number.",
    phoneInvalid: "Please enter a valid phone number.",
    emailRequired: "Please enter an email address.",
    emailInvalid: "Please enter a valid email address.",
    dateRequired: "Please choose the event date.",
    datePast: "The date must be in the future.",
    typeRequired: "Please choose the type of event.",
    typeOtherRequired: "Please specify the type of event.",
    messageRequired: "Please write us a short message.",
    consentRequired: "We cannot process the request without your consent.",
    serverError: "The form could not be sent.",
  },
  footer: {
    rights: "All rights reserved.",
    legal: "Legal",
    privacy: "Privacy policy",
    terms: "Terms and conditions",
    cookies: "Cookies",
    madeNote: "This site uses no analytics or marketing cookies.",
  },
  legal: {
    privacyTitle: "Privacy policy",
    termsTitle: "Terms and conditions",
    cookiesTitle: "Cookie policy",
    updated: "Last updated",
    incomplete:
      "This document is not yet complete. The operator identification details are missing and the text cannot be finalised without them.",
  },
  common: {
    langLabel: "Language",
    backHome: "Back to home",
    notFound: "Page not found",
    notFoundBody: "The address you opened does not exist on this site.",
  },
};

export const dictionaries: Record<Locale, Dict> = { sk, en };

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale];
}
