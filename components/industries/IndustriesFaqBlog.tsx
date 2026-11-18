"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button, Section } from "@/components/el/ui";
import { FAQ } from "@/lib/industry-content";

const defaultFaqs: FAQ[] = [
  {
    question: "Can I integrate Kenstera Conversational AI into my own app?",
    answer:
      "Yes, Kenstera provides APIs and SDKs that allow you to seamlessly integrate our Conversational AI into your existing applications, websites, or custom platforms.",
  },
  {
    question: "How many agents can I create?",
    answer:
      "The number of agents you can create depends on your plan. Business plans offer unlimited agent creation, while starter plans include up to 5 agents.",
  },
  {
    question: "What LLMs can I use with my voice agents?",
    answer:
      "Kenstera supports multiple LLM providers including OpenAI, Anthropic Claude, and custom fine-tuned models. You can choose the model that best fits your use case.",
  },
  {
    question: "Can my agent make API calls to external services?",
    answer:
      "Absolutely. Kenstera agents can be configured to make external API calls, enabling them to fetch data, update records, or trigger actions in your existing systems.",
  },
  {
    question: "How can I make and receive phone calls with Conversational AI?",
    answer:
      "Kenstera provides telephony integration out of the box. You can provision phone numbers, configure inbound call routing, and enable outbound calling capabilities for your agents.",
  },
];

interface IndustriesFaqBlogProps {
  faqs?: FAQ[];
}

/** FAQ section: heading on the left, accordion on the right. */
export function IndustriesFaqBlog({ faqs = defaultFaqs }: IndustriesFaqBlogProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section>
      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        <div className="md:sticky md:top-24 md:self-start">
          <p className="mb-3 text-[15px] text-subtle">Questions, answered</p>
          <h2 className="text-[32px] leading-[1.15] text-black sm:text-[40px]">Frequently asked questions</h2>
          <Button href="/contact" variant="secondary" className="mt-6">
            Contact Us
          </Button>
        </div>

        <div className="border-t border-hairline">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq.question} className="border-b border-hairline">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-[16px] text-black">{faq.question}</span>
                  <Plus className={`h-4 w-4 flex-none text-subtle transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-8 text-[15px] leading-[1.6] text-subtle">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export default IndustriesFaqBlog;
