import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Bez tohto si Next zvolí ako koreň priečinok, v ktorom našiel iný lockfile,
  // a build server potom zbalí nesprávnu množinu súborov.
  outputFileTracingRoot: path.join(import.meta.dirname, "."),
  images: {
    // Fotografie sú predspracované do AVIF/WebP skriptom `npm run images`,
    // takže runtime optimalizátor nepotrebujeme a web zostáva prenosný
    // na akýkoľvek hosting, nielen na Vercel.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/photos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
