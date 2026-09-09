/**
 * Typy podujatí. Slúžia na dve veci naraz:
 *  1. selektor na úvodnej stránke ("čo od nás dostanete pre váš typ akcie"),
 *  2. hodnoty poľa "Typ podujatia" v rezervačnom formulári.
 *
 * `covers` sú kategórie techniky, ktoré sme na daný typ akcie reálne nasadili
 * podľa referencií v podkladoch. Nič nad rámec doloženého.
 */

import type { DeliveredKey } from "./references";

export type EventType = {
  id: string;
  label: { sk: string; en: string };
  covers: DeliveredKey[];
  /** Id referencií, ktoré tento typ akcie dokladajú. */
  evidence: string[];
};

export const eventTypes: EventType[] = [
  {
    id: "koncert",
    label: { sk: "Koncert", en: "Concert" },
    covers: ["zvuk", "svetlo", "podium"],
    evidence: ["vavrecka-dni-obce", "benefic-deti-detom"],
  },
  {
    id: "festival",
    label: { sk: "Festival", en: "Festival" },
    covers: ["podium", "zvuk", "svetlo", "led"],
    evidence: ["zakafest", "snow-fest", "gafa-car-fest"],
  },
  {
    id: "svadba",
    label: { sk: "Svadba", en: "Wedding" },
    covers: ["zvuk", "svetlo"],
    evidence: [],
  },
  {
    id: "firemny",
    label: { sk: "Firemný event", en: "Corporate event" },
    covers: ["podium", "zvuk", "svetlo"],
    evidence: ["ct-park"],
  },
  {
    id: "kulturne",
    label: { sk: "Kultúrne podujatie", en: "Cultural event" },
    covers: ["zvuk", "svetlo", "led"],
    evidence: ["ocenenie-obcanov", "modna-prehliadka", "benefic-deti-detom"],
  },
  {
    id: "klubovy",
    label: { sk: "Klubový event a párty", en: "Club night and party" },
    covers: ["zvuk", "svetlo", "led", "efekty"],
    evidence: ["party", "plesova-sezona"],
  },
  {
    id: "obecne",
    label: { sk: "Mestské alebo obecné podujatie", en: "Town or village event" },
    covers: ["podium", "zvuk", "svetlo"],
    evidence: [
      "klin-den-obce",
      "novot-dni-obce",
      "krusetnica-dni-obce",
      "bziny-680-vyrocie",
      "zakamenne-dni-obce",
    ],
  },
  {
    id: "konferencia",
    label: { sk: "Konferencia", en: "Conference" },
    covers: ["zvuk", "svetlo", "led"],
    evidence: ["lepsia-konferencia", "meet-up-2025"],
  },
  {
    id: "sport",
    label: { sk: "Športové podujatie", en: "Sports event" },
    covers: ["zvuk", "svetlo", "led", "efekty"],
    evidence: ["spartan-warriors", "sportovec-roka"],
  },
  {
    id: "ine",
    label: { sk: "Iné", en: "Other" },
    covers: [],
    evidence: [],
  },
];

export const OTHER_EVENT_TYPE = "ine";
