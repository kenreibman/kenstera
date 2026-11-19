"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Section } from "@/components/el/ui";
import { Feature } from "@/lib/industry-content";

const defaultFeatures: Feature[] = [
  {
    title: "Agents that deeply understand your business, powered by your knowledge base",
    description:
      "Connect internal documents, FAQs, and URLs in just a few clicks. With built-in Retrieval-Augmented Generation (RAG), agents provide accurate, real-time answers grounded in your own content, automatically reindexed as it changes.",
  },
  {
    title: "Custom voices & tailored personalities",
    description:
      "Create unique voice profiles that match your brand identity. Fine-tune tone, pace, and personality to deliver consistent experiences across every interaction.",
  },
  {
    title: "Tight integration with your stack",
    description:
      "Connect seamlessly with your CRM, helpdesk, calendar, and other tools. Agents can read and write data, trigger workflows, and keep everything in sync.",
  },
];

interface IndustriesCustomizableProps {
  heading?: string;
  features?: Feature[];
}

export function IndustriesCustomizable({
  heading = "Fully customizable to your brand and systems",
  features = defaultFeatures,
}: IndustriesCustomizableProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Section>
      <p className="mb-3 text-[15px] text-subtle">Fully customizable</p>
      <h2 className="max-w-3xl text-[32px] leading-[1.15] text-black sm:text-[40px]">{heading}</h2>

      <div className="mt-12 border-t border-hairline">
        {features.map((feature, index) => {
          const open = activeIndex === index;
          return (
            <div key={feature.title} className="border-b border-hairline">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setActiveIndex(open ? -1 : index)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className={`text-[16px] ${open ? "text-black" : "text-black/60"}`}>{feature.title}</span>
                <Plus className={`h-4 w-4 flex-none text-subtle transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
              </button>
              <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <div className="grid gap-6 pb-6 lg:grid-cols-2 lg:gap-12">
                    <p className="max-w-lg text-[15px] leading-[1.5] text-subtle">{feature.description}</p>
                    <div className={`grad g-${["ember", "moss", "dusk"][index % 3]} min-h-[220px] rounded-2xl`} aria-hidden="true">
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default IndustriesCustomizable;
