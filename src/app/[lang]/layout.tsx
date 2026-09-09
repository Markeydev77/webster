import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Outfit, Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import "../globals.css";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { reviewsVisible } from "@/components/sections/Reviews";
import { site, missingSiteData } from "@/content/site";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";

// Vlastné hostovanie fontov cez next/font: žiadna požiadavka na Google CDN
// v prehliadači návštevníka, takže nevzniká prenos IP adresy tretej strane.
// Podmnožina latin-ext je nutná pre slovenskú diakritiku (ľ, ď, ť, ĺ, ŕ, ô).
const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

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

  const title =
    lang === "sk"
      ? `${site.name} | Ozvučenie, osvetlenie a pódiá pre podujatia`
      : `${site.name} | Sound, lighting and stages for events`;

  const description =
    lang === "sk"
      ? "Technické zabezpečenie podujatí na Orave a po celom Slovensku. Ozvučenie, osvetlenie, pódiá, hliníkové strechy a LED obrazovky pre obecné dni, festivaly, plesy aj konferencie."
      : "Technical production for events in the Orava region and across Slovakia. Sound, lighting, stages, aluminium roofs and LED screens for village days, festivals, balls and conferences.";

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${site.name}` },
    description,
    applicationName: site.name,
    alternates: {
      canonical: `/${lang}`,
      languages: { sk: "/sk", en: "/en", "x-default": "/sk" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: lang === "sk" ? "sk_SK" : "en_GB",
      url: `${site.url}/${lang}`,
      title,
      description,
      images: [
        {
          url: `/og/og-${lang}.png`,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: d.hero.headline,
        },
      ],
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
    icons: {
      icon: [
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/site.webmanifest",
  };
}

export const viewport = {
  themeColor: "#0b0d10",
  width: "device-width",
  initialScale: 1,
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const d = getDictionary(locale);

  if (process.env.NODE_ENV !== "production") {
    const missing = missingSiteData();
    if (missing.length > 0) {
      console.warn(
        `[Webster] Chýbajúce firemné údaje v src/content/site.ts: ${missing.join(", ")}`,
      );
    }
  }

  // Štruktúrované dáta obsahujú iba polia, ktoré sú reálne vyplnené.
  const businessLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: `${site.url}/${locale}`,
    image: `${site.url}/photos/hero-koncert-1600.webp`,
    logo: `${site.url}/photos/logo-640.png`,
    slogan: d.hero.headline,
    areaServed: site.serviceArea.map((name) => ({ type: "Place", name })),
  };
  if (site.contact.phone) businessLd.telephone = site.contact.phone;
  if (site.contact.email) businessLd.email = site.contact.email;
  if (site.contact.city || site.contact.street) {
    businessLd.address = {
      "@type": "PostalAddress",
      ...(site.contact.street ? { streetAddress: site.contact.street } : {}),
      ...(site.contact.city ? { addressLocality: site.contact.city } : {}),
      addressCountry: "SK",
    };
  }
  const social = Object.values(site.social).filter(Boolean);
  if (social.length > 0) businessLd.sameAs = social;

  return (
    <html
      lang={locale}
      className={`${outfit.variable} ${interTight.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SiteHeader
          locale={locale}
          nav={d.nav}
          langLabel={d.common.langLabel}
          showReviews={reviewsVisible}
        />
        <main id="obsah">{children}</main>
        <SiteFooter locale={locale} />
        <script
          type="application/ld+json"
          // Obsah je zostavený na serveri z vlastných dát, nie zo vstupu používateľa.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessLd) }}
        />
      </body>
    </html>
  );
}
