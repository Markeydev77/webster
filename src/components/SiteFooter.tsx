import Link from "next/link";
import { site, socialLinks } from "@/content/site";
import { getDictionary, type Locale } from "@/lib/i18n";

const socialNames: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
};

export function SiteFooter({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const home = `/${locale}`;
  const year = new Date().getFullYear();

  const hasContactColumn =
    Boolean(site.contact.phone) ||
    Boolean(site.contact.email) ||
    Boolean(site.contact.city) ||
    socialLinks.length > 0;

  const legalLinks = [
    { href: `${home}/ochrana-osobnych-udajov`, label: d.footer.privacy },
    { href: `${home}/obchodne-podmienky`, label: d.footer.terms },
    { href: `${home}/cookies`, label: d.footer.cookies },
  ];

  return (
    <footer className="border-t border-line bg-ground-2">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <picture>
              <source
                type="image/webp"
                srcSet="/photos/logo-320.webp 320w, /photos/logo-640.webp 640w"
              />
              <img
                src="/photos/logo-320.png"
                alt={site.name}
                width={320}
                height={101}
                loading="lazy"
                className="h-8 w-auto"
              />
            </picture>
            <p className="mt-5 max-w-[38ch] text-[0.95rem] leading-relaxed text-muted">
              {d.hero.sub}
            </p>
          </div>

          {/* Kým nie sú doplnené kontaktné údaje, stĺpec sa nevykreslí vôbec.
              Osamotený nadpis nad prázdnym zoznamom pôsobí ako chyba webu. */}
          <div hidden={!hasContactColumn}>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-2">
              {d.nav.contact}
            </p>
            <ul className="mt-4 space-y-2 text-[0.92rem] text-muted">
              {site.contact.phone && (
                <li>
                  <a
                    href={`tel:${site.contact.phone}`}
                    className="transition-colors duration-200 hover:text-text"
                  >
                    {site.contact.phoneDisplay ?? site.contact.phone}
                  </a>
                </li>
              )}
              {site.contact.email && (
                <li>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="break-all transition-colors duration-200 hover:text-text"
                  >
                    {site.contact.email}
                  </a>
                </li>
              )}
              {site.contact.city && <li>{site.contact.city}</li>}
            </ul>

            {socialLinks.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[0.92rem]">
                {socialLinks.map((s) => (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="text-muted transition-colors duration-200 hover:text-text"
                    >
                      {socialNames[s.key] ?? s.key}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-2">
              {d.footer.legal}
            </p>
            <ul className="mt-4 space-y-2 text-[0.92rem]">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-muted transition-colors duration-200 hover:text-text"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.84rem] text-muted-2">
            &copy; {year} {site.legal.entity ?? site.name}. {d.footer.rights}
          </p>
          <p className="text-[0.84rem] text-muted-2">{d.footer.madeNote}</p>
        </div>
      </div>
    </footer>
  );
}
