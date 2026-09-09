import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { privacyPolicy } from "@/content/legal";
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
    title: getDictionary(lang).legal.privacyTitle,
    description: pick(privacyPolicy.lead, lang),
    robots: { index: true, follow: true },
    alternates: {
      canonical: `/${lang}/ochrana-osobnych-udajov`,
      languages: {
        sk: "/sk/ochrana-osobnych-udajov",
        en: "/en/ochrana-osobnych-udajov",
        "x-default": "/sk/ochrana-osobnych-udajov",
      },
    },
  };
}

export default async function PrivacyPage({
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
      title={getDictionary(locale).legal.privacyTitle}
      document={privacyPolicy}
    />
  );
}
