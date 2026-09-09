import { Suspense } from "react";
import { notFound } from "next/navigation";

import { Hero } from "@/components/Hero";
import { Services } from "@/components/sections/Services";
import { Statement } from "@/components/sections/Statement";
import { EquipmentPreview } from "@/components/sections/EquipmentPreview";
import { ReferencesPreview } from "@/components/sections/ReferencesPreview";
import { EventTypes } from "@/components/sections/EventTypes";
import { Reviews } from "@/components/sections/Reviews";
import { Reservation } from "@/components/sections/Reservation";
import { Contact } from "@/components/sections/Contact";

import { site, socialLinks } from "@/content/site";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

export default async function HomePage({
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
      <Hero
        locale={locale}
        headline={d.hero.headline}
        sub={d.hero.sub}
        primary={d.hero.primary}
        secondary={d.hero.secondary}
      />

      <Services
        locale={locale}
        eyebrow={d.services.eyebrow}
        headline={d.services.headline}
        lead={d.services.lead}
        evidenceLabel={d.services.evidenceLabel}
      />

      <Statement lines={d.statement.line} caption={d.statement.caption} />

      <EquipmentPreview
        locale={locale}
        headline={d.equipment.headline}
        lead={d.equipment.lead}
        cta={d.equipment.cta}
      />

      <ReferencesPreview
        locale={locale}
        eyebrow={d.references.eyebrow}
        headline={d.references.headline}
        lead={d.references.lead}
        cta={d.references.cta}
        deliveredLabel={d.references.deliveredLabel}
      />

      <EventTypes
        locale={locale}
        headline={d.eventTypes.headline}
        lead={d.eventTypes.lead}
        cta={d.eventTypes.cta}
        deliveredLabel={d.references.deliveredLabel}
      />

      <Reviews locale={locale} headline={d.reviews.headline} />

      <Suspense fallback={null}>
        <Reservation locale={locale} />
      </Suspense>

      <Contact
        locale={locale}
        details={{ ...site.contact }}
        social={socialLinks}
        serviceArea={site.serviceArea}
      />
    </>
  );
}
