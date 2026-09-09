// Mapa zdrojových fotografií Webster Sound & Light.
// Zdroj je jediný pravdivý podklad: každá položka ukazuje na reálnu fotku
// z dodaných zložiek. Nič sa nedopĺňa ani nenahrádza generovaným obsahom.

export const SOURCE_ROOT = "C:/Users/marko/Desktop/Obsidian/Markey valut/Webster";

// tier riadi maximálnu šírku výstupu:
//   hero   -> 2560 px (fullbleed, nad ohybom)
//   plate  -> 1920 px (veľké sekčné fotografie)
//   card   -> 1280 px (dlaždice, karty, galéria)
//   thumb  ->  768 px (fotky s nízkym zdrojovým rozlíšením)
export const PHOTOS = [
  // ---- Hero a veľké plochy -------------------------------------------------
  {
    slug: "hero-koncert",
    src: "Fotky technika/Akcie/Koncerty/IMG_4310.JPG",
    tier: "hero",
    focus: "center",
    alt: {
      sk: "Dav pred pódiom pod vejárom svetelných lúčov na koncerte v hale",
      en: "Crowd in front of a stage under a fan of light beams at an indoor concert",
    },
  },
  {
    slug: "podium-komplet",
    src: "Fotky technika/Komplet/IMG_1533.JPG",
    tier: "plate",
    focus: "center",
    alt: {
      sk: "Kompletné prestrešené pódium s line array ozvučením a kapelou pri zvukovej skúške",
      en: "Complete covered stage with line array sound system and a band at soundcheck",
    },
  },
  {
    slug: "strecha-krajina",
    src: "Fotky technika/Strecha/IMG_2345.JPG",
    tier: "plate",
    focus: "center",
    alt: {
      sk: "Postavená hliníková strecha s pódiom na kopci nad obcou za súmraku",
      en: "Assembled aluminium stage roof on a hillside above a village at dusk",
    },
  },
  {
    slug: "sklad-technika",
    src: "Fotky technika/Svetla/IMG_2315.JPG",
    tier: "plate",
    focus: "center",
    alt: {
      sk: "Sklad techniky Webster Sound & Light s flightcasmi, truss dielmi a reproduktormi",
      en: "Webster Sound & Light equipment store with flight cases, truss sections and speakers",
    },
  },

  // ---- Technika: detaily ---------------------------------------------------
  {
    slug: "zvuk-linearray-vonku",
    src: "Fotky technika/Zvuk/IMG_2259.JPG",
    tier: "card",
    focus: "center",
    alt: {
      sk: "Zavesený line array a stohované subwoofery pri vonkajšom pódiu",
      en: "Flown line array and stacked subwoofers beside an outdoor stage",
    },
  },
  {
    slug: "zvuk-linearray-hala",
    src: "Fotky technika/Zvuk/IMG_4276.JPG",
    tier: "card",
    focus: "center",
    alt: {
      sk: "Line array zavesený na truss konštrukcii v hale, vedľa pohyblivé svetlá",
      en: "Line array flown from a truss inside a hall, moving lights alongside",
    },
  },
  {
    slug: "zvuk-linearray-stack",
    src: "Fotky technika/Zvuk/IMG_2266.JPG",
    tier: "card",
    focus: "center",
    alt: {
      sk: "Stohovaná zostava line array reproduktorov a subwooferu pod prístreškom",
      en: "Ground-stacked line array and subwoofer under a canopy",
    },
  },
  {
    slug: "zvuk-sala",
    src: "Fotky technika/Zvuk/IMG_3745.JPEG",
    tier: "card",
    focus: "center",
    alt: {
      sk: "Ozvučenie kultúrnej sály: line array po stranách javiska a subwoofery pred pódiom",
      en: "Hall sound system: line arrays flanking the stage with subwoofers in front",
    },
  },
  {
    slug: "mikrofony-bezdrotove",
    src: "Fotky technika/Zvuk/Mikrofony/IMG_0570.JPEG",
    tier: "card",
    focus: "center",
    alt: {
      sk: "Racky bezdrôtových prijímačov Sennheiser s ručnými mikrofónmi a bodypackmi",
      en: "Racks of Sennheiser wireless receivers with handheld microphones and bodypacks",
    },
  },
  {
    slug: "svetla-moving-heads",
    src: "Fotky technika/Svetla/IMG_0810.JPEG",
    tier: "card",
    focus: "center",
    alt: {
      sk: "Pripravená zostava pohyblivých svetelných hláv typu beam, spot a LED wash",
      en: "A prepared set of beam, spot and LED wash moving head fixtures",
    },
  },
  {
    slug: "truss-sklad",
    src: "Fotky technika/Truss/IMG_0494.JPEG",
    tier: "card",
    focus: "center",
    alt: {
      sk: "Hliníkový štvorcový truss v rôznych dĺžkach, rohové kocky a vežové diely",
      en: "Square aluminium truss in various lengths with corner blocks and tower sections",
    },
  },
  {
    slug: "podium-nivtec",
    src: "Fotky technika/Strecha/Nivtec/IMG_0805.JPEG",
    tier: "card",
    focus: "center",
    alt: {
      sk: "Stoh systémových pódiových podest Nivtec s certifikačnými štítkami",
      en: "Stack of Nivtec system stage decks with certification labels",
    },
  },

  // ---- Referencie a akcie --------------------------------------------------
  {
    slug: "ref-klin",
    src: "Fotky technika/Komplet/IMG_9867.JPG",
    tier: "plate",
    focus: "center",
    alt: {
      sk: "Prestrešené pódium na Dni obce Klin s detským folklórnym súborom",
      en: "Covered stage at the Klin village day with a children's folk ensemble",
    },
  },
  {
    slug: "ref-gafa",
    src: "Fotky technika/Komplet/IMG_9294.JPG",
    tier: "plate",
    focus: "center",
    alt: {
      sk: "Prestrešené pódium s LED obrazovkou na podujatí GAFA Car fest",
      en: "Covered stage with an LED screen at the GAFA Car fest",
    },
  },
  {
    slug: "ref-spartan",
    src: "Fotky technika/Akcie/BOX/IMG_2047.JPG",
    tier: "plate",
    focus: "center",
    alt: {
      sk: "Nástup zápasníka pred LED obrazovkou s plameňovými efektmi na podujatí Spartan Warriors",
      en: "Fighter walkout in front of an LED screen with flame effects at a Spartan Warriors event",
    },
  },
  {
    slug: "ref-spartan-ring",
    src: "Fotky technika/Akcie/BOX/IMG_2033.JPG",
    tier: "card",
    focus: "center",
    alt: {
      sk: "Nasvietený ring počas športového bojového podujatia",
      en: "Lit ring during a combat sports event",
    },
  },
  {
    slug: "ref-spartan-sala",
    src: "Fotky technika/Akcie/BOX/IMG_8824.JPG",
    tier: "card",
    focus: "center",
    alt: {
      sk: "Sála s ringom, LED obrazovkou a osvetlením počas bojového podujatia",
      en: "Venue with ring, LED screen and lighting during a combat sports event",
    },
  },
  {
    slug: "ref-spartan-detail",
    src: "Fotky technika/Akcie/BOX/IMG_8811.JPG",
    tier: "card",
    focus: "center",
    alt: {
      sk: "Detail osvetlenia a LED obrazovky pri športovom bojovom podujatí",
      en: "Lighting and LED screen detail at a combat sports event",
    },
  },
  {
    slug: "ref-benefit-folklor",
    src: "Fotky technika/Akcie/Benneficny koncert/IMG_6785.JPG",
    tier: "plate",
    focus: "center",
    alt: {
      sk: "Folklórna kapela pred LED obrazovkou s ľudovým motívom na benefičnom koncerte",
      en: "Folk band in front of an LED screen with a traditional motif at a charity concert",
    },
  },
  {
    slug: "ref-benefit-zbor",
    src: "Fotky technika/Akcie/Benneficny koncert/IMG_5863.JPG",
    tier: "card",
    focus: "center",
    alt: {
      sk: "Účinkujúci na nasvietenom javisku počas benefičného koncertu",
      en: "Performers on a lit stage during a charity concert",
    },
  },
  {
    slug: "ref-benefit-final",
    src: "Fotky technika/Akcie/Benneficny koncert/IMG_9070.JPEG",
    tier: "card",
    focus: "center",
    alt: {
      sk: "Záver benefičného koncertu s vyhlásením vyzbieranej sumy na LED obrazovke",
      en: "Finale of a charity concert with the amount raised shown on the LED screen",
    },
  },
  {
    slug: "ref-benefit-detail",
    src: "Fotky technika/Akcie/Benneficny koncert/IMG_2271.JPG",
    tier: "thumb",
    focus: "center",
    alt: {
      sk: "Pohľad na javisko počas benefičného koncertu",
      en: "View of the stage during a charity concert",
    },
  },
  {
    slug: "ref-cervena-streda",
    src: "Fotky technika/Akcie/Nasvietenie/IMG_5480.JPG",
    tier: "plate",
    focus: "center",
    alt: {
      sk: "Kostol nasvietený na červeno so svetelnými lúčmi počas Červenej stredy",
      en: "Church floodlit in red with light beams during Red Wednesday",
    },
  },
  {
    slug: "ref-nasvietenie",
    src: "Fotky technika/Akcie/Nasvietenie/IMG_5488.JPG",
    tier: "card",
    focus: "center",
    alt: {
      sk: "Architektúrne nasvietenie budovy počas večerného podujatia",
      en: "Architectural floodlighting of a building during an evening event",
    },
  },
  {
    slug: "ref-koncert-amfiteater",
    src: "Fotky technika/Akcie/Koncerty/IMG_0085.JPG",
    tier: "plate",
    focus: "center",
    alt: {
      sk: "Kapela na drevenom amfiteátri s nasvietením a line array ozvučením, dav pred pódiom",
      en: "Band on a wooden amphitheatre stage with lighting and line array sound, crowd in front",
    },
  },
  {
    slug: "ref-koncert-hala",
    src: "Fotky technika/Akcie/Koncerty/IMG_4101.JPG",
    tier: "card",
    focus: "center",
    alt: {
      sk: "Koncert v hale s pohyblivým osvetlením nad pódiom",
      en: "Indoor concert with moving lights above the stage",
    },
  },
  {
    slug: "ref-party-jazero",
    src: "Fotky technika/Akcie/Diskoteky/IMG_9737.JPG",
    tier: "plate",
    focus: "center",
    alt: {
      sk: "Prestrešené pódium s LED obrazovkou a osvetlením pripravené na párty pri jazere",
      en: "Covered stage with LED screen and lighting prepared for a lakeside party",
    },
  },
  {
    slug: "ref-party-1",
    src: "Fotky technika/Akcie/Diskoteky/IMG_3077.JPG",
    tier: "card",
    focus: "center",
    alt: {
      sk: "Osvetlenie a dym počas večernej párty",
      en: "Lighting and haze during an evening party",
    },
  },
  {
    slug: "fx-co2-dav",
    src: "Fotky technika/Akcie/Diskoteky/IMG_4390.JPG",
    tier: "plate",
    focus: "center",
    alt: {
      sk: "Dva stĺpy CO2 vystrelené nad dav počas klubovej noci, v pozadí svetelné lúče a truss konštrukcia",
      en: "Two CO2 jets fired above the crowd during a club night, light beams and truss overhead",
    },
  },
  {
    slug: "fx-co2-podium",
    src: "Fotky technika/Akcie/Diskoteky/IMG_4393.JPG",
    tier: "plate",
    focus: "center",
    alt: {
      sk: "CO2 delá strieľajúce z pódia počas DJ setu, pred pódiom tancujúci ľudia",
      en: "CO2 cannons firing from the stage during a DJ set, crowd dancing in front",
    },
  },
  {
    slug: "ref-party-4",
    src: "Fotky technika/Akcie/Diskoteky/IMG_6614.JPEG",
    tier: "card",
    focus: "center",
    alt: {
      sk: "Nasvietený priestor pripravený na večernú zábavu",
      en: "Lit venue prepared for an evening event",
    },
  },
  {
    slug: "ref-party-5",
    src: "Fotky technika/Akcie/Diskoteky/IMG_4472.JPG",
    tier: "thumb",
    focus: "center",
    alt: { sk: "Svetelné efekty počas párty", en: "Lighting effects during a party" },
  },
  {
    slug: "ref-party-6",
    src: "Fotky technika/Akcie/Diskoteky/IMG_6336.JPG",
    tier: "thumb",
    focus: "center",
    alt: { sk: "Osvetlenie tanečného priestoru", en: "Dance floor lighting" },
  },
  {
    slug: "ref-party-7",
    src: "Fotky technika/Akcie/Diskoteky/IMG_6354.JPG",
    tier: "thumb",
    focus: "center",
    alt: { sk: "Svetelné lúče nad davom", en: "Light beams above the crowd" },
  },
  {
    slug: "fx-ohen-podium",
    src: "Fotky technika/Akcie/Diskoteky/OHNE.JPG",
    tier: "plate",
    focus: "center",
    alt: {
      sk: "Štyri plameňomety šľahajúce pred pódiom počas DJ setu, dav pred pódiom v protisvetle",
      en: "Four flame jets firing in front of the stage during a DJ set, crowd silhouetted against them",
    },
  },
  {
    slug: "ref-party-9",
    src: "Fotky technika/Akcie/Diskoteky/IMG_6501.JPG",
    tier: "thumb",
    focus: "center",
    alt: { sk: "Svetelná atmosféra večernej akcie", en: "Lighting atmosphere of an evening event" },
  },
];

export const LOGO_SRC = "Logo firmy/pikla_webster_logo_final_1.png";

export const TIER_WIDTHS = {
  hero: [640, 1080, 1600, 2200, 2560],
  plate: [640, 1080, 1600, 1920],
  card: [480, 800, 1280],
  thumb: [400, 768],
};
