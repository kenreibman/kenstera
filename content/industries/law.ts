import { IndustryContent } from "@/lib/industry-content";

export const lawContent: IndustryContent = {
  slug: "law",
  name: "Law Firms",
  hero: {
    headline: "AI Voice Agents\nfor Law Firms",
    description:
      "The firm that responds first wins the case. Kenstera captures every inquiry, qualifies potential clients instantly, and books consultations—even at 2am.",
  },
  useCases: [
    {
      title: "Lead Intake",
      description:
        "automated with voice agents that capture case details, qualify potential clients, and route to the right attorney 24/7.",
      gradient: "from-indigo-100 via-purple-50 to-white",
    },
    {
      title: "Consultation Scheduling",
      description:
        "handled by intelligent agents that check attorney availability and book consultations without back-and-forth.",
      gradient: "from-sky-100 via-blue-50 to-white",
    },
    {
      title: "Client Follow-ups",
      description:
        "managed through automated agents that send reminders, collect documents, and keep cases moving forward.",
      gradient: "from-emerald-100 via-teal-50 to-white",
    },
  ],
  voiceAgents: {
    label: "24/7 Availability",
    heading: "Legal Voice Agents",
    description:
      "78% of clients hire the first firm to respond. Kenstera ensures you never miss a lead—capturing inquiries, qualifying cases, and booking consultations around the clock while maintaining attorney-client privilege.",
  },
  multimodal: {
    heading:
      "From first call to signed retainer — handled intelligently",
    features: [
      {
        title: "Case qualification in real-time",
        description:
          "Smart intake questions determine case type, timeline, jurisdiction, and fit. Non-qualifying leads are declined politely or routed to referral partners.",
      },
      {
        title: "Integrate with your legal tech stack",
        description:
          "Connect to Clio, MyCase, PracticePanther, and other practice management systems. Leads sync automatically with full intake details.",
      },
      {
        title: "Multi-channel lead capture",
        description:
          "Website forms, phone calls, Google LSA, chat widgets—Kenstera captures leads from every source and responds instantly.",
      },
    ],
  },
  workflows: {
    heading:
      "Build intake workflows with conflict checks and practice area routing",
    features: [
      {
        title: "Practice area routing",
        description:
          "Automatically route personal injury to PI attorneys, family law to family attorneys. Each practice area can have custom qualification criteria.",
      },
      {
        title: "Conflict checking",
        description:
          "Integrate with your conflicts database. Flag potential conflicts before booking consultations and alert the appropriate staff.",
      },
      {
        title: "Performance tracking",
        description:
          "Track lead sources, conversion rates, and response times. Identify which marketing channels deliver the best ROI.",
      },
    ],
  },
  customizable: {
    heading: "Tailored to your practice areas and intake process",
    features: [
      {
        title: "Train on your firm's criteria and procedures",
        description:
          "Define what makes a qualified lead for each practice area. Set minimum case values, statute of limitations checks, and jurisdiction requirements.",
      },
      {
        title: "Professional voice and tone",
        description:
          "Choose voice profiles that convey authority and empathy. Multilingual support for diverse client populations.",
      },
      {
        title: "Deep practice management integration",
        description:
          "Two-way sync with Clio, MyCase, Smokeball, and more. New matters created automatically with all intake information.",
      },
    ],
  },
  integrations: {
    heading:
      "Integrate with the legal software you already use",
    description:
      "Connect agents to your practice management system, calendar, billing platform, and communication tools. Enterprise-grade integrations with leading legal tech vendors.",
    additionalText: "Plus custom integrations via APIs and webhooks.",
    items: [
      "Clio",
      "MyCase",
      "PracticePanther",
      "Smokeball",
      "Lawmatics",
      "Calendly",
      "Google Calendar",
      "Twilio",
      "Zapier",
    ],
  },
  gettingStarted: {
    heading: "Go live in days, not weeks",
    description:
      "Our legal implementation team helps you configure intake flows, integrate with your practice management system, and train your staff—so you can start capturing more leads immediately.",
  },
  faqs: [
    {
      question: "How quickly does Kenstera respond to leads?",
      answer:
        "Instantly—within seconds. Whether it's a phone call, web form, or chat at 2am, prospects get an immediate response 24/7.",
    },
    {
      question: "Can Kenstera handle different practice areas?",
      answer:
        "Yes. Configure for any practice area—personal injury, family law, criminal defense, estate planning, and more. Each can have custom qualification questions and routing rules.",
    },
    {
      question: "Does this integrate with my practice management system?",
      answer:
        "Yes. Kenstera integrates with Clio, MyCase, PracticePanther, Smokeball, and more. Leads and new matters sync automatically.",
    },
    {
      question: "What happens to leads that don't qualify?",
      answer:
        "Non-qualifying leads can be declined politely or routed to referral partners. You set the criteria and rules.",
    },
    {
      question: "Is attorney-client privilege maintained?",
      answer:
        "Yes. All communications are encrypted and handled according to legal ethics requirements. We can sign confidentiality agreements as needed.",
    },
  ],
  cta: {
    heading: "Stop losing leads to slow response times",
  },
};
