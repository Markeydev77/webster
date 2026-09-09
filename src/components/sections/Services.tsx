import { services } from "@/content/services";
import { references } from "@/content/references";
import { Photo } from "@/components/Photo";
import { pick, type Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  eyebrow: string;
  headline: string;
  lead: string;
  /** Krátke zhrnutie pod odstavcom, vysadené výraznejšie ako bežný text. */
  punch: string;
  evidenceLabel: string;
};

/** Veľká kotviaca fotografia sekcie. Exportovaná, aby náhľad referencií
 *  vedel túto fotku preskočiť a nezopakoval ju na tej istej stránke. */
export const ANCHOR_PHOTO = "ref-klin";

const titleOf = (id: string, locale: Locale) => {
  const ref = references.find((r) => r.id === id);
  return ref ? pick(ref.title, locale) : null;
};

/**
 * Služby ako redakčný zoznam riadkov, nie ako mriežka generických kariet.
 * Každá služba nesie odkaz na reálne akcie, na ktorých bola dodaná, takže
 * sekcia nie je zoznam sľubov ale zoznam doložených faktov.
 */
export function Services({ locale, eyebrow, headline, lead, punch, evidenceLabel }: Props) {
  return (
    <section id="sluzby" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-brand-lift">
          {eyebrow}
        </p>
        <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2.1rem,5vw,4rem)] font-bold leading-[0.98]">
          {headline}
        </h2>
        <p className="mt-6 max-w-[58ch] text-[1.02rem] leading-relaxed text-muted">{lead}</p>
        <p className="mt-5 font-display text-[1.35rem] font-semibold tracking-tight text-brand-lift sm:text-[1.6rem]">
          {punch}
        </p>
      </div>

      {/* Kotviaca fotografia: reálne postavené pódium so strechou a ozvučením */}
      <div className="mt-14 overflow-hidden sm:mt-16">
        <Photo
          slug={ANCHOR_PHOTO}
          locale={locale}
          sizes="100vw"
          className="photo-reveal block aspect-[16/9] w-full sm:aspect-[21/9]"
          imgClassName="object-[center_58%]"
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <ul className="mt-4 border-t border-line">
          {services.map((service) => {
            const evidence = service.evidence
              .map((id) => titleOf(id, locale))
              .filter((t): t is string => Boolean(t))
              .slice(0, 3);

            return (
              <li key={service.id} className="group border-b border-line">
                <div className="grid items-start gap-5 py-8 md:grid-cols-[minmax(0,7fr)_minmax(0,9fr)_minmax(0,4fr)] md:gap-10 md:py-10">
                  <h3 className="font-display text-[1.6rem] font-semibold leading-tight tracking-tight transition-colors duration-300 group-hover:text-brand-lift md:text-[2rem]">
                    {pick(service.title, locale)}
                  </h3>

                  <div>
                    <p className="max-w-[54ch] text-[0.98rem] leading-relaxed text-muted">
                      {pick(service.body, locale)}
                    </p>
                    {evidence.length > 0 && (
                      <p className="mt-4 text-[0.8rem] leading-relaxed text-muted-2">
                        <span className="font-mono uppercase tracking-[0.16em] text-muted-2">
                          {evidenceLabel}:
                        </span>{" "}
                        {evidence.join(", ")}
                      </p>
                    )}
                  </div>

                  {service.photo && (
                    <div className="overflow-hidden rounded-md">
                      <Photo
                        slug={service.photo}
                        locale={locale}
                        sizes="(max-width: 768px) 100vw, 22vw"
                        className="block aspect-[4/3] w-full transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
                      />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
