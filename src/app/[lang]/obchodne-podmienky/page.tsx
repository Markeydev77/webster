import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { termsAndConditions } from "@/content/legal";
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
  return {
    title: getDictionary(lang).legal.termsTitle,
    description: pick(termsAndConditions.lead, lang),
    robots: { index: true, follow: true },
    alternates: {
      canonical: `/${lang}/obchodne-podmienky`,
      languages: {
        sk: "/sk/obchodne-podmienky",
        en: "/en/obchodne-podmienky",
        "x-default": "/sk/obchodne-podmienky",
      },
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;

  return (
    <LegalPage
      locale={locale}
      title={getDictionary(locale).legal.termsTitle}
      document={termsAndConditions}
    />
  );
}
