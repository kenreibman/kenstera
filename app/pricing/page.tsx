import type { Metadata } from "next";
import Link from "next/link";
import { PricingCards } from "./components/PricingCards";
import { BlockSection } from "@/components/exact";
import { PricingFAQ } from "./components/PricingFAQ";
import { PricingCTA } from "./components/PricingCTA";
import { pricingFaqs } from "./faqs";
import { OG_IMAGE, jsonLdString } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Plans start at $599 a month: a website, missed-call text back, local SEO, and automatic reviews. Compare Scale, Business, and Partner, then book a call.",
  openGraph: {
    title: "Pricing | Kenstera",
    description:
      "Plans start at $599 a month: a website, missed-call text back, local SEO, and automatic reviews. Compare Scale, Business, and Partner, then book a call.",
    images: [...OG_IMAGE],
  },
};



export default function PricingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pricingFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(faqSchema) }}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Pricing", path: "/pricing" }])} />
      <main className="bg-page">
        {/* Hero: borderless block, two-tone headline */}
        <BlockSection bare className="pb-10 pt-16 lg:pt-24">
          <h1 className="el-trim max-w-[760px] text-[36px] leading-[42px] tracking-[-0.72px] text-black lg:text-[44px] lg:leading-[48px] lg:tracking-[-0.88px]">
            Competitive pricing
            <span className="block text-[#a59f97]">for your business needs</span>
          </h1>
        </BlockSection>

        {/* Plans: full-height columns between hairlines */}
        <BlockSection className="p-0">
          <PricingCards />
          <div className="border-t border-black/5 py-6 text-center">
            <p className="text-[14px] leading-[19.6px] text-[#59544f]">
              Not sure which plan is right for you?{" "}
              <Link href="/contact" className="text-black underline underline-offset-4 hover:text-subtle">
                Book a free consultation
              </Link>
            </p>
          </div>
        </BlockSection>

        <PricingFAQ />
        <PricingCTA />
      </main>
    </>
  );
}
