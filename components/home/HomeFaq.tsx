"use client";

import { BlockSection, ElFaq, type FaqItem } from "@/components/exact";
import { HOME_FAQS } from "./faqs";

const ITEMS: FaqItem[] = HOME_FAQS.map((faq) => ({
  q: faq.question,
  a: (
    <>
      <p>{faq.answer}</p>
      {faq.bullets && (
        <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5">
          {faq.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
      {faq.outro && <p className="mt-3">{faq.outro}</p>}
    </>
  ),
}));

export function HomeFaq() {
  return (
    <BlockSection id="faq">
      <ElFaq items={ITEMS} />
    </BlockSection>
  );
}

export default HomeFaq;
