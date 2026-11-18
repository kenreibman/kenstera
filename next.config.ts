import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // Pin the project root to this folder. Without this, Turbopack sees the
  // sibling `kenstera-redesign/package-lock.json` and mis-infers the workspace
  // root as the parent `site-merge` dir, which breaks module resolution
  // (e.g. "Can't resolve 'tailwindcss'"). See Next.js "inferred workspace root".
  turbopack: {
    root: path.join(__dirname),
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Retired routes from the live site.
  async redirects() {
    return [
      { source: "/work/:slug", destination: "/case-studies", permanent: true },
      { source: "/contact-sales", destination: "/contact", permanent: true },
      // The blog was retired; old post links land on the homepage.
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:slug", destination: "/", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
