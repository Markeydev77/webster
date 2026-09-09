"use client";

import { useState } from "react";
import Link from "next/link";
import { eventTypes } from "@/content/event-types";
import { deliveredLabels, references } from "@/content/references";
import { pick, type Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  headline: string;
  lead: string;
  cta: string;
  deliveredLabel: string;
};

/**
 * Selektor typu podujatia.
 *
 * Odpovedá na otázku, ktorú si návštevník kladie ako prvú: „a čo z toho
 * potrebujem ja?" Zvolený typ sa prenesie do rezervačného formulára cez
 * parameter v adrese, takže odkaz sa dá použiť aj v reklame.
 */
export function EventTypes({ locale, headline, lead, cta, deliveredLabel }: Props) {
  const withCoverage = eventTypes.filter((t) => t.covers.length > 0);
  const [activeId, setActiveId] = useState(withCoverage[0]?.id ?? "");
  const active = withCoverage.find((t) => t.id === activeId) ?? withCoverage[0];

  if (!active) return null;

  const evidence = active.evidence
    .map((id) => references.find((r) => r.id === id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <section className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <h2 className="max-w-[16ch] font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1]">
          {headline}
        </h2>
        <p className="mt-5 max-w-[58ch] text-[1.02rem] leading-relaxed text-muted">{lead}</p>

        <div className="mt-12 grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div role="tablist" aria-orientation="vertical" className="border-t border-line">
            {withCoverage.map((type) => {
              const selected = type.id === active.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  role="tab"
                  id={`typ-tab-${type.id}`}
                  aria-selected={selected}
                  aria-controls="typ-panel"
                  onClick={() => setActiveId(type.id)}
                  className={`flex w-full items-center justify-between gap-4 border-b border-line
                    py-4 text-left transition-colors duration-200 ${
                      selected ? "text-text" : "text-muted hover:text-text"
                    }`}
                >
                  <span
                    className={`font-display text-[1.15rem] font-semibold tracking-tight sm:text-[1.3rem] ${
                      selected ? "text-brand-lift" : ""
                    }`}
                  >
                    {pick(type.label, locale)}
                  </span>
                  <span
                    aria-hidden
                    className={`h-px shrink-0 bg-brand-lift transition-[width] duration-400
                      ease-[var(--ease-out-soft)] ${selected ? "w-10" : "w-0"}`}
                  />
                </button>
              );
            })}
          </div>

          <div
            id="typ-panel"
            role="tabpanel"
            aria-labelledby={`typ-tab-${active.id}`}
            className="rounded-md border border-line bg-surface p-7 sm:p-9"
          >
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted-2">
              {deliveredLabel}
            </p>
            <ul className="mt-4 space-y-3">
              {active.covers.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-lift"
                  />
                  <span className="font-display text-[1.15rem] font-medium tracking-tight">
                    {pick(deliveredLabels[key], locale)}
                  </span>
                </li>
              ))}
            </ul>

            {evidence.length > 0 && (
              <ul className="mt-7 space-y-2 border-t border-line pt-6">
                {evidence.slice(0, 4).map((ref) => (
                  <li key={ref.id} className="flex items-baseline gap-3 text-[0.88rem] text-muted">
                    <span className="truncate">{pick(ref.title, locale)}</span>
                    {ref.date && (
                      <span className="ml-auto shrink-0 font-mono text-[0.72rem] text-muted-2">
                        {ref.date}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <Link
              href={`/${locale}?typ=${active.id}#rezervacia`}
              className="group mt-8 inline-flex items-center gap-2 rounded-md bg-brand-ink px-5 py-3
                text-[0.92rem] font-semibold text-brand-lift ring-1 ring-inset ring-brand/40
                transition-colors duration-300 hover:bg-brand hover:text-white hover:ring-brand"
            >
              {cta}
              <span
                aria-hidden
                className="transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
