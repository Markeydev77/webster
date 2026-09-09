"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { BookCta, EquipmentCta } from "./cta";
import type { Locale } from "@/lib/i18n";
import { getPhoto, srcSet, fallbackSrc, photoAlt } from "@/lib/photos";

type Props = {
  locale: Locale;
  headline: string;
  sub: string;
  primary: string;
  secondary: string;
};

const SLUG = "hero-koncert";

/**
 * Hero: „Rozsvietenie".
 *
 * Základ je reálna fotografia z koncertu, nie generovaná scéna. Scroll a pohyb
 * myši postupne zosilňujú svetlo a približujú kameru, takže návštevník
 * produkciu doslova zapne. Efekt je postavený na reálnej fotografii zámerne:
 * pri firme, ktorá technike rozumie, by vygenerované pódium s nemožným
 * riggingom podkopalo presne tú dôveru, na ktorej web stojí.
 *
 * Riadi sa iba transform a opacita smerom NAHOR: nič nikdy nečaká neviditeľné,
 * takže hero je kompletné aj bez JavaScriptu a pri prefers-reduced-motion.
 */
export function Hero({ locale, headline, sub, primary, secondary }: Props) {
  const root = useRef<HTMLElement>(null);
  const photo = getPhoto(SLUG);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let mx = 0;
    let my = 0;
    let progress = 0;

    const paint = () => {
      frame = 0;
      el.style.setProperty("--p", progress.toFixed(4));
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onScroll = () => {
      const h = el.offsetHeight || 1;
      progress = Math.min(1, Math.max(0, window.scrollY / h));
      schedule();
    };

    const fine = window.matchMedia("(pointer: fine)");
    const onMove = (e: PointerEvent) => {
      if (!fine.matches) return;
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
      schedule();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={root}
      className="hero relative isolate flex min-h-dvh flex-col justify-end overflow-hidden"
      style={{ "--p": 0, "--mx": 0, "--my": 0 } as CSSProperties}
    >
      {/* Vrstva 1: reálna fotografia */}
      <div className="hero-photo absolute inset-0 -z-30">
        {photo && (
          <picture>
            <source type="image/avif" srcSet={srcSet(photo, "avif")} sizes="100vw" />
            <source type="image/webp" srcSet={srcSet(photo, "webp")} sizes="100vw" />
            <img
              src={fallbackSrc(photo)}
              alt={photoAlt(photo, locale)}
              width={photo.width}
              height={photo.height}
              sizes="100vw"
              fetchPriority="high"
              decoding="sync"
              className="h-full w-full object-cover object-[62%_center] sm:object-center"
              style={{
                backgroundImage: `url(${photo.placeholder})`,
                backgroundSize: "cover",
              }}
            />
          </picture>
        )}
      </div>

      {/* Vrstva 2: svetelné lúče. Zosilňujú sa so scrollom, nikdy nezmiznú. */}
      <div className="hero-beams absolute inset-0 -z-20" aria-hidden />

      {/* Vrstva 3: značkové svetlo a čitateľnostný gradient */}
      <div className="hero-wash absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-ground via-ground/80 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-24 pt-28 sm:px-8 sm:pb-28">
        <div className="max-w-2xl">
          <h1 className="reveal font-display text-[clamp(2.6rem,7vw,5.2rem)] font-bold leading-[0.95] tracking-[-0.035em]">
            {headline}
          </h1>
          <p className="reveal reveal-delay-2 mt-6 max-w-[52ch] text-[1.02rem] leading-relaxed text-muted sm:text-[1.1rem]">
            {sub}
          </p>
          <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-3">
            <BookCta href={`/${locale}#rezervacia`}>{primary}</BookCta>
            <EquipmentCta href={`/${locale}/technika`}>{secondary}</EquipmentCta>
          </div>
        </div>
      </div>

      <style>{`
        .hero-photo img {
          transform:
            scale(calc(1.04 + var(--p) * 0.07))
            translate3d(calc(var(--mx) * -8px), calc(var(--my) * -6px + var(--p) * 26px), 0);
          transition: transform 620ms var(--ease-out-soft);
          will-change: transform;
        }

        /* Lúče vychádzajú z miesta, kde sú na fotografii reálne svetlá. */
        .hero-beams {
          background:
            conic-gradient(from 196deg at 50% 34%,
              transparent 0deg,
              color-mix(in oklab, var(--color-brand-lift) 26%, transparent) 3deg,
              transparent 7deg,
              transparent 20deg,
              color-mix(in oklab, #ffffff 20%, transparent) 23deg,
              transparent 27deg),
            conic-gradient(from 322deg at 50% 34%,
              transparent 0deg,
              color-mix(in oklab, var(--color-brand) 24%, transparent) 4deg,
              transparent 9deg,
              transparent 24deg,
              color-mix(in oklab, #ffffff 16%, transparent) 27deg,
              transparent 31deg);
          mix-blend-mode: screen;
          opacity: calc(0.34 + var(--p) * 0.62);
          transform:
            translate3d(calc(var(--mx) * 14px), calc(var(--my) * 8px), 0)
            scale(calc(1 + var(--p) * 0.1));
          transition: opacity 620ms var(--ease-out-soft), transform 620ms var(--ease-out-soft);
          will-change: opacity, transform;
        }

        .hero-wash {
          background:
            radial-gradient(70% 52% at 50% 30%,
              color-mix(in oklab, var(--color-brand) 20%, transparent) 0%,
              transparent 68%),
            linear-gradient(to bottom,
              color-mix(in oklab, var(--color-ground) 72%, transparent) 0%,
              transparent 42%);
          opacity: calc(0.72 + var(--p) * 0.28);
          transition: opacity 620ms var(--ease-out-soft);
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-photo img,
          .hero-beams,
          .hero-wash {
            transform: none !important;
            transition: none !important;
          }
          .hero-beams { opacity: 0.5 !important; }
        }
      `}</style>
    </section>
  );
}
