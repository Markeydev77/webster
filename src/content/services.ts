/**
 * Služby. Každá je doložená reálnymi referenciami v podkladoch: nič tu nie je
 * marketingový sľub, ktorý firma nemá čím podložiť.
 */

export type Service = {
  id: string;
  title: { sk: string; en: string };
  body: { sk: string; en: string };
  photo: string | null;
  /** Id referencií, ktoré túto službu dokladajú. */
  evidence: string[];
};

export const services: Service[] = [
  {
    id: "ozvucenie",
    title: { sk: "Ozvučenie", en: "Sound" },
    body: {
      sk: "Line array systémy pre obecné dni, festivaly aj koncerty v hale. Bezdrôtové mikrofóny a pódiové monitorovanie pre kapely, folklórne súbory aj rečníkov.",
      en: "Line array systems for village days, festivals and indoor concerts. Wireless microphones and stage monitoring for bands, folk ensembles and speakers.",
    },
    photo: "zvuk-linearray-hala",
    evidence: ["zakafest", "klin-den-obce", "novot-dni-obce", "lepsia-konferencia"],
  },
  {
    id: "osvetlenie",
    title: { sk: "Osvetlenie", en: "Lighting" },
    body: {
      sk: "Pohyblivé hlavy, wash a beam svetlá pre koncertné aj plesové nasvietenie. Od jemného nasvietenia konferencie po plnú svetelnú šou na festivale.",
      en: "Moving heads, wash and beam fixtures for concert and ballroom lighting. From a restrained conference wash to a full festival light show.",
    },
    photo: "ref-koncert-hala",
    evidence: ["spartan-warriors", "benefic-deti-detom", "meet-up-2025"],
  },
  {
    id: "podia",
    title: { sk: "Pódiá a strechy", en: "Stages and roofs" },
    body: {
      sk: "Systémové pódiové podesty a hliníkové strechy s truss konštrukciou. Postavíme ich na lúke, na parkovisku aj priamo na lyžiarskom svahu.",
      en: "System stage decks and aluminium roofs on truss structures. Built on a meadow, on a car park, or directly on a ski slope.",
    },
    photo: "podium-nivtec",
    evidence: ["snow-fest", "gafa-car-fest", "ct-park", "krusetnica-dni-obce"],
  },
  {
    id: "led",
    title: { sk: "LED obrazovky", en: "LED screens" },
    body: {
      sk: "LED obrazovka ako pozadie pódia, informačná plocha alebo prenos naživo. Použili sme ju na festivale, plese, športovom podujatí aj pri prenose svätej omše.",
      en: "LED screen as a stage backdrop, an information surface or a live relay. Used at festivals, balls, sports events and for a live mass relay.",
    },
    photo: "ref-benefit-folklor",
    evidence: ["snow-fest", "video-prenos-omsi", "spartan-warriors", "plesova-sezona"],
  },
  {
    id: "nasvietenie",
    title: { sk: "Architektúrne nasvietenie", en: "Architectural lighting" },
    body: {
      sk: "Nasvietenie budov a exteriérov pre pamätné dni a mestské podujatia. Napríklad kostol v Zákamennom nasvietený na červeno počas Červenej stredy.",
      en: "Floodlighting of buildings and exteriors for commemorative days and civic events. For example the church in Zákamenné lit in red for Red Wednesday.",
    },
    photo: "ref-cervena-streda",
    evidence: ["cervena-streda"],
  },
  {
    id: "produkcia",
    title: { sk: "Kompletná technická produkcia", en: "Full technical production" },
    body: {
      sk: "Od prázdnej lúky po hotové podujatie. Pódium, strecha, zvuk, svetlo, obrazovka a obsluha počas celého programu, na jednu objednávku a s jedným zodpovedným človekom.",
      en: "From an empty field to a finished event. Stage, roof, sound, lighting, screen and an operating crew for the whole programme, in a single booking with one person responsible.",
    },
    photo: "sklad-technika",
    evidence: ["snow-fest", "klin-den-obce", "gafa-car-fest", "vavrecka-dni-obce"],
  },
];
