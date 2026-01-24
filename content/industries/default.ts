import { IndustryContent } from "@/lib/industry-content";

export const defaultContent: IndustryContent = {
  slug: "default",
  name: "Industries",
  hero: {
    headline: "The conversational\nagents platform",
    description:
      "Build and deploy AI-powered voice agents that handle complex conversations with human-like understanding and empathy, transforming customer experiences across industries.",
  },
  useCases: [
    {
      title: "Customer Support",
      description:
        "now powered by always-on, empathetic voice agents that resolve issues instantly, reduce wait times, and boost satisfaction.",
      gradient: "from-gray-100 via-gray-50 to-white",
    },
    {
      title: "Inbound Scheduling",
      description:
        "automated through voice agents that coordinate calendars and handle booking requests with ease.",
      gradient: "from-sky-100 via-blue-50 to-white",
    },
    {
      title: "Learning & Development",
      description:
        "powered by voice-driven roleplay agents that simulate real-world scenarios and build employee skills.",
      gradient: "from-purple-200 via-pink-100 to-blue-100",
    },
  ],
  voiceAgents: {
    label: "Industry-leading",
    heading: "Voice Agents",
    description:
      "Kenstera Agents are intelligent, real-time AI agents that talk, type, and take action. Resolve customer issues, automate tasks, and deliver accurate answers — all grounded in your data, tailored to your workflows, and ready to deploy at scale.",
  },
  multimodal: {
    heading:
      "Kenstera Agents resolve issues, deliver answers, and take action - anytime, anywhere",
    features: [
      {
        title: "Conversational agents that speak, read, and see",
        description:
          "Multimodal by design, Kenstera Agents understand spoken or written inputs, retrieve the right answers, and respond naturally in real time. Agents listen, read, and interact just like a human would, across voice and chat.",
      },
      {
        title: "Take action with external tool calls",
        description:
          "Connect your agents to external APIs and tools. Schedule appointments, look up information, process payments, and more — all within the conversation flow.",
      },
      {
        title: "Deploy anywhere your customers are",
        description:
          "Embed agents on your website, mobile app, phone system, or messaging platforms. Meet customers where they are with consistent, intelligent support.",
      },
    ],
  },
  workflows: {
    heading:
      "Create multi-agent workflows with strict guardrails and track results with in depth testing and analytics",
    features: [
      {
        title: "Build multi-agent workflows",
        description:
          "Design rich conversational flows using intuitive visual tools. Combine scripted steps with dynamic agents, customize behavior at each stage, and define exactly how your AI responds, across both voice and chat.",
      },
      {
        title: "Test guardrails",
        description:
          "Set up automated testing to ensure your agents stay on track. Define boundaries, test edge cases, and validate responses before going live.",
      },
      {
        title: "Monitor performance",
        description:
          "Track key metrics, analyze conversation outcomes, and continuously improve your agents with detailed analytics and insights.",
      },
    ],
  },
  customizable: {
    heading: "Fully customizable to your brand and systems",
    features: [
      {
        title:
          "Agents that deeply understand your business, powered by your knowledge base",
        description:
          "Connect internal documents, FAQs, and URLs in just a few clicks. With built-in Retrieval-Augmented Generation (RAG), agents provide accurate, real-time answers grounded in your own content, automatically reindexed as it changes.",
      },
      {
        title: "Custom voices & tailored personalities",
        description:
          "Create unique voice profiles that match your brand identity. Fine-tune tone, pace, and personality to deliver consistent experiences across every interaction.",
      },
      {
        title: "Tight integration with your stack",
        description:
          "Connect seamlessly with your CRM, helpdesk, calendar, and other tools. Agents can read and write data, trigger workflows, and keep everything in sync.",
      },
    ],
  },
  integrations: {
    heading:
      "Integrate seamlessly with your tech stack and the tools you already use",
    description:
      "Connect agents to your CRM, support desk, calendar, payment system, or telephony provider. Whether it's Salesforce, Stripe, Zendesk, or Twilio, integrations work out of the box with minimal setup",
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
    heading: "Start in days, not months",
    description:
      "Get started easily with minimal setup and hands-on support to explore what Conversational Agents can unlock for your business.",
  },
  faqs: [
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
      question:
        "How can I make and receive phone calls with Conversational AI?",
      answer:
        "Kenstera provides telephony integration out of the box. You can provision phone numbers, configure inbound call routing, and enable outbound calling capabilities for your agents.",
    },
  ],
  cta: {
    heading: "The most realistic voice AI platform",
  },
};
