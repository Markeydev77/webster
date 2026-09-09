"use client";

import { useEffect, useRef, useState } from "react";
import { equipment } from "@/content/equipment";
import { Photo } from "@/components/Photo";
import { EquipmentCta } from "@/components/cta";
import { pick, type Locale } from "@/lib/i18n";

type Props = { locale: Locale; headline: string; lead: string; cta: string };

/** Okrúhle šípkové tlačidlo na posun pásu. Iba desktop, na mobile je dotykové listovanie prirodzené. */
function RailArrow({
  direction,
  onClick,
  disabled,
  label,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border
        border-brand-lift/45 text-brand-lift transition-all duration-300 ease-[var(--ease-out-soft)]
        hover:border-brand-lift hover:bg-brand-lift hover:text-ground
        disabled:pointer-events-none disabled:opacity-25"
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
        {direction === "left" ? (
          <path d="M10 3.5 5 8l5 4.5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M6 3.5 11 8l-5 4.5" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

/**
 * Vodorovná lišta kategórií techniky. Na mobile sa mení na zvislý zoznam,
 * pretože vodorovné posúvanie je na dotyku horšie objaviteľné.
 *
 * Zobrazuje VŠETKY kategórie (predtým sa orezávalo na prvých 7, čím
 * z náhľadu vypadli Špeciálne efekty aj Doplnkové vybavenie).
 */
export function EquipmentPreview({ locale, headline, lead, cta }: Props) {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    updateEdges();
    const el = railRef.current;
    if (!el) return;
    const onResize = () => updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("li");
    const step = (card?.offsetWidth ?? el.clientWidth * 0.8) + 16;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

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

          <div className="flex shrink-0 items-center gap-4">
            <div className="hidden items-center gap-2 sm:flex">
              <RailArrow direction="left" onClick={() => scrollByCard(-1)} disabled={atStart} label="Posunúť doľava" />
              <RailArrow direction="right" onClick={() => scrollByCard(1)} disabled={atEnd} label="Posunúť doprava" />
            </div>
            <EquipmentCta href={`/${locale}/technika`}>{cta}</EquipmentCta>
          </div>
        </div>
      </div>

      <div className="relative mt-12 sm:mt-14">
        {/* Doblednutie na okrajoch: naznačuje, že sa dá scrollovať ďalej. */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r
            from-ground to-transparent transition-opacity duration-300 sm:w-16
            ${atStart ? "opacity-0" : "opacity-100"}`}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l
            from-ground to-transparent transition-opacity duration-300 sm:w-16
            ${atEnd ? "opacity-0" : "opacity-100"}`}
        />

        <ul
          ref={railRef}
          className="scroll-rail flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 sm:px-8"
        >
          {equipment.map((category) => (
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
