"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContact } from "@/app/actions";
import { initialFormState } from "@/lib/form-state";
import { Field, ConsentCheckbox, Honeypot } from "@/components/form/fields";
import { getDictionary, type Locale } from "@/lib/i18n";

export type ContactDetails = {
  phone: string | null;
  phoneDisplay: string | null;
  email: string | null;
  street: string | null;
  city: string | null;
  country: string;
};

type Props = {
  locale: Locale;
  details: ContactDetails;
  social: { key: string; href: string }[];
  serviceArea: readonly string[];
};

const socialNames: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
};

export function Contact({ locale, details, social, serviceArea }: Props) {
  const d = getDictionary(locale);
  const t = d.contact;
  const r = d.reservation;

  const [state, action, pending] = useActionState(submitContact, initialFormState);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state.status]);

  const err = state.errors ?? {};
  const val = state.values ?? {};
  const hasAddress = Boolean(details.street || details.city);
  // Prázdny zoznam s rámčekom by sa vykreslil ako dve osamotené linky.
  const hasAnyDetail = Boolean(details.phone || details.email) || hasAddress;

  return (
    <section id="kontakt" className="scroll-mt-20 border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <h2 className="max-w-[16ch] font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1]">
          {t.headline}
        </h2>
        <p className="mt-5 max-w-[54ch] text-[1.02rem] leading-relaxed text-muted">{t.lead}</p>

        <div className="mt-14 grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="space-y-8">
            <dl className="divide-y divide-line border-y border-line" hidden={!hasAnyDetail}>
              {details.phone && (
                <div className="flex items-baseline gap-6 py-4">
                  <dt className="w-24 shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-2">
                    {t.phoneLabel}
                  </dt>
                  <dd>
                    <a
                      href={`tel:${details.phone}`}
                      className="font-display text-[1.2rem] font-semibold tracking-tight transition-colors duration-200 hover:text-brand-lift"
                    >
                      {details.phoneDisplay ?? details.phone}
                    </a>
                  </dd>
                </div>
              )}

              {details.email && (
                <div className="flex items-baseline gap-6 py-4">
                  <dt className="w-24 shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-2">
                    {t.emailLabel}
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${details.email}`}
                      className="break-all font-display text-[1.1rem] font-semibold tracking-tight transition-colors duration-200 hover:text-brand-lift"
                    >
                      {details.email}
                    </a>
                  </dd>
                </div>
              )}

              {hasAddress && (
                <div className="flex items-baseline gap-6 py-4">
                  <dt className="w-24 shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-2">
                    {t.addressLabel}
                  </dt>
                  <dd className="text-[0.98rem] leading-relaxed text-muted">
                    {details.street && <span className="block">{details.street}</span>}
                    {details.city && <span className="block">{details.city}</span>}
                    <span className="block">{details.country}</span>
                  </dd>
                </div>
              )}
            </dl>

            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-2">
                {t.areaLabel}
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                {serviceArea.join(" · ")}
              </p>
            </div>

            {social.length > 0 && (
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-2">
                  {t.socialLabel}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {social.map((s) => (
                    <li key={s.key}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="inline-flex rounded-md border border-line px-4 py-2 text-[0.88rem]
                          text-muted transition-colors duration-200 hover:border-brand-lift/55 hover:text-text"
                      >
                        {socialNames[s.key] ?? s.key}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <div ref={statusRef} tabIndex={-1} aria-live="polite" className="focus:outline-none">
              {state.status === "success" && (
                <div className="rounded-md border border-brand/45 bg-brand-ink p-6">
                  <p className="font-display text-[1.2rem] font-semibold tracking-tight text-brand-lift">
                    {r.successTitle}
                  </p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{r.successBody}</p>
                </div>
              )}
              {state.status === "error" && err.form && (
                <div className="mb-6 rounded-md border border-red-500/45 bg-red-950/25 p-6">
                  <p className="font-display text-[1.05rem] font-semibold tracking-tight text-red-300">
                    {r.errorTitle}
                  </p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{r.errorBody}</p>
                </div>
              )}
            </div>

            {state.status !== "success" && (
              <form action={action} noValidate className="relative space-y-6">
                <Honeypot />
                <input type="hidden" name="locale" value={locale} />

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    id="kon-name"
                    label={t.formName}
                    required
                    error={err.name}
                    requiredLabel={r.required}
                    optionalLabel={r.optional}
                  >
                    {(p) => (
                      <input {...p} name="name" type="text" autoComplete="name" defaultValue={val.name ?? ""} />
                    )}
                  </Field>

                  <Field
                    id="kon-email"
                    label={t.formEmail}
                    required
                    error={err.email}
                    requiredLabel={r.required}
                    optionalLabel={r.optional}
                  >
                    {(p) => (
                      <input
                        {...p}
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        defaultValue={val.email ?? ""}
                      />
                    )}
                  </Field>
                </div>

                <Field
                  id="kon-message"
                  label={t.formMessage}
                  required
                  error={err.message}
                  requiredLabel={r.required}
                  optionalLabel={r.optional}
                >
                  {(p) => <textarea {...p} name="message" rows={6} defaultValue={val.message ?? ""} />}
                </Field>

                <ConsentCheckbox
                  id="kon-consent"
                  label={r.consent}
                  error={err.consent}
                />

                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
                  <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex items-center justify-center rounded-md border border-brand/55
                      bg-brand-ink px-8 py-4 text-[0.98rem] font-semibold tracking-tight text-brand-lift
                      transition-colors duration-300 hover:bg-brand hover:text-white
                      disabled:cursor-wait disabled:opacity-70"
                  >
                    {pending ? r.sending : t.submit}
                  </button>
                  <p className="text-[0.84rem] text-muted-2">{r.afterSubmit}</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
