import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for development best practices
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental features stable in Next.js 16
  experimental: {
    // Enable optimized package imports for better bundle size
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
