import { ShaderHero } from "@/components/sections/ShaderHero";
import { IntakeCall } from "@/components/sections/IntakeCall";
import { IntakeBooking } from "@/components/sections/IntakeBooking";
import { IntakeSetup } from "@/components/sections/IntakeSetup";
import { CRMIntegrations } from "@/components/sections/CRMIntegrations";
import { DemoForm } from "@/components/sections/DemoForm";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { IndustriesFaqBlog } from "@/components/industries";
import { getAllPosts } from "@/lib/blog";
import { FinalCTA } from "@/components/sections/FinalCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intake Services for Law Firms",
  description:
    "Kenstera builds AI-powered intake and lead qualification systems for law firms — handling inbound calls and web inquiries 24/7 so your firm never misses a potential client.",
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
  const posts = getAllPosts();
  const blogPosts = posts.map(post => ({ slug: post.slug, title: post.title }));

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
      email: "info@kenstera.com",
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
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="">
        <ShaderHero />
        <IntakeCall />
        <IntakeBooking />
        <IntakeSetup />
        <CRMIntegrations />
        <DemoForm />
        <CaseStudies />
        <IndustriesFaqBlog faqs={faqs} blogPosts={blogPosts} />
        <FinalCTA />
      </main>
    </>
  );
}
