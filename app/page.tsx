import type { Metadata } from "next";
import {
  HomeHero,
  HomeAbout,
  HomeServices,
  HomeWork,
  HomeTestimonials,
  HomeFaq,
  HomeCta,
  HOME_FAQS,
} from "@/components/home";
import { OG_IMAGE, OG_IMAGE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Kenstera — Rapid Growth For Business",
  },
  description:
    "Kenstera builds high-converting websites, workflow automations, and marketing systems that drive rapid, predictable growth for your business.",
  alternates: {
    canonical: "https://kenstera.com",
  },
  openGraph: {
    title: "Kenstera — Rapid Growth For Business",
    description:
      "Kenstera builds high-converting websites, workflow automations, and marketing systems that drive rapid, predictable growth for your business.",
    url: "https://kenstera.com",
    siteName: "Kenstera",
    type: "website",
    // Next shallow-merges metadata, so openGraph.images is NOT inherited from
    // the root layout when a page defines its own openGraph. Set it explicitly.
    images: [...OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenstera — Rapid Growth For Business",
    description:
      "Kenstera builds high-converting websites, workflow automations, and marketing systems that drive rapid, predictable growth for your business.",
    images: [OG_IMAGE_URL],
  },
};

// Structured data describing the business for search engines.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Kenstera",
  description:
    "Kenstera builds high-converting websites, workflow automations, and marketing systems that drive rapid, predictable growth for your business.",
  url: "https://kenstera.com",
  slogan: "Rapid Growth For Business",
  areaServed: "Worldwide",
  serviceType: [
    "Custom Websites",
    "Review Funnel",
    "Missed Call Text Back",
    "Marketing Campaigns",
    "Local SEO",
  ],
};

// The on-page FAQ, mirrored as structured data so it can win rich results.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: [faq.answer, ...(faq.bullets ?? []), faq.outro]
        .filter(Boolean)
        .join(" "),
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="bg-white">
        <HomeHero />
        <HomeAbout />
        <HomeServices />
        <HomeWork />
        <HomeTestimonials />
        <HomeFaq />
        <HomeCta />
      </main>
    </>
  );
}
