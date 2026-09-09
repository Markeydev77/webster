import reviewsData from "@/content/reviews.json";
import type { Locale } from "@/lib/i18n";

export type Review = {
  id: string;
  author: string;
  org?: string;
  text: string;
  rating: number;
  source?: string;
  date?: string;
};

const data = reviewsData as unknown as {
  minimumToDisplay: number;
  items: Review[];
};

/**
 * Sekcia sa vykreslí až pri dosiahnutí minimálneho počtu reálnych recenzií.
 * Jedna osamotená recenzia pôsobí horšie než žiadna, a vymyslené recenzie
 * sú neprípustné.
 */
export const reviewsVisible = data.items.length >= data.minimumToDisplay;

type Props = { locale: Locale; headline: string };

export function Reviews({ headline }: Props) {
  if (!reviewsVisible) return null;

  return (
    <section id="recenzie" className="scroll-mt-20 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <h2 className="max-w-[16ch] font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1]">
          {headline}
        </h2>

        <ul className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {data.items.map((review) => (
            <li key={review.id} className="border-t border-line pt-7">
              <p
                className="font-mono text-[0.8rem] tracking-[0.2em] text-brand-lift"
                aria-label={`${review.rating}/5`}
              >
                {"★".repeat(Math.round(review.rating))}
              </p>
              <blockquote className="mt-5 font-display text-[1.25rem] font-medium leading-snug tracking-tight">
                {review.text}
              </blockquote>
              <p className="mt-5 text-[0.88rem] text-muted">
                {review.author}
                {review.org ? `, ${review.org}` : ""}
              </p>
              {review.source && (
                <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-2">
                  {review.source}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
