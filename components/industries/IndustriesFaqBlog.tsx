"use client";

import { BlockSection, ElFaq } from "@/components/exact";
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

/** FAQ block, the same one the home page uses. */
export function IndustriesFaqBlog({ faqs = defaultFaqs }: IndustriesFaqBlogProps) {
  return (
    <BlockSection id="faq">
      <ElFaq items={faqs.map((f) => ({ q: f.question, a: <p>{f.answer}</p> }))} />
    </BlockSection>
  );
}

export default IndustriesFaqBlog;
