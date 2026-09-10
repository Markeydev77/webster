import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Bez tohto si Next zvolí ako koreň priečinok, v ktorom našiel iný lockfile,
  // a build server potom zbalí nesprávnu množinu súborov. Zámerne process.cwd()
  // a nie import.meta.dirname: konfigurácia sa podľa prostredia kompiluje aj do
  // CommonJS, kde import.meta neexistuje.
  outputFileTracingRoot: process.cwd(),
  images: {
    // Fotografie sú predspracované do AVIF/WebP skriptom `npm run images`,
    // takže runtime optimalizátor nepotrebujeme a web zostáva prenosný
    // na akýkoľvek hosting, nielen na Vercel.
    unoptimized: true,
  },
  async headers() {
    // Content-Security-Policy.
    //
    // Web je statický, bez cudzieho JavaScriptu, bez obsahu od návštevníkov
    // a bez analytiky. 'unsafe-inline' pri script-src je tu vedomý ústupok:
    // Next.js potrebuje malý inline bootstrap skript na hydratáciu a prísna
    // nonce politika by vynútila dynamické renderovanie každej stránky, čím
    // by web prišiel o statické generovanie. Pri tomto profile hrozieb je to
    // prijateľné. Skutočnú hodnotu tu nesú ostatné direktívy: zákaz vloženia
    // do cudzieho rámu, zákaz pluginov, obmedzenie cieľov spojení a formulárov.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/photos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
