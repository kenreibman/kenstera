import { SITE_URL } from "@/lib/seo";

/**
 * Structured data builders. Everything here is fact stated elsewhere on the
 * site: no ratings, addresses, phone numbers or review counts are invented.
 */

export const ORG_ID = `${SITE_URL}/#organization`;
export const CONTACT_EMAIL = "contact@kenstera.com";

export const SOCIAL_LINKS = [
  "https://www.facebook.com/people/Kenstera/61586497872271/",
  "https://www.instagram.com/kenstera.co/",
];

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Kenstera",
    url: SITE_URL,
    email: CONTACT_EMAIL,
    description:
      "Kenstera builds high-converting websites, voice and text automation, and marketing systems that drive predictable growth for businesses.",
    sameAs: SOCIAL_LINKS,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: CONTACT_EMAIL,
        url: `${SITE_URL}/contact`,
      },
    ],
    knowsAbout: [
      "Website design",
      "Missed-call text back",
      "Voice receptionist",
      "Review generation",
      "Local SEO",
      "AI search optimization",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Kenstera",
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function serviceSchema(opts: { name: string; description: string; path: string; serviceType?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? opts.name,
    url: `${SITE_URL}${opts.path}`,
    provider: { "@id": ORG_ID },
  };
}
