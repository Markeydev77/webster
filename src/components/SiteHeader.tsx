"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";

type Nav = {
  services: string;
  equipment: string;
  references: string;
  reviews: string;
  contact: string;
  reserve: string;
  menu: string;
  close: string;
  skip: string;
};

type Props = {
  locale: Locale;
  nav: Nav;
  langLabel: string;
  showReviews: boolean;
};

export function SiteHeader({ locale, nav, langLabel, showReviews }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const home = `/${locale}`;
  const links = [
    { href: `${home}#sluzby`, label: nav.services },
    { href: `${home}/technika`, label: nav.equipment },
    { href: `${home}/referencie`, label: nav.references },
    ...(showReviews ? [{ href: `${home}#recenzie`, label: nav.reviews }] : []),
    { href: `${home}#kontakt`, label: nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /** Prepnutie jazyka zachová aktuálnu stránku. */
  const swapLocale = (target: Locale) => {
    const rest = pathname.replace(/^\/(sk|en)/, "");
    return `/${target}${rest}`;
  };

  return (
    <>
      <a
        href="#obsah"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]
          focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        {nav.skip}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter]
          duration-500 ease-[var(--ease-out-soft)] ${
            scrolled || open
              ? "border-b border-line/80 bg-ground/85 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
      >
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center gap-6 px-5 sm:px-8">
          <Link
            href={home}
            className="shrink-0 transition-opacity duration-200 hover:opacity-80"
            aria-label="Webster Sound &amp; Light"
          >
            <picture>
              <source type="image/webp" srcSet="/photos/logo-320.webp 320w, /photos/logo-640.webp 640w" />
              <img
                src="/photos/logo-320.png"
                alt="Webster Sound &amp; Light"
                width={320}
                height={101}
                className="h-7 w-auto sm:h-8"
              />
            </picture>
          </Link>

          <nav
            className="ml-auto hidden items-center gap-7 lg:flex"
            aria-label={nav.menu}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative py-1 text-[0.9rem] font-medium text-muted
                  transition-colors duration-200 hover:text-text"
              >
                {l.label}
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-lift
                    transition-[width] duration-300 ease-[var(--ease-out-soft)] group-hover:w-full"
                />
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <div
              className="flex items-center rounded-md border border-line/80 p-0.5"
              role="group"
              aria-label={langLabel}
            >
              {locales.map((l) => (
                <Link
                  key={l}
                  href={swapLocale(l)}
                  hrefLang={l}
                  aria-current={l === locale ? "true" : undefined}
                  className={`rounded-sm px-2 py-1 font-mono text-[0.68rem] uppercase tracking-widest
                    transition-colors duration-200 ${
                      l === locale
                        ? "bg-surface-2 text-text"
                        : "text-muted-2 hover:text-text"
                    }`}
                >
                  {l}
                </Link>
              ))}
            </div>

            <Link
              href={`${home}#rezervacia`}
              className="hidden shrink-0 rounded-md bg-brand px-5 py-2.5 text-[0.87rem] font-semibold
                tracking-tight text-white shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset]
                transition-colors duration-300 hover:bg-brand-lift sm:inline-flex"
            >
              {nav.reserve}
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobilne-menu"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-line/80
                text-text transition-colors duration-200 hover:border-brand-lift/60 lg:hidden"
            >
              <span className="sr-only">{open ? nav.close : nav.menu}</span>
              <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                {open ? (
                  <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
                ) : (
                  <path d="M2.5 6h15M2.5 14h15" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobilné menu: fullscreen, veľké dotykové ciele */}
      <div
        id="mobilne-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-0 z-40 flex flex-col bg-ground/98 pt-[68px] backdrop-blur-xl lg:hidden"
      >
        <nav className="flex flex-col px-5 pt-6 sm:px-8" aria-label={nav.menu}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="border-b border-line/60 py-5 font-display text-3xl font-semibold
                tracking-tight text-text transition-colors duration-200 hover:text-brand-lift"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-5 pb-10 pt-8 sm:px-8">
          <Link
            href={`${home}#rezervacia`}
            className="flex items-center justify-center rounded-md bg-brand px-6 py-4
              text-base font-semibold text-white"
          >
            {nav.reserve}
          </Link>
        </div>
      </div>

      {/* Trvalé CTA na mobile: najúčinnejší prvok na malom displeji */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-line/80 bg-ground/92 p-3
          backdrop-blur-xl transition-transform duration-500 ease-[var(--ease-out-soft)] sm:hidden
          ${scrolled && !open ? "translate-y-0" : "translate-y-full"}`}
      >
        <Link
          href={`${home}#rezervacia`}
          tabIndex={scrolled && !open ? undefined : -1}
          aria-hidden={scrolled && !open ? undefined : true}
          className="flex items-center justify-center rounded-md bg-brand px-6 py-3.5
            text-[0.95rem] font-semibold text-white"
        >
          {nav.reserve}
        </Link>
      </div>
    </>
  );
}
