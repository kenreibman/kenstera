import { IntakeBooking, IntakeCall, IntakeSetup } from "@/components/sections/IntakeSections";
import { BlockSection } from "@/components/exact";
import { Button } from "@/components/el/ui";
import { CRMIntegrations } from "@/components/sections/CRMIntegrations";
import { IndustriesFaqBlog } from "@/components/industries";
import { FinalCTA } from "@/components/sections/FinalCTA";
import type { Metadata } from "next";
import { OG_IMAGE, jsonLdString } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Intake Services for Law Firms",
  description:
    "AI-powered intake and lead qualification for law firms: inbound calls and web inquiries handled 24/7 so you never miss a potential client.",
  alternates: {
    canonical: "https://kenstera.com/intake",
  },
  openGraph: {
    title: "Intake Services for Law Firms — Kenstera",
    description:
      "24/7 automated intake and lead qualification for law firms. Never miss a potential client — even after hours or on weekends.",
    url: "https://kenstera.com/intake",
    siteName: "Kenstera",
    type: "website",
    images: [...OG_IMAGE],
  },
};

const faqs = [
  {
    question: "What is Kenstera?",
    answer:
      "Kenstera is an automation company that builds intake and lead qualification systems for law firms. We handle inbound calls and web inquiries 24/7 using conversational agents, so firms never miss a potential client — even after hours or on weekends.",
  },
  {
    question: "What services does Kenstera offer?",
    answer:
      "Kenstera offers three core services: automated intake and scheduling for capturing and qualifying leads around the clock, support automation for handling routine client inquiries, and custom development for integrations, websites, and bespoke automation solutions tailored to your firm.",
  },
  {
    question: "What industries does Kenstera work with?",
    answer:
      "Kenstera primarily works with law firms, especially personal injury practices. We also serve healthcare providers and real estate businesses that need automated intake and lead qualification.",
  },
  {
    question: "How does Kenstera's intake system work?",
    answer:
      "When a potential client calls or submits a web inquiry, Kenstera's intake system handles the conversation in real time. It asks qualifying questions, gathers case details, and books a consultation directly on your calendar. Qualified leads are routed to the right attorney automatically.",
  },
  {
    question: "How much does Kenstera cost?",
    answer:
      "Contact us at https://kenstera.com/pricing to book a free consultation, and we can discuss the right plan for your firm.",
  },
  {
    question: "Where is Kenstera located?",
    answer:
      "Kenstera is a US-based company. Our solutions work for law firms and businesses nationwide, with no geographic restrictions on service availability.",
  },
];

export default function IntakePage() {

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kenstera",
    url: "https://kenstera.com",
    logo: "https://kenstera.com/og-image.jpg",
    description:
      "AI-powered intake automation and lead qualification for law firms.",
    sameAs: [
      "https://www.facebook.com/people/Kenstera/61586497872271/",
      "https://www.instagram.com/kenstera.co/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@kenstera.com",
      contactType: "sales",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
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
        dangerouslySetInnerHTML={{
          __html: jsonLdString(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(faqSchema) }}
      />
      <main className="bg-page">
        <BlockSection bare className="pb-10 pt-16 lg:pb-14 lg:pt-24">
          <div className="grid grid-cols-12 gap-x-3">
            <div className="contents lg:col-span-6 lg:block lg:pr-5">
              <h1 className="el-trim col-span-12 text-[36px] leading-[42px] tracking-[-0.72px] text-black lg:text-[48px] lg:leading-[52px] lg:tracking-[-0.96px]">
                Your firm&apos;s intake, automated.
              </h1>
              <div className="order-last col-span-12 mt-8 flex flex-wrap gap-2">
                <Button href="/contact">Contact us</Button>
              </div>
            </div>
            <div className="col-span-12 mt-8 flex flex-col lg:col-span-6 lg:mt-0 lg:pl-5">
              <p className="el-trim mt-auto text-balance text-[16px] leading-6 tracking-[0.16px] text-black lg:text-pretty">
                Capture leads, book appointments, and acquire high-value cases. Save time and grow your law firm.
              </p>
            </div>
          </div>
        </BlockSection>
        <IntakeCall />
        <IntakeBooking />
        <IntakeSetup />
        <CRMIntegrations />
        <IndustriesFaqBlog faqs={faqs} />
        <FinalCTA />
      </main>
    </>
  );
}
