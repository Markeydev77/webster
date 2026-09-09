import { Photo } from "@/components/Photo";
import { deliveredLabels, type EventReference } from "@/content/references";
import { pick, type Locale } from "@/lib/i18n";

type Props = {
  reference: EventReference;
  locale: Locale;
  deliveredLabel: string;
  sizes: string;
  /** Väčšie karty dostanú výraznejšiu typografiu. */
  emphasis?: boolean;
};

/**
 * Karta referencie.
 *
 * Referencie bez použiteľného originálu fotografie dostanú zámernú typografickú
 * úpravu namiesto ilustračnej fotky z inej akcie. Cudzia fotka pod cudzím
 * názvom by bola zavádzajúca, aj keby bola z rovnakej kategórie.
 */
export function ReferenceCard({
  reference,
  locale,
  deliveredLabel,
  sizes,
  emphasis = false,
}: Props) {
  const tags = reference.delivered.map((k) => pick(deliveredLabels[k], locale));

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-line transition-colors duration-300 hover:border-brand-lift/45">
      {reference.photo ? (
        <div className="overflow-hidden">
          <Photo
            slug={reference.photo}
            locale={locale}
            sizes={sizes}
            className={`block w-full transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.045] ${
              emphasis ? "aspect-[16/10]" : "aspect-[4/3]"
            }`}
          />
        </div>
      ) : (
        <div
          className={`relative flex items-end overflow-hidden bg-surface p-6 ${
            emphasis ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          <div
            aria-hidden
            className="brand-glow pointer-events-none absolute -left-1/4 -top-1/2 h-[180%] w-[150%] opacity-[0.13]"
          />
          <span
            aria-hidden
            className="absolute left-6 top-6 h-px w-12 bg-brand-lift"
          />
          <p className="relative font-display text-[1.35rem] font-semibold leading-tight tracking-tight text-muted">
            {pick(reference.title, locale)}
          </p>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline gap-3">
          <h3
            className={`font-display font-semibold leading-tight tracking-tight ${
              emphasis ? "text-[1.5rem]" : "text-[1.2rem]"
            }`}
          >
            {pick(reference.title, locale)}
          </h3>
          {reference.date && (
            <span className="ml-auto shrink-0 font-mono text-[0.72rem] tracking-wider text-muted-2">
              {reference.date}
            </span>
          )}
        </div>

        <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">
          {pick(reference.description, locale)}
        </p>

        <div className="mt-5 pt-4">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted-2">
            {deliveredLabel}
          </p>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-sm border border-line bg-surface px-2.5 py-1 text-[0.74rem] text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
