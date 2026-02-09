"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
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
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Dotted line */}
        <div className="border-t-2 border-dotted border-gray-300 mb-4" />

        {/* Section label */}
        <p className="text-sm font-medium text-gray-900 mb-12">Fully customizable</p>

        {/* Centered heading */}
        <h2 className="text-2xl lg:text-4xl font-medium text-gray-900 text-center mb-16">
          {heading}
        </h2>

        {/* Accordion */}
        <div className="space-y-0">
          {features.map((feature, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                type="button"
                aria-expanded={activeIndex === index}
                onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                className="w-full py-6 flex items-center justify-between text-left"
              >
                <span
                  className={`text-base lg:text-lg font-semibold transition-colors ${
                    activeIndex === index ? "text-gray-900" : "text-gray-300"
                  }`}
                >
                  {feature.title}
                </span>
                <span className="ml-4 flex-shrink-0">
                  {activeIndex === index ? (
                    <Minus className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400" />
                  )}
                </span>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 grid lg:grid-cols-2 gap-8 lg:gap-16">
                      {/* Description */}
                      <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
                        {feature.description}
                      </p>
                      {/* Gradient placeholder */}
                      <div className="rounded-xl bg-gradient-to-br from-orange-100 via-amber-50 to-stone-100 min-h-[250px]" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default IndustriesCustomizable;
