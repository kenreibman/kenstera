"use client";

import { BlockSection, ElFaq } from "@/components/exact";
import { pricingFaqs } from "../faqs";

/** The same FAQ block as the home page. */
export function PricingFAQ() {
  return (
    <BlockSection id="faq">
      <ElFaq items={pricingFaqs.map((f) => ({ q: f.question, a: <p>{f.answer}</p> }))} />
    </BlockSection>
  );
}
