"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { submitReservation } from "@/app/actions";
import { initialFormState } from "@/lib/form-state";
import { Field, ConsentCheckbox, Honeypot } from "@/components/form/fields";
import { eventTypes, OTHER_EVENT_TYPE } from "@/content/event-types";
import { Photo } from "@/components/Photo";
import { pick, getDictionary, type Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  /**
   * Na úvodnej stránke je rezervácia jednou zo sekcií (h2), na samostatnej
   * stránke je hlavným nadpisom (h1). Duplikovaný skrytý nadpis by čítačka
   * obrazovky prečítala dvakrát.
   */
  headingLevel?: 1 | 2;
};

export function Reservation({ locale, headingLevel = 2 }: Props) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  const t = getDictionary(locale).reservation;
  const params = useSearchParams();
  const preselected = params.get("typ") ?? "";

  const [state, action, pending] = useActionState(submitReservation, initialFormState);
  const [type, setType] = useState(
    eventTypes.some((e) => e.id === preselected) ? preselected : "",
  );
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eventTypes.some((e) => e.id === preselected)) setType(preselected);
  }, [preselected]);

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state.status]);

  const err = state.errors ?? {};
  const val = state.values ?? {};

  // Stránka je predgenerovaná pri builde, takže dnešný dátum sa nesmie
  // vykresliť na serveri: nasledujúci deň by už bol nesprávny a React by
  // hlásil nesúlad pri hydratácii. Doplní ho až prehliadač.
  const [minDate, setMinDate] = useState<string | undefined>(undefined);
  useEffect(() => {
    setMinDate(new Date().toISOString().slice(0, 10));
  }, []);

  return (
    <section id="rezervacia" className="scroll-mt-20 border-t border-line bg-ground-2">
      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="px-5 py-24 sm:px-8 sm:py-28">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-brand-lift">
            {t.eyebrow}
          </p>
          <Heading className="mt-5 max-w-[14ch] font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1]">
            {t.headline}
          </Heading>
          <p className="mt-5 max-w-[52ch] text-[1.02rem] leading-relaxed text-muted">{t.lead}</p>

          <div
            ref={statusRef}
            tabIndex={-1}
            aria-live="polite"
            className="mt-8 focus:outline-none"
          >
            {state.status === "success" && (
              <div className="rounded-md border border-brand/45 bg-brand-ink p-6">
                <p className="font-display text-[1.25rem] font-semibold tracking-tight text-brand-lift">
                  {t.successTitle}
                </p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{t.successBody}</p>
              </div>
            )}
            {state.status === "error" && err.form && (
              <div className="rounded-md border border-red-500/45 bg-red-950/25 p-6">
                <p className="font-display text-[1.1rem] font-semibold tracking-tight text-red-300">
                  {t.errorTitle}
                </p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{t.errorBody}</p>
              </div>
            )}
          </div>

          {state.status !== "success" && (
            <form action={action} noValidate className="relative mt-8 max-w-2xl space-y-6">
              <Honeypot />
              <input type="hidden" name="locale" value={locale} />

              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  id="rez-name"
                  label={t.name}
                  required
                  error={err.name}
                  requiredLabel={t.required}
                  optionalLabel={t.optional}
                >
                  {(p) => (
                    <input
                      {...p}
                      name="name"
                      type="text"
                      autoComplete="name"
                      defaultValue={val.name ?? ""}
                    />
                  )}
                </Field>

                <Field
                  id="rez-phone"
                  label={t.phone}
                  required
                  error={err.phone}
                  requiredLabel={t.required}
                  optionalLabel={t.optional}
                >
                  {(p) => (
                    <input
                      {...p}
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      defaultValue={val.phone ?? ""}
                    />
                  )}
                </Field>

                <Field
                  id="rez-email"
                  label={t.email}
                  required
                  error={err.email}
                  requiredLabel={t.required}
                  optionalLabel={t.optional}
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

                <Field
                  id="rez-date"
                  label={t.date}
                  required
                  error={err.date}
                  requiredLabel={t.required}
                  optionalLabel={t.optional}
                >
                  {(p) => (
                    <input
                      {...p}
                      name="date"
                      type="date"
                      min={minDate}
                      defaultValue={val.date ?? ""}
                    />
                  )}
                </Field>
              </div>

              <Field
                id="rez-type"
                label={t.type}
                required
                error={err.type}
                requiredLabel={t.required}
                optionalLabel={t.optional}
              >
                {(p) => (
                  <select
                    {...p}
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="" disabled>
                      {t.typePlaceholder}
                    </option>
                    {eventTypes.map((e) => (
                      <option key={e.id} value={e.id}>
                        {pick(e.label, locale)}
                      </option>
                    ))}
                  </select>
                )}
              </Field>

              {type === OTHER_EVENT_TYPE && (
                <Field
                  id="rez-type-other"
                  label={t.typeOther}
                  required
                  error={err.typeOther}
                  requiredLabel={t.required}
                  optionalLabel={t.optional}
                >
                  {(p) => (
                    <input
                      {...p}
                      name="typeOther"
                      type="text"
                      defaultValue={val.typeOther ?? ""}
                    />
                  )}
                </Field>
              )}

              <Field
                id="rez-message"
                label={t.message}
                hint={t.messagePlaceholder}
                error={err.message}
                requiredLabel={t.required}
                optionalLabel={t.optional}
              >
                {(p) => <textarea {...p} name="message" rows={5} defaultValue={val.message ?? ""} />}
              </Field>

              <ConsentCheckbox
                id="rez-consent"
                label={t.consent}
                error={err.consent}
              />

              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
                <button
                  type="submit"
                  disabled={pending}
                  className="group relative inline-flex items-center justify-center overflow-hidden
                    rounded-md bg-brand px-8 py-4 text-[0.98rem] font-semibold tracking-tight text-white
                    shadow-[0_1px_0_0_rgba(255,255,255,0.28)_inset] transition-colors duration-300
                    hover:bg-brand-lift disabled:cursor-wait disabled:opacity-70"
                >
                  {pending ? t.sending : t.submit}
                </button>
                <p className="text-[0.84rem] text-muted-2">{t.afterSubmit}</p>
              </div>
            </form>
          )}
        </div>

        <div className="relative hidden lg:block">
          <Photo
            slug="strecha-krajina"
            locale={locale}
            sizes="42vw"
            className="absolute inset-0 block h-full w-full"
            imgClassName="object-[center_45%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-ground-2 via-ground-2/45 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
