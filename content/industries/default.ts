import { IndustryContent } from "@/lib/industry-content";

export const defaultContent: IndustryContent = {
  slug: "default",
  name: "Industries",
  hero: {
    headline: "Stop Losing Customers\nto Slow Response",
    description:
      "Kenstera installs 24/7 coverage that answers instantly, qualifies leads, books appointments, and follows up, so more inquiries turn into customers.",
  },
  useCases: [
    {
      title: "24/7 Coverage",
      description:
        "after-hours and overflow handled instantly. No more missed calls or delayed responses. Every inquiry gets answered in seconds.",
      gradient: "from-gray-100 via-gray-50 to-white",
    },
    {
      title: "Instant Booking",
      description:
        "calendar coordination handled automatically. Leads book appointments without hold times or back-and-forth.",
      gradient: "from-sky-100 via-blue-50 to-white",
    },
    {
      title: "Follow-up Sequences",
      description:
        "multi-touch follow-up via text, email, and call. Appointment reminders. No lead goes cold.",
      gradient: "from-purple-200 via-pink-100 to-blue-100",
    },
  ],
  voiceAgents: {
    label: "More Conversions",
    heading: "Fix the Response Gap",
    description:
      "Most businesses lose leads to slow response. Kenstera fixes the gap: 24/7 coverage, instant response, qualification, booking, and follow-up. Higher conversion without adding staff.",
  },
  multimodal: {
    heading:
      "Kenstera Agents resolve issues, deliver answers, and take action - anytime, anywhere",
    features: [
      {
        title: "Lead qualification",
        description:
          "Capture the details that matter for your business. Route qualified leads to your team or calendar instantly. Non-fits handled politely.",
      },
      {
        title: "Flexible routing",
        description:
          "High-priority leads: warm transfer immediately. Standard leads: book + send confirmation. Not a fit: polite decline or referral.",
      },
      {
        title: "Multi-channel capture",
        description:
          "Phone, web form, and chat. Wherever leads come from, Kenstera responds in seconds.",
      },
    ],
  },
  workflows: {
    heading:
      "Create multi-agent workflows with strict guardrails and track results with in depth testing and analytics",
    features: [
      {
        title: "Speed-to-lead sequences",
        description:
          "Text within 10 seconds of missed call. Callback attempts at 1 min, 5 min, 30 min, and next day.",
      },
      {
        title: "Warm transfer for priority leads",
        description:
          "High-value inquiries get transferred to your team immediately. Your best leads always reach a person.",
      },
      {
        title: "Appointment reminders",
        description:
          "Automated reminders reduce no-shows. Leads who reschedule get re-engaged automatically.",
      },
    ],
  },
  customizable: {
    heading: "Fully customizable to your brand and systems",
    features: [
      {
        title: "Your rules enforced",
        description:
          "Define your qualification criteria. Set routing rules. Every call is handled according to your process.",
      },
      {
        title: "Compliant by design",
        description:
          "Call disclosure, recording consent logic, configurable data retention.",
      },
      {
        title: "Deep integration",
        description:
          "Two-way sync with your CRM, calendar, and tools. Leads and appointments sync automatically.",
      },
    ],
  },
  integrations: {
    heading: "Connects to the tools you already use",
    description:
      "Your CRM, calendar, and communication tools. Integrations built for lead response workflows.",
    additionalText: "And hundreds more via APIs or MCPs.",
    items: [
      "Pipedrive",
      "Stripe",
      "Cal.com",
      "Zendesk",
      "Vonage",
      "n8n",
      "HubSpot",
      "Salesforce",
      "Twilio",
    ],
  },
  gettingStarted: {
    heading: "Go live in days, not weeks",
    description:
      "We configure your qualification rules, integrate with your systems, and set up follow-up sequences, so you start converting more leads this week.",
  },
  faqs: [
    {
      question: "How fast does Kenstera respond?",
      answer:
        "Instantly, under 3 seconds. Phone calls answered on first ring. Web forms trigger immediate callback.",
    },
    {
      question: "What happens with high-priority leads?",
      answer:
        "High-priority leads get warm-transferred to your team immediately.",
    },
    {
      question: "What happens to leads that don't qualify?",
      answer:
        "Declined politely. Optionally routed to partners you specify.",
    },
    {
      question: "Is this software or a service?",
      answer:
        "Both. You get the system built and managed, plus the automation that runs it.",
    },
    {
      question: "What exactly am I buying?",
      answer:
        "A working lead response system: 24/7 coverage, instant response, qualification + booking, follow-up, and CRM integration.",
    },
  ],
  cta: {
    heading: "Stop losing customers to slow response",
  },
};
