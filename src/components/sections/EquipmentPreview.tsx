import { equipment } from "@/content/equipment";
import { Photo } from "@/components/Photo";
import { EquipmentCta } from "@/components/cta";
import { pick, type Locale } from "@/lib/i18n";

type Props = { locale: Locale; headline: string; lead: string; cta: string };

/**
 * Vodorovná lišta kategórií techniky. Na mobile sa mení na zvislý zoznam,
 * pretože vodorovné posúvanie je na dotyku horšie objaviteľné.
 */
export function EquipmentPreview({ locale, headline, lead, cta }: Props) {
  const shown = equipment.slice(0, 7);

  return (
    <section id="technika" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="max-w-[14ch] font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1]">
              {headline}
            </h2>
            <p className="mt-5 max-w-[54ch] text-[1.02rem] leading-relaxed text-muted">{lead}</p>
          </div>
          <EquipmentCta href={`/${locale}/technika`} className="shrink-0">
            {cta}
          </EquipmentCta>
        </div>
      </div>

      <div className="mt-12 sm:mt-14">
        <ul
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4
            [scrollbar-width:thin] sm:px-8"
        >
          {shown.map((category) => (
            <li
              key={category.id}
              className="group w-[76vw] shrink-0 snap-start sm:w-[38vw] lg:w-[23vw]"
            >
              <a
                href={`/${locale}/technika#${category.id}`}
                className="block overflow-hidden rounded-md border border-line
                  transition-colors duration-300 hover:border-brand-lift/50"
              >
                {category.photo && (
                  <div className="overflow-hidden">
                    <Photo
                      slug={category.photo}
                      locale={locale}
                      sizes="(max-width: 640px) 76vw, (max-width: 1024px) 38vw, 23vw"
                      className="block aspect-[4/5] w-full transition-transform duration-700
                        ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-display text-[1.15rem] font-semibold tracking-tight">
                    {pick(category.title, locale)}
                  </h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">
                    {pick(category.intro, locale)}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
