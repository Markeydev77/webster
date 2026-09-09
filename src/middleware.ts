import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

const PUBLIC_FILE = /\.(?:png|jpg|jpeg|webp|avif|svg|ico|txt|xml|webmanifest|json)$/i;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/photos") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  // Slovenčina je predvolený jazyk, angličtinu ponúkame len ak si ju
  // návštevník výslovne vyžiada v hlavičke prehliadača.
  const accept = request.headers.get("accept-language") ?? "";
  const prefersEnglish = /^\s*en\b/i.test(accept) && !/\bsk\b/i.test(accept);
  const locale = prefersEnglish ? "en" : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
