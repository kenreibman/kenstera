"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Feature } from "@/lib/industry-content";

const defaultFeatures: Feature[] = [
  {
    title: "Conversational agents that speak, read, and see",
    description:
      "Multimodal by design, Kenstera Agents understand spoken or written inputs, retrieve the right answers, and respond naturally in real time. Agents listen, read, and interact just like a human would, across voice and chat.",
  },
  {
    title: "Take action with external tool calls",
    description:
      "Connect your agents to external APIs and tools. Schedule appointments, look up information, process payments, and more — all within the conversation flow.",
  },
  {
    title: "Deploy anywhere your customers are",
    description:
      "Embed agents on your website, mobile app, phone system, or messaging platforms. Meet customers where they are with consistent, intelligent support.",
  },
];

interface IndustriesMultimodalProps {
  heading?: string;
  features?: Feature[];
}

export function IndustriesMultimodal({
  heading = "Kenstera Agents resolve issues, deliver answers, and take action - anytime, anywhere",
  features = defaultFeatures,
}: IndustriesMultimodalProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Dotted line */}
        <div className="border-t-2 border-dotted border-gray-300 mb-4" />

        {/* Section label */}
        <p className="text-sm font-medium text-gray-900 mb-12">Multimodal Agents</p>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left column */}
          <div>
            {/* Large serif heading */}
            <h2
              className="text-xl lg:text-2xl text-gray-900 mb-24 lg:mb-40"
            >
              {heading}
            </h2>

            {/* Accordion items */}
            <div className="space-y-5">
              {features.map((feature, index) => (
                <div key={index}>
                  <button
                    onClick={() => setActiveIndex(index)}
                    className={`text-left text-base font-semibold transition-colors ${
                      activeIndex === index ? "text-gray-900" : "text-gray-300"
                    }`}
                  >
                    {feature.title}
                  </button>
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-gray-500 text-sm leading-relaxed mt-2 max-w-md overflow-hidden"
                      >
                        {feature.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Gradient placeholder */}
          <div className="rounded-2xl bg-gradient-to-b from-sky-300 via-sky-400 to-blue-500 min-h-[500px] lg:min-h-[600px]" />
        </div>
      </div>
    </section>
  );
}

export default IndustriesMultimodal;
