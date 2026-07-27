import type { Metadata } from "next";
import Link from "next/link";
import { PricingCards } from "./components/PricingCards";
import { PricingFAQ } from "./components/PricingFAQ";
import { PricingCTA } from "./components/PricingCTA";
import { OG_IMAGE, jsonLdString } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing | Kenstera",
  description:
    "Competitive pricing for your business needs. Choose from Scale, Business, or Partner plans.",
  openGraph: {
    title: "Pricing | Kenstera",
    description:
      "Competitive pricing for your business needs. Choose from Scale, Business, or Partner plans.",
    images: [...OG_IMAGE],
  },
};

const pricingFaqs = [
  {
    question: "What's included in each plan?",
    answer:
      "Each plan builds on the previous tier. Scale includes standard TTS voices and basic analytics. Business adds low-latency voices, advanced NLU, multi-channel support, and CRM integration. Partner includes everything plus custom terms, HIPAA compliance, SSO, and priority support.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to the new features. When downgrading, the change takes effect at the start of your next billing cycle.",
  },
  {
    question: "Is there a minimum contract length?",
    answer:
      "Scale and Business plans are billed monthly with no long-term commitment required. Partner plans typically involve an annual agreement, but we can discuss flexible terms based on your needs.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, ACH transfers, and wire transfers for annual plans. For Partner plans, we can also accommodate purchase orders and custom billing arrangements.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "We offer a personalized demo and pilot period for qualified businesses. Book a call with our team to discuss your needs and we'll set up a trial that makes sense for your use case.",
  },
  {
    question: "What kind of support is included?",
    answer:
      "Scale and Business plans include email support with response within 24 business hours. Partner plans include priority support with a dedicated account manager and faster response times.",
  },
];

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
      <main className="min-h-screen bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          {/* Header */}
          <div className="mb-12 sm:mb-16">
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              Competitive pricing for your business needs
            </h1>
          </div>

          {/* Pricing Grid */}
          <PricingCards />

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-neutral-600">
              Not sure which plan is right for you?{" "}
              <Link
                href="https://cal.com/kenstera/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-700"
              >
                Book a free consultation
              </Link>
            </p>
          </div>

          {/* FAQ Section */}
          <PricingFAQ />

          {/* CTA Section */}
          <PricingCTA />
        </div>
      </main>
    </>
  );
}
