"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
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

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-neutral-600"
        aria-expanded={isOpen}
      >
        <span className="pr-4 text-base font-medium text-neutral-900">
          {item.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-neutral-600">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function PricingFAQ() {
  return (
    <section className="mt-20 sm:mt-28">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
        Frequently asked questions
      </h2>
      <div className="mt-8 border-t border-neutral-200">
        {faqs.map((faq) => (
          <FAQAccordionItem key={faq.question} item={faq} />
        ))}
      </div>
    </section>
  );
}
