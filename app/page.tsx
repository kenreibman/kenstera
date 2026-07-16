import type { Metadata } from "next";
import HeroBackground from "@/components/landing/HeroBackground";
import ScrollFloat from "@/components/landing/ScrollFloat";
import Showcase from "@/components/landing/Showcase";
import LandingNav from "@/components/landing/LandingNav";
import LandingActive from "@/components/landing/LandingActive";
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

// CSS scroll-snap markers, in `vh` down the 1255vh container. Each marks where a
// beat is fully in view: hero(0), About, Testimonials, Service 1-5, Work, FAQ,
// Contact. Values = panel resting-position ÷ 189 (timeline total) × 1155vh (the
// scrollable range = 1255vh − 100vh viewport). Keep in sync with the panel timing
// in Showcase.tsx.
const SNAP_OFFSETS_VH = [
  0, 125, 235, 345, 455, 565, 675, 785, 895, 1005, 1155,
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Scopes the dark theme + vertical scroll-snap to this route only. */}
      <LandingActive />
      <div className="landing-root">
        <LandingNav />
        <HeroBackground
          src="https://stream.mux.com/43NlHXsaMrmyzWamMk87m01fNyxSTekAD669BBAPBNm00.m3u8"
          poster="/hero-poster.jpg"
        />
        <div id="scroll-root" style={{ position: "relative", height: "1255vh" }}>
          {SNAP_OFFSETS_VH.map((vh) => (
            <div
              key={vh}
              className="snap-target"
              style={{ top: `${vh}vh` }}
              aria-hidden="true"
            />
          ))}
          <ScrollFloat>{`Rapid Growth\nFor Business`}</ScrollFloat>
          <Showcase />
        </div>
      </div>
    </>
  );
}
