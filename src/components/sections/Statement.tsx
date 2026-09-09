type Props = { lines: readonly string[]; caption: string };

/**
 * Jediný veľký typografický statement na celom webe. Zámerne sa neopakuje:
 * použitý raz má váhu, použitý trikrát je manier.
 */
export function Statement({ lines, caption }: Props) {
  return (
    <section className="relative overflow-hidden border-y border-line bg-ground-2 py-24 sm:py-32">
      <div
        aria-hidden
        className="brand-drift brand-glow pointer-events-none absolute -inset-x-1/4 top-1/2 h-[130%] -translate-y-1/2 opacity-[0.16]"
      />
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <p className="font-display text-[clamp(2.8rem,11vw,9rem)] font-bold leading-[0.86] tracking-[-0.045em]">
          {lines.map((line, i) => (
            <span key={line} className="block">
              <span className={i === lines.length - 1 ? "text-brand-lift" : undefined}>
                {line}
              </span>
            </span>
          ))}
        </p>
        <p className="mt-10 max-w-[46ch] text-[1.02rem] leading-relaxed text-muted">{caption}</p>
      </div>
    </section>
  );
}
