// Pricing FAQ copy. A plain module so the page can emit FAQPage structured data from the same text the accordion shows.
export interface PricingFaq {
  question: string;
  answer: string;
}

export const pricingFaqs: PricingFaq[] = [
  {
    question: "What's included in each plan?",
    answer:
      "Each plan builds on the previous tier. Scale ($599 a month) includes a custom website, missed-call text back, local SEO, and an automatic review pipeline. Business adds a voice receptionist, follow-up and re-marketing campaigns, paid and email campaigns, a 24/7 website chat, and CRM and calendar integration. Partner adds custom software, A/B testing, ongoing content, hosting and maintenance, and priority support.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to the new features. When downgrading, the change takes effect at the start of your next billing cycle.",
  },
  {
    question: "Is there a minimum contract length?",
    answer:
      "Scale and Business plans are billed monthly with no long-term commitment required. Partner plans typically involve an annual agreement, but we can discuss flexible terms based on your needs.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, ACH transfers, and wire transfers for annual plans. For Partner plans, we can also accommodate purchase orders and custom billing arrangements.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "We offer a personalized demo and pilot period for qualified businesses. Book a call with our team to discuss your needs and we'll set up a trial that makes sense for your use case.",
  },
  {
    question: "What kind of support is included?",
    answer:
      "Scale and Business plans include email support with response within 24 business hours. Partner plans include priority support with a dedicated account manager and faster response times.",
  },
];
