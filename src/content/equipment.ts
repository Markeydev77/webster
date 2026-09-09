/**
 * Katalóg techniky.
 *
 * Prezentačný katalóg, NIE e-shop: žiadny košík, žiadne ceny, žiadny checkout.
 * Zámerne bez technických parametrov (bod 23 zadania) a bez modelových
 * označení, ktoré nie sú spoľahlivo čitateľné z dodaných fotografií.
 *
 * Uvedené je len to, čo je na fotografiách reálne vidieť. Značky sa uvádzajú
 * iba tam, kde sú na fotografii jednoznačne čitateľné (Sennheiser, Nivtec).
 */

export type EquipmentItem = {
  name: { sk: string; en: string };
  note: { sk: string; en: string };
};

export type EquipmentCategory = {
  id: string;
  title: { sk: string; en: string };
  intro: { sk: string; en: string };
  photo: string | null;
  items: EquipmentItem[];
};

export const equipment: EquipmentCategory[] = [
  {
    id: "zvuk",
    title: { sk: "Zvuk", en: "Sound" },
    intro: {
      sk: "Systémy pre otvorený priestor aj pre sálu, škálované podľa veľkosti publika.",
      en: "Systems for open air and indoor venues, scaled to the size of the audience.",
    },
    photo: "zvuk-linearray-vonku",
    items: [
      {
        name: { sk: "Line array systém", en: "Line array system" },
        note: {
          sk: "Závesná aj stohovaná konfigurácia podľa priestoru a rozpočtu akcie.",
          en: "Flown or ground stacked, depending on the venue and the scale of the event.",
        },
      },
      {
        name: { sk: "Subwoofery", en: "Subwoofers" },
        note: {
          sk: "Basová sekcia pre koncerty, párty a festivaly v otvorenom priestore.",
          en: "Low end for concerts, parties and open air festivals.",
        },
      },
      {
        name: { sk: "Pódiové monitory", en: "Stage monitors" },
        note: {
          sk: "Odposluch pre kapely, folklórne súbory aj rečníkov.",
          en: "Foldback for bands, folk ensembles and speakers.",
        },
      },
      {
        name: { sk: "Zosilňovače a procesory", en: "Amplifiers and processing" },
        note: {
          sk: "Racková časť systému vrátane systémového procesingu.",
          en: "The rack side of the system, including system processing.",
        },
      },
    ],
  },
  {
    id: "mikrofony",
    title: { sk: "Mikrofóny a bezdrôtové systémy", en: "Microphones and wireless" },
    intro: {
      sk: "Bezdrôtové sety Sennheiser pre spev, moderovanie aj nástroje.",
      en: "Sennheiser wireless sets for vocals, hosting and instruments.",
    },
    photo: "mikrofony-bezdrotove",
    items: [
      {
        name: { sk: "Bezdrôtové ručné mikrofóny", en: "Wireless handheld microphones" },
        note: {
          sk: "Pre spevákov, moderátorov a rečníkov.",
          en: "For singers, hosts and speakers.",
        },
      },
      {
        name: { sk: "Bezdrôtové bodypacky", en: "Wireless bodypacks" },
        note: {
          sk: "Pre náhlavné mikrofóny a nástrojové snímanie.",
          en: "For headset microphones and instrument pickups.",
        },
      },
      {
        name: { sk: "Káblové mikrofóny a stojany", en: "Wired microphones and stands" },
        note: {
          sk: "Kompletné osadenie pódia vrátane stojanov a káblov.",
          en: "Full stage set up, including stands and cabling.",
        },
      },
    ],
  },
  {
    id: "svetla",
    title: { sk: "Svetlá", en: "Lighting" },
    intro: {
      sk: "Pohyblivé hlavy pre koncertné nasvietenie, plesy aj konferencie.",
      en: "Moving head fixtures for concert lighting, balls and conferences.",
    },
    photo: "svetla-moving-heads",
    items: [
      {
        name: { sk: "Pohyblivé hlavy beam a spot", en: "Beam and spot moving heads" },
        note: {
          sk: "Ostré lúče a gobo efekty pre dynamické koncertné nasvietenie.",
          en: "Tight beams and gobo effects for dynamic concert looks.",
        },
      },
      {
        name: { sk: "LED wash pohyblivé hlavy", en: "LED wash moving heads" },
        note: {
          sk: "Plošné farebné nasvietenie pódia a priestoru.",
          en: "Broad colour wash across the stage and the room.",
        },
      },
      {
        name: { sk: "Statické LED svietidlá", en: "Static LED fixtures" },
        note: {
          sk: "Nasvietenie sály, výzdoby a architektúry.",
          en: "Lighting for halls, décor and architecture.",
        },
      },
      {
        name: { sk: "Svetelné pulty a riadenie", en: "Lighting consoles and control" },
        note: {
          sk: "Riadenie svetelnej šou počas celého programu.",
          en: "Running the light show throughout the programme.",
        },
      },
    ],
  },
  {
    id: "podia",
    title: { sk: "Pódiá", en: "Stages" },
    intro: {
      sk: "Systémové podesty Nivtec, stavané do rôznych rozmerov a výšok.",
      en: "Nivtec system decks, built to a range of sizes and heights.",
    },
    photo: "podium-nivtec",
    items: [
      {
        name: { sk: "Systémové pódiové podesty", en: "System stage decks" },
        note: {
          sk: "Modulárne pódium skladané podľa potrieb programu.",
          en: "Modular staging assembled to suit the programme.",
        },
      },
      {
        name: { sk: "Schody a zábradlie", en: "Stairs and railings" },
        note: {
          sk: "Bezpečný prístup na pódium pre účinkujúcich.",
          en: "Safe access to the stage for performers.",
        },
      },
      {
        name: { sk: "Pódiové zaclonenie", en: "Stage skirting" },
        note: {
          sk: "Čierne zaclonenie bokov a čela pódia.",
          en: "Black skirting for the front and sides of the stage.",
        },
      },
    ],
  },
  {
    id: "strechy",
    title: { sk: "Hliníkové strechy", en: "Aluminium roofs" },
    intro: {
      sk: "Prestrešenie pódia pre podujatia, ktoré musia ísť aj za dažďa.",
      en: "Stage cover for events that have to go ahead in the rain.",
    },
    photo: "strecha-krajina",
    items: [
      {
        name: { sk: "Sedlová strecha na truss vežiach", en: "Gable roof on truss towers" },
        note: {
          sk: "Základné prestrešenie pódia, staviame vo viacerých rozmeroch.",
          en: "The standard stage cover, built in several sizes.",
        },
      },
      {
        name: { sk: "Oblúková strecha", en: "Arched roof" },
        note: {
          sk: "Alternatívny tvar prestrešenia pre otvorené priestranstvá.",
          en: "An alternative cover shape for open spaces.",
        },
      },
      {
        name: { sk: "Bočné a zadné zaclonenie", en: "Side and rear screening" },
        note: {
          sk: "Ochrana pódia pred vetrom a bočným dažďom.",
          en: "Protects the stage from wind and driving rain.",
        },
      },
    ],
  },
  {
    id: "truss",
    title: { sk: "Truss konštrukcie", en: "Truss structures" },
    intro: {
      sk: "Hliníkový štvorcový truss v rôznych dĺžkach vrátane rohov a veží.",
      en: "Square aluminium truss in various lengths, with corners and towers.",
    },
    photo: "truss-sklad",
    items: [
      {
        name: { sk: "Truss diely a rohové kocky", en: "Truss sections and corner blocks" },
        note: {
          sk: "Stavba mostov nad pódiom a bočných vežových zostáv.",
          en: "Building overhead bridges and side tower assemblies.",
        },
      },
      {
        name: { sk: "Vežové zostavy a zdvíhanie", en: "Towers and lifting" },
        note: {
          sk: "Zdvíhanie svetelných mostov a odposluchov do výšky.",
          en: "Lifting lighting bridges and PA hangs into position.",
        },
      },
    ],
  },
  {
    id: "led",
    title: { sk: "LED obrazovky", en: "LED screens" },
    intro: {
      sk: "Obrazovka ako pozadie pódia, informačná plocha alebo prenos naživo.",
      en: "Screen as a stage backdrop, information surface or live relay.",
    },
    photo: "ref-benefit-folklor",
    items: [
      {
        name: { sk: "Modulárna LED stena", en: "Modular LED wall" },
        note: {
          sk: "Skladá sa do rozmeru podľa pódia a priestoru.",
          en: "Assembled to a size that suits the stage and the venue.",
        },
      },
      {
        name: { sk: "Prehrávanie a živý prenos", en: "Playback and live relay" },
        note: {
          sk: "Grafika, video aj prenos diania naživo.",
          en: "Graphics, video and live relay of the event.",
        },
      },
    ],
  },
  {
    id: "efekty",
    title: { sk: "Špeciálne efekty", en: "Special effects" },
    intro: {
      sk: "Efekty pre nástupy, vyvrcholenia programu a párty.",
      en: "Effects for entrances, programme highlights and parties.",
    },
    photo: "ref-spartan",
    items: [
      {
        name: { sk: "Plameňové efekty", en: "Flame effects" },
        note: {
          sk: "Nasadzujeme na športových podujatiach a pri nástupoch.",
          en: "Used at sports events and for performer entrances.",
        },
      },
      {
        name: { sk: "Dymostroje a hazery", en: "Smoke and haze machines" },
        note: {
          sk: "Zviditeľnenie svetelných lúčov v priestore.",
          en: "Makes light beams visible in the room.",
        },
      },
    ],
  },
  {
    id: "doplnky",
    title: { sk: "Doplnkové vybavenie", en: "Additional equipment" },
    intro: {
      sk: "Vybavenie, ktoré k technickému zabezpečeniu podujatia patrí.",
      en: "The supporting kit that a technical production needs.",
    },
    photo: "sklad-technika",
    items: [
      {
        name: { sk: "Davové zábrany", en: "Crowd barriers" },
        note: {
          sk: "Oddelenie priestoru pred pódiom.",
          en: "Separating the area in front of the stage.",
        },
      },
      {
        name: { sk: "Elektroinštalácia a rozvody", en: "Power distribution" },
        note: {
          sk: "Napájanie techniky vrátane rozvodov po mieste podujatia.",
          en: "Powering the rig, including distribution across the site.",
        },
      },
      {
        name: { sk: "Doprava a obsluha", en: "Transport and crew" },
        note: {
          sk: "Dovoz, stavba, obsluha počas programu a zbúranie.",
          en: "Delivery, build, operation during the programme and get out.",
        },
      },
    ],
  },
];
