import { IndustryContent } from "@/lib/industry-content";

export const defaultContent: IndustryContent = {
  slug: "services",
  name: "Services",
  hero: {
    headline: "What We Build\nfor Your Business",
    description:
      "Intake and scheduling that runs 24/7. Custom software tailored to your operations. Support automation that keeps customers happy. All built, managed, and improved by Kenstera.",
  },
  useCases: [
    {
      title: "Intake & Scheduling",
      description:
        "24/7 lead qualification, appointment booking, and follow-up sequences. Every inquiry gets answered in seconds—phone, web, or chat.",
      gradient: "from-sky-100 via-blue-50 to-white",
    },
    {
      title: "Custom Development",
      description:
        "Websites, internal tools, integrations, and workflow automation. We build the software your business actually needs—no bloated platforms.",
      gradient: "from-gray-100 via-gray-50 to-white",
    },
    {
      title: "Support Automation",
      description:
        "Our software that handle tier-1 support, route complex issues, and keep response times under a minute. Your customers get answers, not hold music.",
      gradient: "from-purple-200 via-pink-100 to-blue-100",
    },
  ],
  voiceAgents: {
    label: "Full-Service Delivery",
    heading: "Built, Managed, and Improved",
    description:
      "You don't get software and a manual. Kenstera builds your system, integrates it with your tools, and manages it end-to-end. We handle the technical work so your team stays focused on what they do best.",
  },
  multimodal: {
    heading:
      "Kenstera systems work across every channel your customers use—phone, chat, email, and web",
    features: [
      {
        title: "Intake & qualification",
        description:
          "Capture the details that matter. Route qualified leads to your team or calendar instantly. Handle non-fits politely and automatically.",
      },
      {
        title: "Custom workflows",
        description:
          "From internal dashboards to client portals to API integrations—we build the tools your operations actually need, without the overhead of enterprise platforms.",
      },
      {
        title: "Support triage & resolution",
        description:
          "AI agents handle common questions, collect issue details, and escalate edge cases to your team with full context. No repetition for the customer.",
      },
    ],
  },
  workflows: {
    heading:
      "Multi-step automation with guardrails, testing, and analytics built in from day one",
    features: [
      {
        title: "Speed-to-lead sequences",
        description:
          "Text within 10 seconds of a missed call. Callback attempts at 1 min, 5 min, 30 min, and next day. No lead goes cold.",
      },
      {
        title: "Custom application development",
        description:
          "Websites, portals, scheduling systems, and integrations—designed for your specific workflow and delivered fast.",
      },
      {
        title: "Automated support routing",
        description:
          "Incoming tickets triaged by AI, routed to the right team, and resolved faster. Escalations include full context so agents never start from scratch.",
      },
    ],
  },
  customizable: {
    heading: "Every system is tailored to your brand, rules, and tools",
    features: [
      {
        title: "Your rules enforced",
        description:
          "Define qualification criteria, routing rules, and escalation paths. Every interaction follows your process—not a generic template.",
      },
      {
        title: "Compliant by design",
        description:
          "Call disclosure, recording consent logic, data retention policies, and access controls configured to your requirements.",
      },
      {
        title: "Deep integration",
        description:
          "Two-way sync with your CRM, calendar, helpdesk, and internal tools. Data flows where it needs to—automatically.",
      },
    ],
  },
  integrations: {
    heading: "Connects to the tools you already use",
    description:
      "Your CRM, calendar, helpdesk, and communication tools. Integrations built for real business workflows.",
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
      "We scope your needs, build your system, integrate with your tools, and manage everything post-launch. You start seeing results this week.",
  },
  faqs: [
    {
      question: "What services does Kenstera offer?",
      answer:
        "Three core services: intake and scheduling automation, custom software development, and support automation. Each is built and managed end-to-end.",
    },
    {
      question: "Do I need to manage the technology myself?",
      answer:
        "No. Kenstera builds, deploys, and manages everything. You get a working system, not a DIY toolkit.",
    },
    {
      question: "How fast can you build a custom project?",
      answer:
        "Most intake and scheduling systems go live within a week. Custom development projects vary, but we scope and estimate before any work begins.",
    },
    {
      question: "Can you integrate with my existing tools?",
      answer:
        "Yes. We integrate with CRMs, calendars, helpdesks, payment systems, and custom APIs. If it has an API, we can connect it.",
    },
    {
      question: "What does pricing look like?",
      answer:
        "It depends on the scope. Intake and scheduling starts with a flat monthly rate. Custom development is scoped and quoted per project. Contact us for details.",
    },
  ],
  cta: {
    heading: "Ready to automate what slows you down?",
  },
};
