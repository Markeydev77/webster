import Link from "next/link";
import { defaultLocale, getDictionary } from "@/lib/i18n";

// V not-found.tsx nie sú dostupné `params`, takže jazyk adresy nevieme zistiť.
// Zobrazujeme preto predvolený jazyk webu a odkaz vedie na slovenský úvod.
export default function NotFound() {
  const d = getDictionary(defaultLocale).common;

  return (
    <section className="flex min-h-[60dvh] items-center justify-center px-5 py-24 sm:px-8">
      <div className="max-w-[46ch] text-center">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-brand-lift">
          404
        </p>

        <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-[0.98]">
          {d.notFound}
        </h1>

        <p className="mt-6 text-[1.02rem] leading-relaxed text-muted">{d.notFoundBody}</p>

        <Link
          href={`/${defaultLocale}`}
          className="mt-10 inline-flex items-center justify-center rounded-md bg-brand px-7 py-3.5
            text-[0.98rem] font-semibold tracking-tight text-white transition-colors duration-300
            hover:bg-brand-lift"
        >
          {d.backHome}
        </Link>
      </div>
    </section>
  );
}
