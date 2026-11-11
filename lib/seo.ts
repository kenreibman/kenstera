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
export const OG_IMAGE_URL = "/og-image.jpg?v=3";

export const SITE_URL = "https://kenstera.com";

export const SITE_DESCRIPTION =
  "Kenstera builds the websites, automations, and follow-up systems that catch every lead, answer every inquiry, and take the busywork off your team.";

export const OG_IMAGE = [
  {
    url: OG_IMAGE_URL,
    width: 1200,
    height: 630,
    alt: "Kenstera — Make your business thrive",
  },
] as const;

/**
 * Serialize structured data for a `<script type="application/ld+json">` block.
 *
 * JSON.stringify does not escape `<`, so a value containing `</script>` would
 * close the inline block early and inject live markup. Always use this instead
 * of raw JSON.stringify for JSON-LD.
 */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
