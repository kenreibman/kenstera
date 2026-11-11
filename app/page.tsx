import type { Metadata } from "next";
import { SceneMount } from "@/components/scene/SceneMount";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Systems } from "@/components/home/Systems";
import { Planner } from "@/components/home/Planner";
import { Proof } from "@/components/home/Proof";
import { Method } from "@/components/home/Method";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { FAQS, SYSTEMS } from "@/content/site";
import { SITE_DESCRIPTION, jsonLdString } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Kenstera — Make your business thrive" },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "https://kenstera.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Kenstera",
  description: SITE_DESCRIPTION,
  url: "https://kenstera.com",
  email: "info@kenstera.com",
  slogan: "Make your business thrive",
  areaServed: "Worldwide",
  serviceType: SYSTEMS.flatMap((s) => s.items.map((i) => i.name)),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(faqJsonLd) }} />
      <SceneMount />
      <main id="main" className="relative z-[1]">
        <Hero />
        <Manifesto />
        <Systems />
        <Planner />
        <Proof />
        <Method />
        <Faq />
        <FinalCta />
      </main>
    </>
  );
}
