/**
 * Reálne referencie Webster Sound & Light.
 *
 * Zdroj: podklady dodané firmou. Názvy, popisy a dátumy sú prevzaté doslovne,
 * nič nie je doplnené, dopočítané ani domyslené. Anglická verzia je
 * profesionálny preklad, nie doslovný.
 *
 * `photo: null` znamená, že k danej referencii zatiaľ nie je k dispozícii
 * fotografia v použiteľnom rozlíšení. Karta sa vykreslí typograficky.
 */

export type RefCategory =
  | "obce"
  | "festivaly"
  | "plesy"
  | "konferencie"
  | "sport"
  | "cirkevne"
  | "kultura";

export type EventReference = {
  id: string;
  title: { sk: string; en: string };
  description: { sk: string; en: string };
  /** Tvar "M/RRRR" presne ako v podkladoch. null = dátum nebol uvedený. */
  date: string | null;
  category: RefCategory;
  /** Slug fotografie z public/photos, alebo null ak originál chýba. */
  photo: string | null;
  /** Ďalšie fotografie k tej istej akcii. */
  gallery?: string[];
  /** Zabezpečenie, odvodené z textu popisu. Žiadna položka navyše. */
  delivered: DeliveredKey[];
};

export type DeliveredKey =
  | "zvuk"
  | "svetlo"
  | "podium"
  | "led"
  | "efekty"
  | "nasvietenie";

export const deliveredLabels: Record<DeliveredKey, { sk: string; en: string }> = {
  zvuk: { sk: "Ozvučenie", en: "Sound" },
  svetlo: { sk: "Osvetlenie", en: "Lighting" },
  podium: { sk: "Pódium a strecha", en: "Stage and roof" },
  led: { sk: "LED obrazovka", en: "LED screen" },
  efekty: { sk: "Špeciálne efekty", en: "Special effects" },
  nasvietenie: { sk: "Architektúrne nasvietenie", en: "Architectural lighting" },
};

export const categoryLabels: Record<RefCategory, { sk: string; en: string }> = {
  obce: { sk: "Obecné dni a výročia", en: "Village days and anniversaries" },
  festivaly: { sk: "Festivaly", en: "Festivals" },
  plesy: { sk: "Plesy a párty", en: "Balls and parties" },
  konferencie: { sk: "Konferencie", en: "Conferences" },
  sport: { sk: "Šport", en: "Sport" },
  cirkevne: { sk: "Cirkevné a charitatívne", en: "Church and charity" },
  kultura: { sk: "Kultúra a ocenenia", en: "Culture and awards" },
};

