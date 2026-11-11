import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // Pin the project root to this folder so Turbopack never mis-infers a parent
  // directory as the workspace root.
  turbopack: {
    root: path.join(__dirname),
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Retired routes from the previous site. Permanent redirects keep old links
  // and search results from landing on a 404.
  async redirects() {
    const to = (source: string, destination: string) => ({ source, destination, permanent: true });
    return [
      to("/pricing", "/contact-sales"),
      to("/industries", "/services"),
      to("/industries/:slug", "/services"),
      to("/services/:slug", "/services"),
      to("/case-studies", "/#proof"),
      to("/case-studies/:slug", "/#proof"),
      to("/work/:slug", "/#proof"),
      to("/blog", "/"),
      to("/blog/:slug", "/"),
      to("/intake", "/"),
      to("/pi-intake-audit", "/"),
      to("/personal-injury-intake", "/"),
      to("/intake-audit", "/"),
      to("/intake-1", "/"),
      to("/leak-score", "/"),
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
