import { IndustryContent } from "@/lib/industry-content";

export const realEstateContent: IndustryContent = {
  slug: "real-estate",
  name: "Real Estate",
  hero: {
    headline: "AI Voice Agents\nfor Real Estate",
    description:
      "Every lead answered. Every showing booked. Kenstera captures inquiries from Zillow, Realtor.com, and your website—qualifying leads and booking showings even when you're at a closing.",
  },
  useCases: [
    {
      title: "Lead Qualification",
      description:
        "automated with voice agents that capture budget, timeline, pre-approval status, and motivation in real-time.",
      gradient: "from-orange-100 via-amber-50 to-white",
    },
    {
      title: "Showing Scheduling",
      description:
        "handled instantly by agents that check your calendar and book qualified buyers without the back-and-forth.",
      gradient: "from-sky-100 via-blue-50 to-white",
    },
    {
      title: "Listing Inquiries",
      description:
        "managed through intelligent agents that answer property questions, share details, and capture serious buyers.",
      gradient: "from-rose-100 via-pink-50 to-white",
    },
  ],
  voiceAgents: {
    label: "Instant Response",
    heading: "Real Estate Voice Agents",
    description:
      "78% of buyers choose the first agent to reply. Kenstera responds to leads instantly—from Zillow, Realtor.com, your website, and more—so you never lose a deal to a faster competitor.",
  },
  multimodal: {
    heading:
      "From inquiry to showing — handled automatically",
    features: [
      {
        title: "Qualify buyers and sellers instantly",
        description:
          "Smart questions determine budget, timeline, pre-approval status, and motivation. Know exactly who's ready to transact before you invest your time.",
      },
      {
        title: "Integrate with your real estate tools",
        description:
          "Connect to Follow Up Boss, kvCORE, BoomTown, and other CRMs. Leads sync automatically with full qualification details.",
      },
      {
        title: "Multi-source lead capture",
        description:
          "Zillow, Realtor.com, Redfin, your website, Facebook ads—Kenstera captures leads from every source and responds in seconds.",
      },
    ],
  },
  workflows: {
    heading:
      "Build lead workflows with smart routing and automated follow-up",
    features: [
      {
        title: "Lead routing and round-robin",
        description:
          "Route leads by area, price range, or property type. Set up round-robin distribution for teams. Ensure every lead gets to the right agent.",
      },
      {
        title: "Automated showing coordination",
        description:
          "Qualified leads book showings on your calendar based on availability. Confirmation texts and reminders reduce no-shows.",
      },
      {
        title: "Performance analytics",
        description:
          "Track lead sources, response times, and conversion rates. See which marketing channels deliver the best ROI.",
      },
    ],
  },
  customizable: {
    heading: "Tailored to your market and client base",
    features: [
      {
        title: "Train on your listings and market expertise",
        description:
          "Upload your listings, neighborhood info, and market data. Agents provide accurate answers about properties and areas you serve.",
      },
      {
        title: "Friendly, professional voice",
        description:
          "Choose voice profiles that build rapport and trust. Multilingual support to serve diverse buyer populations.",
      },
      {
        title: "Deep CRM integration",
        description:
          "Two-way sync with Follow Up Boss, kvCORE, LionDesk, and more. Leads, notes, and activities flow automatically.",
      },
    ],
  },
  integrations: {
    heading:
      "Integrate with the real estate tools you already use",
    description:
      "Connect agents to your CRM, calendar, listing platforms, and communication tools. Enterprise-grade integrations with leading real estate technology.",
    additionalText: "Plus Zillow, Realtor.com, and all major lead sources.",
    items: [
      "Follow Up Boss",
      "kvCORE",
      "BoomTown",
      "LionDesk",
      "Calendly",
      "Google Calendar",
      "Twilio",
      "Zillow",
      "Realtor.com",
    ],
  },
  gettingStarted: {
    heading: "Go live this week",
    description:
      "Our real estate team helps you connect lead sources, integrate your CRM, and configure qualification criteria—so you can start converting more leads immediately.",
  },
  faqs: [
    {
      question: "What lead sources does Kenstera integrate with?",
      answer:
        "Kenstera integrates with Zillow, Realtor.com, Redfin, Homes.com, your website, Facebook ads, Google ads, and more.",
    },
    {
      question: "How quickly does Kenstera respond to leads?",
      answer:
        "Instantly—within seconds. Whether it's a Zillow inquiry at 2am or a website form during a showing, leads get an immediate response.",
    },
    {
      question: "Can I customize qualification questions?",
      answer:
        "Yes. Control exactly what's collected—budget, timeline, pre-approval, preferred neighborhoods, property type, and more.",
    },
    {
      question: "Does this work for teams?",
      answer:
        "Yes. Individual agents get their own dashboard, teams can set up lead routing, round-robin distribution, and shared calendars.",
    },
    {
      question: "How does showing scheduling work?",
      answer:
        "Qualified leads book showings on your calendar based on your availability. You set hours, buffer times, and blackout dates. Reminders go to both parties.",
    },
  ],
  cta: {
    heading: "Stop losing leads to faster agents",
  },
};
