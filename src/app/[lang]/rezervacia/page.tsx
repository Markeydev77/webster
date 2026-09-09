import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { Reservation } from "@/components/sections/Reservation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";

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
    title: d.reservation.headline,
    description: d.reservation.lead,
    alternates: {
      canonical: `/${lang}/rezervacia`,
      languages: {
        sk: "/sk/rezervacia",
        en: "/en/rezervacia",
        "x-default": "/sk/rezervacia",
      },
    },
  };
}

export default async function ReservationPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;

  // Na samostatnej stránke je nadpis rezervácie priamo h1, takže tu nie je
  // druhá hlavička ani odsadenie navyše. Vlastné odsadenie sekcie už drží
  // obsah pod fixnou hlavičkou webu.
  return (
    <Suspense fallback={null}>
      <Reservation locale={locale} headingLevel={1} />
    </Suspense>
  );
}
