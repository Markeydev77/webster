import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { cookiePolicy } from "@/content/legal";
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
    title: getDictionary(lang).legal.cookiesTitle,
    description: pick(cookiePolicy.lead, lang),
    robots: { index: true, follow: true },
    alternates: {
      canonical: `/${lang}/cookies`,
      languages: {
        sk: "/sk/cookies",
        en: "/en/cookies",
        "x-default": "/sk/cookies",
      },
    },
  };
}

export default async function CookiesPage({
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
      title={getDictionary(locale).legal.cookiesTitle}
      document={cookiePolicy}
    />
  );
}
