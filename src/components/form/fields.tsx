"use client";

import type { ReactNode } from "react";

const control =
  "w-full rounded-md border border-line bg-ground-2 px-4 py-3 text-[0.98rem] text-text " +
  "placeholder:text-muted-2 transition-colors duration-200 " +
  "hover:border-line focus:border-brand-lift focus:outline-none " +
  "aria-[invalid=true]:border-red-500/70";

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  requiredLabel: string;
  optionalLabel: string;
  children: (props: {
    id: string;
    className: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
  }) => ReactNode;
};

export function Field({
  id,
  label,
  hint,
  error,
  required = false,
  requiredLabel,
  optionalLabel,
  children,
}: FieldProps) {
  const describedBy =
    [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-baseline justify-between gap-3 pb-2 text-[0.88rem] font-medium"
      >
        <span>{label}</span>
        <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted-2">
          {required ? requiredLabel : optionalLabel}
        </span>
      </label>

      {children({
        id,
        className: control,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
      })}

      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-[0.8rem] text-muted-2">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[0.82rem] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

type ConsentProps = {
  id: string;
  label: string;
  error?: string;
  /** Odkaz na zásady spracovania údajov. Vynechá sa, kým stránka neexistuje. */
  linkLabel?: string;
  href?: string;
};

export function ConsentCheckbox({ id, label, linkLabel, href, error }: ConsentProps) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={id}
          name="consent"
          required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-4.5 w-4.5 shrink-0 cursor-pointer accent-[var(--color-brand)]"
        />
        <label htmlFor={id} className="text-[0.86rem] leading-relaxed text-muted">
          {label}
          {href && linkLabel ? (
            <>
              {" "}
              <a
                href={href}
                className="text-brand-lift underline underline-offset-4 hover:text-white"
              >
                {linkLabel}
              </a>
            </>
          ) : null}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[0.82rem] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

/** Skryté pole, ktoré vypĺňajú iba roboty. Nie je to captcha, nič nesleduje. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
