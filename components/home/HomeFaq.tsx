"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HOME_FAQS } from "./faqs";

export function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 md:py-28">
      {/* Dotted line separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#e5e7eb_4px,#e5e7eb_8px)]" />

      <div className="w-full max-w-7xl mx-auto px-5">
        {/* Label */}
        <p className="text-sm font-medium text-gray-900 mb-16">
          Questions, answered
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — sticky heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] tracking-tight text-gray-900 mb-8">
              Frequently asked
            </h2>
            <Link
              href="/contact-sales"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-200 text-gray-900 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors"
            >
              Still have a question?
            </Link>
          </div>

          {/* Right — accordion */}
          <div className="lg:col-span-8">
            {HOME_FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="border-t border-gray-200 last:border-b"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-start justify-between gap-6 text-left py-6 group"
                  >
                    <h3
                      className={`text-lg font-semibold transition-colors ${
                        isOpen ? "text-gray-900" : "text-gray-400"
                      } group-hover:text-gray-900`}
                    >
                      {faq.question}
                    </h3>
                    <span className="shrink-0 pt-1">
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-400" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 pr-8 text-[15px] leading-relaxed text-gray-600 max-w-2xl">
                          <p>{faq.answer}</p>
                          {faq.bullets && (
                            <ul className="mt-4 flex flex-col gap-2 list-disc pl-5 marker:text-gray-300">
                              {faq.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                              ))}
                            </ul>
                          )}
                          {faq.outro && <p className="mt-4">{faq.outro}</p>}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeFaq;
