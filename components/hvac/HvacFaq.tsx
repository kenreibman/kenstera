"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface HvacFaqItem {
  question: string;
  answer: string;
}

/** Accordion with the dotted dividers used on elevenlabs.io. */
export function HvacFaq({ items }: { items: HvacFaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {items.map((faq, index) => {
        const open = openIndex === index;
        return (
          <div key={faq.question} className="dotted-row pb-0.5">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <h3 className="text-[18px] font-normal text-black">{faq.question}</h3>
              <ChevronDown
                className={`h-4 w-4 flex-none text-subtle transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              />
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="pb-6 pr-8 text-[16px] leading-[1.6] text-subtle">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
