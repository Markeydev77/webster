import Link from "next/link";
import { site } from "@/content/site";
import {
  LEGAL_UPDATED,
  legalIdentityLabels,
  legalReviewNote,
  type Bilingual,
  type LegalDocument,
} from "@/content/legal";
import { getDictionary, pick, type Locale } from "@/lib/i18n";

type IdentityRow = { key: string; label: Bilingual; value: string; href?: string };

/**
 * Identifikačné údaje prevádzkovateľa sa skladajú výhradne z toho, čo je
 * vyplnené v site.ts. Chýbajúce polia sa nevypisujú a nič sa nenahrádza
 * zástupným textom.
 */
function identityRows(): IdentityRow[] {
  const rows: IdentityRow[] = [];
  const { entity, ico, dic, icDph, registration } = site.legal;
  const { street, city, country, email, phone, phoneDisplay } = site.contact;

  if (entity) rows.push({ key: "entity", label: legalIdentityLabels.entity, value: entity });
  if (ico) rows.push({ key: "ico", label: legalIdentityLabels.ico, value: ico });
  if (dic) rows.push({ key: "dic", label: legalIdentityLabels.dic, value: dic });
  if (icDph) rows.push({ key: "icDph", label: legalIdentityLabels.icDph, value: icDph });
  if (registration)
    rows.push({
      key: "registration",
      label: legalIdentityLabels.registration,
      value: registration,
    });

  const address = [street, city, country].filter(Boolean).join(", ");
  if (street || city)
    rows.push({ key: "address", label: legalIdentityLabels.address, value: address });

  if (email)
    rows.push({
      key: "email",
      label: legalIdentityLabels.email,
      value: email,
      href: `mailto:${email}`,
    });
  if (phone)
    rows.push({
      key: "phone",
      label: legalIdentityLabels.phone,
      value: phoneDisplay ?? phone,
      href: `tel:${phone}`,
    });

  return rows;
}

type Props = {
  locale: Locale;
  title: string;
  document: LegalDocument;
};

/** Spoločné telo všetkých troch právnych stránok. */
export function LegalPage({ locale, title, document: doc }: Props) {
  const d = getDictionary(locale);
  const hasIdentity = Boolean(site.legal.entity) && Boolean(site.legal.ico);
  const rows = identityRows();

  const siblings = (
    [
      { id: "privacy", href: `/${locale}/ochrana-osobnych-udajov`, label: d.footer.privacy },
      { id: "terms", href: `/${locale}/obchodne-podmienky`, label: d.footer.terms },
      { id: "cookies", href: `/${locale}/cookies`, label: d.footer.cookies },
    ] as const
  ).filter((item) => item.id !== doc.id);

  return (
    <>
      <header className="border-b border-line pb-14 pt-32 sm:pt-36">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <h1 className="max-w-[16ch] font-display text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-[0.98]">
            {title}
          </h1>
          <p className="mt-6 max-w-[68ch] text-[1.02rem] leading-relaxed text-muted">
            {pick(doc.lead, locale)}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="max-w-[68ch]">
          {hasIdentity ? (
            <dl className="grid gap-x-8 gap-y-3 rounded-md border border-line bg-surface p-6 sm:grid-cols-[auto_minmax(0,1fr)]">
              {rows.map((row) => (
                <div key={row.key} className="contents">
                  <dt className="font-mono text-[0.74rem] uppercase tracking-[0.12em] text-muted-2">
                    {pick(row.label, locale)}
                  </dt>
                  <dd className="text-[0.95rem] leading-relaxed">
                    {row.href ? (
                      <a
                        href={row.href}
                        className="text-brand-lift underline-offset-4 hover:underline"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span className="text-muted">{row.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="rounded-md border border-brand/45 bg-brand-ink p-6">
              <p className="text-[0.95rem] leading-relaxed text-muted">{d.legal.incomplete}</p>
            </div>
          )}

          {doc.sections.map((section) => (
            <section key={section.heading.sk} className="mt-12">
              <h2 className="font-display text-[clamp(1.35rem,2.6vw,1.9rem)] font-bold tracking-tight">
                {pick(section.heading, locale)}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-[0.98rem] leading-relaxed text-muted">
                    {pick(paragraph, locale)}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <div className="mt-16 border-t border-line pt-8">
            <p className="text-[0.9rem] leading-relaxed text-muted-2">
              {pick(legalReviewNote, locale)}
            </p>
            <nav
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.9rem]"
              aria-label={d.footer.legal}
            >
              {siblings.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-brand-lift underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <p className="mt-8 font-mono text-[0.78rem] uppercase tracking-[0.12em] text-muted-2">
              {d.legal.updated}: {LEGAL_UPDATED}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
