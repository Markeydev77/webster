import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Každé CTA má vlastnú interakčnú identitu. Zámerne tu nie je žiadna zdieľaná
 * trieda .btn: tri rôzne zámery majú vyzerať a správať sa odlišne, aby bolo
 * na prvý pohľad jasné, ktoré je hlavné.
 */

type Common = { href: string; children: ReactNode; className?: string };

/** Hlavné CTA: plná značková plocha so svetlom v hornej hrane. */
export function BookCta({ href, children, className = "" }: Common) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-md
        bg-brand px-7 py-3.5 text-[0.95rem] font-semibold tracking-tight text-white
        shadow-[0_1px_0_0_rgba(255,255,255,0.28)_inset,0_8px_24px_-12px_rgba(32,128,208,0.9)]
        transition-[background-color,transform,box-shadow] duration-300 ease-[var(--ease-out-soft)]
        hover:-translate-y-px hover:bg-brand-lift
        hover:shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset,0_14px_32px_-12px_rgba(64,160,224,0.95)]
        active:translate-y-0 ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-full h-full bg-white/18 blur-md
          transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:translate-y-[220%]"
      />
      <span className="relative">{children}</span>
    </Link>
  );
}

/** Vedľajšie CTA: vlasová linka a značková podčiarka, ktorá dorastá zľava. */
export function EquipmentCta({ href, children, className = "" }: Common) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-2.5 rounded-md border border-line
        px-6 py-3.5 text-[0.95rem] font-medium tracking-tight text-text
        transition-colors duration-300 hover:border-brand-lift/60 hover:text-white ${className}`}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-0 bg-brand-lift
            transition-[width] duration-400 ease-[var(--ease-out-soft)] group-hover:w-full"
        />
      </span>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 text-muted transition-colors duration-300 group-hover:text-brand-lift"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

/** Terciárne CTA: čistý textový odkaz so šípkou, ktorá sa pri hoveri rozbehne. */
export function ContactCta({ href, children, className = "" }: Common) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-[0.95rem] font-medium text-brand-lift
        underline-offset-[6px] transition-colors duration-200 hover:text-white hover:underline ${className}`}
    >
      {children}
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 ease-[var(--ease-out-soft)]
          group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </Link>
  );
}
