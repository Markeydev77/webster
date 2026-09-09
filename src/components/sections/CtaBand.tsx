import { Photo } from "@/components/Photo";
import { getDictionary, type Locale } from "@/lib/i18n";

/**
 * Celoplošný pás pred kontaktom.
 *
 * Nahradil rozsiahly rezervačný formulár. Ten pýtal sedem údajov vrátane
 * dátumu, čo je pre niekoho, kto si firmu iba obzerá, priveľký záväzok.
 * Pás namiesto toho ponúkne jediný krok a formulár nechá až na kontakt,
 * takže na stránke zostane jeden jasný cieľ.
 */
export function CtaBand({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).cta;

  return (
    <section className="relative isolate overflow-hidden border-t border-line">
      <Photo
        slug="strecha-krajina"
        locale={locale}
        sizes="100vw"
        className="absolute inset-0 -z-20 block h-full w-full"
        imgClassName="object-[center_45%]"
        decorative
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ground via-ground/85 to-ground/45"
      />

      <div className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8 sm:py-36">
        <div className="max-w-2xl">
          <h2 className="max-w-[16ch] font-display text-[clamp(2rem,5vw,3.6rem)] font-bold leading-[1]">
            {t.headline}
          </h2>
          <p className="mt-6 max-w-[50ch] text-[1.02rem] leading-relaxed text-muted">{t.lead}</p>

          <a
            href="#kontakt"
            className="group relative mt-9 inline-flex items-center gap-3 overflow-hidden rounded-md
              bg-brand px-8 py-4 text-[1rem] font-semibold tracking-tight text-white
              shadow-[0_1px_0_0_rgba(255,255,255,0.28)_inset,0_10px_30px_-14px_rgba(32,128,208,0.95)]
              transition-[background-color,transform,box-shadow] duration-300 ease-[var(--ease-out-soft)]
              hover:-translate-y-px hover:bg-brand-lift"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-full h-full bg-white/18 blur-md
                transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:translate-y-[220%]"
            />
            <span className="relative">{t.button}</span>
            <span
              aria-hidden
              className="relative transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-y-1"
            >
              &darr;
            </span>
          </a>

          <p className="mt-5 text-[0.88rem] text-muted-2">{t.note}</p>
        </div>
      </div>
    </section>
  );
}
