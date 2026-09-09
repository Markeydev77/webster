import { referencesWithPhoto } from "@/content/references";
import { ANCHOR_PHOTO } from "@/components/sections/Services";
import { services } from "@/content/services";
import { equipment } from "@/content/equipment";
import { ReferenceCard } from "@/components/ReferenceCard";
import { EquipmentCta } from "@/components/cta";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  eyebrow: string;
  headline: string;
  lead: string;
  cta: string;
  deliveredLabel: string;
};

/**
 * Náhľad referencií v odsadenej mriežke: prvá karta je široká, ďalšie sa
 * zalamujú okolo nej. Zámerne to nie je trojica rovnakých dlaždíc.
 */
export function ReferencesPreview({
  locale,
  eyebrow,
  headline,
  lead,
  cta,
  deliveredLabel,
}: Props) {
  // Fotky, ktoré už nesie sekcia Služby vyššie, do náhľadu neberieme:
  // na jednej stránke by inak boli dvakrát.
  const usedAbove = new Set<string>([
    ANCHOR_PHOTO,
    ...services.map((s) => s.photo).filter((p): p is string => Boolean(p)),
    ...equipment.map((c) => c.photo).filter((p): p is string => Boolean(p)),
  ]);
  const featured = referencesWithPhoto
    .filter((r) => r.photo !== null && !usedAbove.has(r.photo))
    .slice(0, 5);
  if (featured.length === 0) return null;

  const [first, ...rest] = featured;

  return (
    <section id="referencie" className="scroll-mt-20 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-brand-lift">
          {eyebrow}
        </p>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="max-w-[14ch] font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1]">
              {headline}
            </h2>
            <p className="mt-5 max-w-[54ch] text-[1.02rem] leading-relaxed text-muted">{lead}</p>
          </div>
          <EquipmentCta href={`/${locale}/referencie`} className="shrink-0">
            {cta}
          </EquipmentCta>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ReferenceCard
              reference={first}
              locale={locale}
              deliveredLabel={deliveredLabel}
              sizes="(max-width: 1024px) 100vw, 58vw"
              emphasis
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {rest.slice(0, 2).map((reference) => (
              <ReferenceCard
                key={reference.id}
                reference={reference}
                locale={locale}
                deliveredLabel={deliveredLabel}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
            ))}
          </div>
          {rest.slice(2).map((reference) => (
            <div key={reference.id} className="lg:col-span-6">
              <ReferenceCard
                reference={reference}
                locale={locale}
                deliveredLabel={deliveredLabel}
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
