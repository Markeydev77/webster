import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { equipment } from "@/content/equipment";
import { Photo } from "@/components/Photo";
import { BookCta, ContactCta } from "@/components/cta";
import { getDictionary, isLocale, pick, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDictionary(lang);
  return {
    title: d.equipment.pageTitle,
    description: d.equipment.pageLead,
    alternates: {
      canonical: `/${lang}/technika`,
      languages: { sk: "/sk/technika", en: "/en/technika", "x-default": "/sk/technika" },
    },
  };
}

export default async function EquipmentPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const d = getDictionary(locale);

  return (
    <>
      <header className="border-b border-line pb-16 pt-32 sm:pt-36">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <h1 className="max-w-[12ch] font-display text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-[0.98]">
            {d.equipment.pageTitle}
          </h1>
          <p className="mt-6 max-w-[62ch] text-[1.02rem] leading-relaxed text-muted">
            {d.equipment.pageLead}
          </p>
          <nav className="mt-10 flex flex-wrap gap-2" aria-label={d.equipment.pageTitle}>
            {equipment.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="rounded-md border border-line px-4 py-2 text-[0.86rem] text-muted
                  transition-colors duration-200 hover:border-brand-lift/55 hover:text-text"
              >
                {pick(c.title, locale)}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {equipment.map((category, index) => (
          <section
            key={category.id}
            id={category.id}
            className={`scroll-mt-24 py-16 sm:py-20 ${index > 0 ? "border-t border-line" : ""}`}
          >
            <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                {category.photo && (
                  <div className="overflow-hidden rounded-md">
                    <Photo
                      slug={category.photo}
                      locale={locale}
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="block aspect-[4/3] w-full"
                    />
                  </div>
                )}
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : undefined}>
                <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-bold leading-tight tracking-tight">
                  {pick(category.title, locale)}
                </h2>
                <p className="mt-4 max-w-[54ch] text-[1rem] leading-relaxed text-muted">
                  {pick(category.intro, locale)}
                </p>

                {/* Minimalistický zoznam, nie mriežka produktových kariet. */}
                <ul className="mt-9 border-t border-line">
                  {category.items.map((item) => (
                    <li
                      key={item.name.sk}
                      className="grid gap-1 border-b border-line py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] sm:gap-8"
                    >
                      <h3 className="font-display text-[1.05rem] font-semibold tracking-tight">
                        {pick(item.name, locale)}
                      </h3>
                      <p className="text-[0.92rem] leading-relaxed text-muted">
                        {pick(item.note, locale)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="border-t border-line py-20 sm:py-24">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-8 gap-y-5 px-5 sm:px-8">
          <BookCta href={`/${locale}#kontakt`}>{d.nav.reserve}</BookCta>
          <ContactCta href={`/${locale}#kontakt`}>{d.equipment.askCta}</ContactCta>
        </div>
      </section>
    </>
  );
}
