import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReferencesArchive } from "@/components/ReferencesArchive";
import { PhotoGallery } from "@/components/PhotoGallery";
import { BookCta, ContactCta } from "@/components/cta";
import { references } from "@/content/references";
import { site } from "@/content/site";
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
    title: d.references.pageTitle,
    description: d.references.pageLead,
    alternates: {
      canonical: `/${lang}/referencie`,
      languages: {
        sk: "/sk/referencie",
        en: "/en/referencie",
        "x-default": "/sk/referencie",
      },
    },
  };
}

export default async function ReferencesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const d = getDictionary(locale);

  // ItemList, nie Event: schema.org Event je určený pre nadchádzajúce
  // podujatia, toto je archív už zrealizovaných akcií.
  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: d.references.pageTitle,
    numberOfItems: references.length,
    itemListElement: references.map((reference, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: pick(reference.title, locale),
      description: pick(reference.description, locale),
    })),
  };

  return (
    <>
      <header className="pb-14 pt-32 sm:pt-36">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <h1 className="max-w-[12ch] font-display text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-[0.98]">
            {d.references.pageTitle}
          </h1>
          <p className="mt-6 max-w-[62ch] text-[1.02rem] leading-relaxed text-muted">
            {d.references.pageLead}
          </p>
          <p className="mt-4 max-w-[62ch] text-[0.92rem] leading-relaxed text-muted-2">
            {site.serviceArea.join(" · ")}
          </p>
        </div>
      </header>

      <ReferencesArchive locale={locale} />

      <div className="mt-20">
        <PhotoGallery locale={locale} title={d.references.gallery} />
      </div>

      <section className="border-t border-line py-20 sm:py-24">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-8 gap-y-5 px-5 sm:px-8">
          <BookCta href={`/${locale}#kontakt`}>{d.nav.reserve}</BookCta>
          <ContactCta href={`/${locale}#kontakt`}>{d.equipment.askCta}</ContactCta>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }}
      />
    </>
  );
}
