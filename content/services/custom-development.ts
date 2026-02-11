import { IndustryContent } from "@/lib/industry-content";

export const customDevelopmentContent: IndustryContent = {
  slug: "custom-development",
  name: "Custom Development",
  hero: {
    headline: "Software Built for\nHow You Actually Work",
    description:
      "Websites, internal tools, integrations, and workflow automation—designed around your operations, not the other way around. Built fast, managed end-to-end.",
  },
  useCases: [
    {
      title: "Websites & Portals",
      description:
        "Marketing sites, client portals, booking pages, and dashboards. Fast, modern, and built to convert—not pulled from a template library.",
      gradient: "from-gray-100 via-gray-50 to-white",
    },
    {
      title: "Integrations & APIs",
      description:
        "Connect the tools your team already uses. CRM to billing, intake to calendar, helpdesk to Slack—data flows where it needs to, automatically.",
      gradient: "from-sky-100 via-blue-50 to-white",
    },
    {
      title: "Internal Tools",
      description:
        "Admin dashboards, reporting systems, approval workflows, and operational tools that replace the spreadsheets and manual processes slowing your team down.",
      gradient: "from-purple-200 via-pink-100 to-blue-100",
    },
  ],
  voiceAgents: {
    label: "End-to-End Delivery",
    heading: "Built, Shipped, and Managed",
    description:
      "You don't get a handoff and a Jira board. Kenstera scopes, builds, deploys, and maintains your software. We handle hosting, updates, and improvements—so your team stays focused on the business, not the tech stack.",
  },
  multimodal: {
    heading:
      "From concept to production—Kenstera builds the tools your operations actually need",
    features: [
      {
        title: "Marketing & conversion",
        description:
          "High-performance websites and landing pages designed for your audience. SEO, speed, and conversion built in from day one—not bolted on after.",
      },
      {
        title: "Workflow automation",
        description:
          "Replace manual processes with systems that run themselves. Data entry, approvals, notifications, and handoffs—automated and reliable.",
      },
      {
        title: "System integration",
        description:
          "Your CRM, calendar, helpdesk, billing, and communication tools connected into a single workflow. No more copy-pasting between tabs.",
      },
    ],
  },
  workflows: {
    heading:
      "Custom software with testing, monitoring, and iteration built into the process",
    features: [
      {
        title: "Rapid prototyping",
        description:
          "Working prototypes in days, not months. See your tool before committing to a full build. Iterate based on real usage, not guesses.",
      },
      {
        title: "Production-grade delivery",
        description:
          "Clean code, proper infrastructure, CI/CD pipelines, and monitoring. Your software runs reliably from day one—not a fragile MVP that breaks under load.",
      },
      {
        title: "Ongoing improvement",
        description:
          "Post-launch analytics, user feedback loops, and continuous iteration. Your tools get better over time, not abandoned after delivery.",
      },
    ],
  },
  customizable: {
    heading: "Your requirements, your brand, your infrastructure",
    features: [
      {
        title: "Your brand, everywhere",
        description:
          "Custom design that matches your brand guidelines. Fonts, colors, layout, and tone—consistent across every touchpoint your customers see.",
      },
      {
        title: "Security & compliance",
        description:
          "Role-based access, encryption, audit logging, and compliance controls configured for your industry and data requirements.",
      },
      {
        title: "Scalable architecture",
        description:
          "Built to grow with your business. Clean abstractions, documented APIs, and infrastructure that handles traffic spikes without intervention.",
      },
    ],
  },
  integrations: {
    heading: "Connects to the platforms your business runs on",
    description:
      "CRMs, payment processors, calendars, helpdesks, and internal systems. We build integrations that actually work—not demo-only connections.",
    additionalText: "And hundreds more via APIs or MCPs.",
    items: [
      "Salesforce",
      "HubSpot",
      "Stripe",
      "Twilio",
      "Zendesk",
      "Google Workspace",
      "Slack",
      "n8n",
      "Vercel",
    ],
  },
  gettingStarted: {
    heading: "From scoping call to working software—fast",
    description:
      "We start with a scoping call to understand your requirements. You get a timeline, a quote, and a working prototype before any major build begins. Most projects launch within weeks.",
  },
  faqs: [
    {
      question: "What types of projects do you build?",
      answer:
        "Websites, client portals, internal dashboards, API integrations, workflow automation, and custom business tools. If it solves an operational problem, we probably build it.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Simple sites and integrations: 1–2 weeks. Custom tools and dashboards: 2–6 weeks. Complex systems: scoped individually. We give you a timeline before work begins.",
    },
    {
      question: "Do you maintain the software after launch?",
      answer:
        "Yes. Kenstera manages hosting, updates, monitoring, and improvements post-launch. You're not left with a codebase and a handoff document.",
    },
    {
      question: "What technologies do you use?",
      answer:
        "Modern web stack: Next.js, React, TypeScript, Node.js, PostgreSQL, and cloud infrastructure. We pick the right tools for the job, not the trendiest ones.",
    },
    {
      question: "Can you work with my existing systems?",
      answer:
        "Yes. We build around what you already use—CRMs, calendars, payment systems, and internal tools. Integration is a core part of every project.",
    },
  ],
  cta: {
    heading: "Ready to build the tools your business actually needs?",
  },
};
