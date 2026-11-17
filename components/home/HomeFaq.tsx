"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button, Section } from "@/components/el/ui";
import { HOME_FAQS } from "./faqs";

export function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq">
      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        <div className="md:sticky md:top-24 md:self-start">
          <p className="mb-3 text-[15px] text-subtle">Questions, answered</p>
          <h2 className="text-[32px] leading-[1.15] text-black sm:text-[40px]">Frequently asked questions</h2>
          <Button href="/contact-sales" variant="secondary" className="mt-6">
            Still have a question?
          </Button>
        </div>

        <div className="border-t border-hairline">
          {HOME_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="border-b border-hairline">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <h3 className="text-[16px] font-normal text-black">{faq.question}</h3>
                  <Plus
                    className={`h-4 w-4 flex-none text-subtle transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 pr-8 text-[15px] leading-[1.6] text-subtle">
                      <p>{faq.answer}</p>
                      {faq.bullets && (
                        <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5">
                          {faq.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                      {faq.outro && <p className="mt-3">{faq.outro}</p>}
                    </div>
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

export default HomeFaq;
