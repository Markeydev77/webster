"use client";

import { useMemo, useState } from "react";
import {
  references,
  categoryLabels,
  referenceCategories,
  type RefCategory,
} from "@/content/references";
import { ReferenceCard } from "@/components/ReferenceCard";
import { pick, getDictionary, type Locale } from "@/lib/i18n";

export function ReferencesArchive({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).references;
  const [filter, setFilter] = useState<RefCategory | "all">("all");

  const shown = useMemo(
    () => (filter === "all" ? references : references.filter((r) => r.category === filter)),
    [filter],
  );

  const tabs: { id: RefCategory | "all"; label: string; count: number }[] = [
    { id: "all", label: t.all, count: references.length },
    ...referenceCategories.map((c) => ({
      id: c,
      label: pick(categoryLabels[c], locale),
      count: references.filter((r) => r.category === c).length,
    })),
  ];

  return (
    <>
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.pageTitle}>
          {tabs.map((tab) => {
            const active = tab.id === filter;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                aria-pressed={active}
                className={`inline-flex items-baseline gap-2 rounded-md border px-4 py-2 text-[0.86rem]
                  transition-colors duration-200 ${
                    active
                      ? "border-brand/60 bg-brand-ink text-brand-lift"
                      : "border-line text-muted hover:border-brand-lift/45 hover:text-text"
                  }`}
              >
                {tab.label}
                <span className="font-mono text-[0.7rem] text-muted-2">{tab.count}</span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-6 text-[0.88rem] text-muted-2">
          {t.count(shown.length)}
        </p>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((reference) => (
            <li key={reference.id}>
              <ReferenceCard
                reference={reference}
                locale={locale}
                deliveredLabel={t.deliveredLabel}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 32vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
