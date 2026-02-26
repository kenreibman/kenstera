import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/booking-confirmed"],
      },
    ],
    sitemap: "https://kenstera.com/sitemap.xml",
  };
}
