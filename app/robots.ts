import type { MetadataRoute } from "next";

// Pages that exist for people who already have the link: no search value.
const PRIVATE = ["/api/", "/booking-confirmed", "/hvac/example"];

// Search and AI assistants we want to read the site, named explicitly so the
// intent is clear to crawlers that look for their own rule block.
const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "Google-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "DuckDuckBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      { userAgent: AI_AND_SEARCH_BOTS, allow: "/", disallow: PRIVATE },
    ],
    sitemap: "https://kenstera.com/sitemap.xml",
    host: "https://kenstera.com",
  };
}
