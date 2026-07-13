/**
 * Shared SEO defaults.
 *
 * Next.js shallow-merges metadata, so a page that exports its own `openGraph`
 * (or `twitter`) block does NOT inherit `openGraph.images` from the root layout.
 * Any page that sets those blocks must spread these in explicitly, otherwise its
 * social share preview renders with no image.
 *
 * The `?v=N` suffix is a cache-buster: social scrapers (Facebook, LinkedIn,
 * X/Twitter, iMessage) cache the image by URL, so bump it when the art changes.
 */
export const OG_IMAGE_URL = "/og-image.jpg?v=2";

export const OG_IMAGE = [
  {
    url: OG_IMAGE_URL,
    width: 1200,
    height: 630,
    alt: "Kenstera — Rapid Growth For Business",
  },
] as const;