export const references: EventReference[] = [
  {
    id: "zakamenne-dni-obce",
    title: { sk: "Dni obce Zákamenné", en: "Zákamenné Village Days" },
    description: {
      sk: "Ozvučenie a osvetlenie celodenného programu miestnych umelcov a folklórnych skupín, ale aj známe slovenské kapely Iconito a Sám sebou.",
      en: "Sound and lighting for a full day of local performers and folk ensembles, alongside the Slovak bands Iconito and Sám sebou.",
    },
    date: "7/2024",
    category: "obce",
    photo: null,
    delivered: ["zvuk", "svetlo"],
  },
  {
    id: "klin-den-obce",
    title: { sk: "Deň obce Klin", en: "Klin Village Day" },
    description: {
      sk: "Prestrešené pódium, ozvučenie a osvetlenie celodenného programu miestnych folklórnych skupín s hlavným hosťom kapela Hrdza.",
      en: "Covered stage, sound and lighting for a full day of local folk ensembles, headlined by the band Hrdza.",
    },
    date: "7/2025",
    category: "obce",
    photo: "ref-klin",
    delivered: ["podium", "zvuk", "svetlo"],
  },
  {
    id: "novot-dni-obce",
    title: { sk: "Dni obce Novoť", en: "Novoť Village Days" },
    description: {
      sk: "Prestrešené pódium a ozvučenie dvojdňového bohatého programu, kde medzi hlavných hostí patrili kapely Vidiek a Rolanďáci.",
      en: "Covered stage and sound for a rich two day programme headlined by the bands Vidiek and Rolanďáci.",
    },
    date: "7/2025",
    category: "obce",
    photo: null,
    delivered: ["podium", "zvuk"],
  },
  {
    id: "vavrecka-dni-obce",
    title: { sk: "Dni obce Vavrečka", en: "Vavrečka Village Days" },
    description: {
      sk: "Ozvučenie a osvetlenie programu na miestnom amfiteátri. Počas dvoch dní sa predstavili Ploštín punk, Drišľak a Maroš Bango.",
      en: "Sound and lighting at the local amphitheatre. Over two days the stage hosted Ploštín punk, Drišľak and Maroš Bango.",
    },
    date: "7/2025",
    category: "obce",
    photo: "ref-koncert-amfiteater",
    delivered: ["zvuk", "svetlo"],
  },
  {
    id: "gafa-car-fest",
    title: { sk: "GAFA Car fest", en: "GAFA Car fest" },
    description: {
      sk: "Prestrešené pódium, LED obrazovka a ozvučenie podujatia milovníkov áut vo Vavrečke.",
      en: "Covered stage, LED screen and sound for a gathering of car enthusiasts in Vavrečka.",
    },
    date: "6/2025",
    category: "festivaly",
    photo: "ref-gafa",
    gallery: ["zvuk-linearray-vonku"],
    delivered: ["podium", "led", "zvuk"],
  },
  {
    id: "bziny-680-vyrocie",
    title: {
      sk: "680. výročie prvej písomnej zmienky obce Bziny",
      en: "680th anniversary of the first written record of Bziny",
    },
    description: {
      sk: "Ozvučenie a osvetlenie programu miestnych, regionálych a družobných folklórnych skupín vrátane umeleckého súboru Lúčnica.",
      en: "Sound and lighting for local, regional and partner folk ensembles, including the Lúčnica company.",
    },
    date: "8/2025",
    category: "obce",
    photo: null,
    delivered: ["zvuk", "svetlo"],
  },
  {
    id: "ct-park",
    title: { sk: "Deň otvorených dverí CT Park", en: "CT Park Open Day" },
    description: {
      sk: "Prestrešené pódium a ozvučenie programu pre zamestnancov firiem v CT Parku, kde hlavným hosťom bola kapela Helenine Oči.",
      en: "Covered stage and sound for an employee event at CT Park, headlined by the band Helenine Oči.",
    },
    date: "9/2025",
    category: "kultura",
    photo: "podium-komplet",
    delivered: ["podium", "zvuk"],
  },
  {
    id: "krusetnica-dni-obce",
    title: { sk: "Dni obce Krušetnica", en: "Krušetnica Village Days" },
    description: {
      sk: "Prestrešené pódium, ozvučenie a osvetlenie bohatého programu spolu so súťažou o najlepší tradičný „repňák“.",
      en: "Covered stage, sound and lighting for a full programme, including a contest for the best traditional turnip dish.",
    },
    date: "8/2025",
    category: "obce",
    photo: null,
    delivered: ["podium", "zvuk", "svetlo"],
  },
  {
    id: "zakafest",
    title: { sk: "ZAKAFEST", en: "ZAKAFEST" },
    description: {
      sk: "Ozvučenie a osvetlenie festivalu v Zákamennom kde sa predstavili Vidiek, Zoči Voči, Pavel Calta, René Rendy, Cicoband, Nocadeň a hlavný hosť Iné Kafe.",
      en: "Sound and lighting for the festival in Zákamenné, featuring Vidiek, Zoči Voči, Pavel Calta, René Rendy, Cicoband, Nocadeň and headliner Iné Kafe.",
    },
    date: "8/2024",
    category: "festivaly",
    photo: null,
    delivered: ["zvuk", "svetlo"],
  },
  {
    id: "snow-fest",
    title: { sk: "Snow Fest", en: "Snow Fest" },
    description: {
      sk: "Prestrešené pódium, ozvučenie, osvetlenie a LED obrazovka pre festival priamo na svahu v lyžiarskom stredisku Oravasnow v Oravskej Lesnej, na ktorom vystupovali Mafia Corner a Hrdza.",
      en: "Covered stage, sound, lighting and LED screen for a festival held on the slope at the Oravasnow resort in Oravská Lesná, with Mafia Corner and Hrdza performing.",
    },
    date: "2/2026",
    category: "festivaly",
    photo: null,
    delivered: ["podium", "zvuk", "svetlo", "led"],
  },
  {
    id: "modna-prehliadka",
    title: { sk: "Módna prehliadka", en: "Charity Fashion Show" },
    description: {
      sk: "Ozvučenie, osvetlenie a pódium pre charitatívnu módnu prehliadku v centre Kežmarku pod holým nebom s hudobným hosťom Martinom Harichom.",
      en: "Sound, lighting and stage for an open air charity fashion show in the centre of Kežmarok, with musical guest Martin Harich.",
    },
    date: "6/2025",
    category: "kultura",
    photo: null,
    delivered: ["zvuk", "svetlo", "podium"],
  },
  {
    id: "spartan-warriors",
    title: { sk: "Spartan Warriors Fight night", en: "Spartan Warriors Fight Night" },
    description: {
      sk: "Ozvučenie, osvetlenie a LED obrazovka pre športové bojové podujatie v Tvrdošíne.",
      en: "Sound, lighting and LED screen for a combat sports event in Tvrdošín.",
    },
    date: "5/2025",
    category: "sport",
    photo: "ref-spartan",
    gallery: ["ref-spartan-ring", "ref-spartan-sala", "ref-spartan-detail"],
    delivered: ["zvuk", "svetlo", "led", "efekty"],
  },
  {
    id: "plesova-sezona",
    title: { sk: "Plesová sezóna", en: "Ball Season" },
    description: {
      sk: "Ozvučenie, osvetlenie a LED obrazovka plesov vo Vavrečke a Hoteli Slanica s hosťami Starmania originál a Gipsy Čáve.",
      en: "Sound, lighting and LED screen for balls in Vavrečka and Hotel Slanica, with guests Starmania originál and Gipsy Čáve.",
    },
    date: null,
    category: "plesy",
    photo: null,
    delivered: ["zvuk", "svetlo", "led"],
  },
  {
    id: "benefic-deti-detom",
    title: { sk: "Benefičný koncert Deti deťom", en: "Deti deťom Charity Concert" },
    description: {
      sk: "Ozvučenie, osvetlenie a LED obrazovka pre benefičný koncert v Zákamennom.",
      en: "Sound, lighting and LED screen for a charity concert in Zákamenné.",
    },
    date: null,
    category: "cirkevne",
    photo: "ref-benefit-folklor",
    gallery: ["ref-benefit-zbor", "ref-benefit-final", "ref-benefit-detail"],
    delivered: ["zvuk", "svetlo", "led"],
  },
  {
    id: "cervena-streda",
    title: { sk: "Červená streda", en: "Red Wednesday" },
    description: {
      sk: "Nasvietenie kostola v Zákamennom na podporu prenasledovaným kresťanom.",
      en: "Floodlighting of the church in Zákamenné in support of persecuted Christians.",
    },
    date: "11/2024",
    category: "cirkevne",
    photo: "ref-cervena-streda",
    gallery: ["ref-nasvietenie"],
    delivered: ["nasvietenie"],
  },
  {
    id: "video-prenos-omsi",
    title: { sk: "Video prenos omší na LED obrazovku", en: "Live Mass Relay to LED Screen" },
    description: {
      sk: "LED obrazovka a ozvučenie slávnostnej sv. omše v Zákamennom a primičnej sv. omše v Námestove.",
      en: "LED screen and sound for a solemn mass in Zákamenné and a first mass in Námestovo.",
    },
    date: "8/2025",
    category: "cirkevne",
    photo: null,
    delivered: ["led", "zvuk"],
  },
  {
    id: "ocenenie-obcanov",
    title: { sk: "Slávnostné ocenenie občanov", en: "Civic Awards Ceremony" },
    description: {
      sk: "Ozvučenie, osvetlenie a LED obrazovka pri príležitostí ocenenia občanov v Zákamennom.",
      en: "Sound, lighting and LED screen for a civic awards ceremony in Zákamenné.",
    },
    date: "7/2025",
    category: "kultura",
    photo: null,
    delivered: ["zvuk", "svetlo", "led"],
  },
  {
    id: "sportovec-roka",
    title: { sk: "Športovec roka 2025", en: "Athlete of the Year 2025" },
    description: {
      sk: "Ozvučenie a osvetlenie ocenenia armwrestlingových športovcov v kaštieli vo Vyšnom Kubíne.",
      en: "Sound and lighting for an arm wrestling awards ceremony at the manor house in Vyšný Kubín.",
    },
    date: "12/2025",
    category: "sport",
    photo: null,
    delivered: ["zvuk", "svetlo"],
  },
  {
    id: "lepsia-konferencia",
    title: { sk: "Lepšia konferencia", en: "Lepšia konferencia" },
    description: {
      sk: "Ozvučenie a osvetlenie konferencie v Námestove.",
      en: "Sound and lighting for a conference in Námestovo.",
    },
    date: "3/2025",
    category: "konferencie",
    photo: null,
    delivered: ["zvuk", "svetlo"],
  },
  {
    id: "meet-up-2025",
    title: { sk: "Meet Up 2025", en: "Meet Up 2025" },
    description: {
      sk: "Ozvučenie a osvetlenie konferencie v Žiline.",
      en: "Sound and lighting for a conference in Žilina.",
    },
    date: "12/2025",
    category: "konferencie",
    photo: null,
    delivered: ["zvuk", "svetlo"],
  },
  {
    id: "party",
    title: { sk: "Párty", en: "Parties" },
    description: {
      sk: "Ozvučenie, osvetlenie, LED obrazovka a rôzne špeciálne efekty pre párty.",
      en: "Sound, lighting, LED screen and a range of special effects for parties.",
    },
    date: null,
    category: "plesy",
    photo: "ref-party-jazero",
    gallery: [
      "ref-party-1",
      "fx-co2-dav",
      "fx-co2-podium",
      "ref-party-4",
      "ref-koncert-hala",
      "ref-party-5",
      "ref-party-6",
      "ref-party-7",
      "fx-ohen-podium",
      "ref-party-9",
    ],
    delivered: ["zvuk", "svetlo", "led", "efekty"],
  },
];

/** Referencie, ktoré majú vlastnú fotografiu. Použité v náhľade na úvodnej stránke. */
export const referencesWithPhoto = references.filter((r) => r.photo !== null);

export const referenceCategories = (
  Object.keys(categoryLabels) as RefCategory[]
).filter((c) => references.some((r) => r.category === c));
