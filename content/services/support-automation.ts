import { IndustryContent } from "@/lib/industry-content";

export const supportAutomationContent: IndustryContent = {
  slug: "support-automation",
  name: "Support Automation",
  hero: {
    headline: "Your Customers Get Answers.\nNot Hold Music.",
    description:
      "AI support agents that resolve tier-1 issues instantly, route complex problems to the right team, and keep response times under a minute—across every channel.",
  },
  useCases: [
    {
      title: "Tier-1 Resolution",
      description:
        "Common questions answered instantly. Password resets, order status, billing questions, and how-to guides—handled without a human in the loop.",
      gradient: "from-sky-100 via-blue-50 to-white",
    },
    {
      title: "Smart Routing",
      description:
        "Issues that need a human get categorized, prioritized, and routed to the right team—with full context attached. No repetition for the customer.",
      gradient: "from-gray-100 via-gray-50 to-white",
    },
    {
      title: "Multi-Channel Support",
      description:
        "Phone, email, chat, and SMS—all handled by the same AI agents with consistent quality. Customers get help wherever they reach out.",
      gradient: "from-purple-200 via-pink-100 to-blue-100",
    },
  ],
  voiceAgents: {
    label: "Faster Resolution",
    heading: "Scale Support Without Scaling Headcount",
    description:
      "Most support teams are buried in repetitive tickets. Kenstera handles the volume—resolving common issues instantly and escalating the rest with full context. Your team focuses on problems that actually need them.",
  },
  multimodal: {
    heading:
      "Kenstera support agents resolve, route, and escalate across every channel your customers use",
    features: [
      {
        title: "Instant resolution",
        description:
          "AI agents trained on your knowledge base answer common questions in seconds. Accurate, consistent, and available 24/7—no ticket queue required.",
      },
      {
        title: "Contextual escalation",
        description:
          "When an issue needs a human, the agent collects details, categorizes the problem, and routes it to the right team—with full conversation history attached.",
      },
      {
        title: "Proactive outreach",
        description:
          "Detect issues before customers report them. Service disruptions, billing anomalies, and account changes trigger proactive notifications automatically.",
      },
    ],
  },
  workflows: {
    heading:
      "Automated triage, routing, and resolution with built-in quality controls",
    features: [
      {
        title: "Ticket triage & categorization",
        description:
          "Incoming tickets automatically categorized by issue type, urgency, and customer segment. Priority issues escalated immediately. Routine requests resolved by AI.",
      },
      {
        title: "Knowledge base learning",
        description:
          "AI agents improve over time as your knowledge base grows. New articles, resolved tickets, and team corrections feed back into better future responses.",
      },
      {
        title: "SLA monitoring & alerts",
        description:
          "Real-time tracking of response times, resolution rates, and SLA compliance. Alerts fire before breaches happen, not after.",
      },
    ],
  },
  customizable: {
    heading: "Your support process, your tone, your escalation rules",
    features: [
      {
        title: "Brand-consistent responses",
        description:
          "AI agents match your tone, terminology, and communication style. Responses feel like your team wrote them—because you defined the voice.",
      },
      {
        title: "Custom escalation paths",
        description:
          "Define exactly when and how issues escalate. By category, urgency, customer tier, or any custom rule. Different products can have different paths.",
      },
      {
        title: "Compliance & audit trail",
        description:
          "Every interaction logged with full context. Data retention, access controls, and compliance rules configured to your requirements.",
      },
    ],
  },
  integrations: {
    heading: "Connects to your helpdesk and support tools",
    description:
      "Your ticketing system, knowledge base, CRM, and communication channels. Built for support workflows, not generic automation.",
    additionalText: "And hundreds more via APIs or MCPs.",
    items: [
      "Zendesk",
      "Freshdesk",
      "Intercom",
      "HubSpot",
      "Salesforce",
      "Slack",
      "Twilio",
      "Vonage",
      "n8n",
    ],
  },
  gettingStarted: {
    heading: "Resolving tickets within a week of setup",
    description:
      "We connect your knowledge base, configure triage rules, set up escalation paths, and test across channels—so your AI support agents start handling volume immediately.",
  },
  faqs: [
    {
      question: "What percentage of tickets can AI resolve?",
      answer:
        "It depends on your support mix, but most businesses see 40–60% of tier-1 tickets resolved without human involvement. The rate improves as the knowledge base grows.",
    },
    {
      question: "Will customers know they're talking to AI?",
      answer:
        "That's your call. You can disclose AI involvement upfront, or let the conversation feel seamless. Either way, escalation to a human is always available.",
    },
    {
      question: "What happens when the AI can't resolve an issue?",
      answer:
        "It collects all relevant details, categorizes the issue, and routes it to the right team member—with full context. The customer never has to repeat themselves.",
    },
    {
      question: "Can it handle multiple languages?",
      answer:
        "Yes. Kenstera support agents can respond in the customer's language, with translations and tone-matching handled automatically.",
    },
    {
      question: "How does it learn our products and processes?",
      answer:
        "We ingest your knowledge base, help articles, past tickets, and internal docs during setup. Ongoing corrections and new content are incorporated automatically.",
    },
  ],
  cta: {
    heading: "Ready to resolve tickets faster—without hiring?",
  },
};
