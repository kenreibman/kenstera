import { IndustryContent } from "@/lib/industry-content";

export const lawContent: IndustryContent = {
  slug: "law",
  name: "Personal Injury",
  hero: {
    headline: "Stop Losing Cases\nAfter the Lead Comes In",
    description:
      "Kenstera installs 24/7 intake coverage that answers fast, qualifies leads, books consults, and follows up relentlessly, so more of your paid leads turn into signed cases.",
  },
  useCases: [
    {
      title: "24/7 Intake Coverage",
      description:
        "after-hours and overflow handled instantly. No more missed calls at 2am or during trial. Every inquiry gets a response in seconds.",
      gradient: "from-indigo-100 via-purple-50 to-white",
    },
    {
      title: "Qualification + Booking",
      description:
        "incident date, injury type, treatment status, liability signals captured. Qualified leads routed to your calendar or warm-transferred immediately.",
      gradient: "from-sky-100 via-blue-50 to-white",
    },
    {
      title: "Follow-up + No-Show Prevention",
      description:
        "multi-touch sequences via text, email, and call. Show-up reminders before consultations. Leads never go cold.",
      gradient: "from-emerald-100 via-teal-50 to-white",
    },
  ],
  voiceAgents: {
    label: "More Signed Cases",
    heading: "Fix the Four Leak Points",
    description:
      "78% of claimants hire the first firm to respond. Kenstera fixes the four places firms lose cases: after-hours coverage, speed-to-lead, qualification/booking, and follow-up. The result: higher intake conversion without adding staff.",
  },
  multimodal: {
    heading: "From first ring to signed retainer, nothing slips through",
    features: [
      {
        title: "PI-specific qualification",
        description:
          "Incident date, state, injury severity, treatment status, police report, at-fault party, insurance carrier, representation status, and vehicle type (trucking, rideshare, commercial). Non-fits declined politely with optional referral.",
      },
      {
        title: "Tiered routing based on case value",
        description:
          "High-value cases (trucking, catastrophic): warm transfer to your team in under 60 seconds. Good fits: book consult + send intake checklist. Not a fit: polite decline or referral partner handoff.",
      },
      {
        title: "Multi-channel capture, instant response",
        description:
          "Phone, web form, Google LSA, and chat. Wherever leads come from, Kenstera responds in seconds and starts qualification immediately.",
      },
    ],
  },
  workflows: {
    heading: "Automated sequences that sign more cases",
    features: [
      {
        title: "Speed-to-lead sequences",
        description:
          "Text within 10 seconds of missed call. Callback attempts at 1 min, 5 min, 30 min, and next day. Your leads hear from you before they call the next firm.",
      },
      {
        title: "Escalation for high-value cases",
        description:
          "Trucking, catastrophic injury, and wrongful death cases get warm-transferred to your team in under 60 seconds. Your best leads always reach a person immediately.",
      },
      {
        title: "Red-flag screening",
        description:
          "Shared fault, statute limitations, prior representation, and other red flags are flagged before you invest time in a consult.",
      },
    ],
  },
  customizable: {
    heading: "Configured for your firm's case criteria",
    features: [
      {
        title: "Your qualification rules enforced",
        description:
          "Set minimum case value thresholds, accepted injury types, geographic coverage, and statute of limitations rules. Every call is screened against your criteria.",
      },
      {
        title: "Compliant by design",
        description:
          "Call disclosure at start of conversation. Recording consent logic based on state. Minimal PHI collection. Configurable data retention. Built for PI intake compliance.",
      },
      {
        title: "Deep case management integration",
        description:
          "Two-way sync with Clio, Filevine, Litify, SmartAdvocate, and more. New matters created automatically with all qualification data attached.",
      },
    ],
  },
  integrations: {
    heading: "Connects to the tools you already use",
    description:
      "Your case management system, intake CRM, calendar, and communication tools. Enterprise-grade integrations built for personal injury workflows.",
    additionalText: "Plus custom integrations via APIs and webhooks.",
    items: [
      "Clio",
      "Filevine",
      "Litify",
      "SmartAdvocate",
      "CASEpeer",
      "Lawmatics",
      "Google Calendar",
      "Calendly",
      "Twilio",
    ],
  },
  gettingStarted: {
    heading: "Go live in days, not weeks",
    description:
      "We configure your qualification criteria, integrate with your case management system, and set up follow-up sequences, so you start signing more cases this week.",
  },
  faqs: [
    {
      question: "How fast does Kenstera respond to leads?",
      answer:
        "Instantly, under 3 seconds. Phone calls answered on first ring. Web forms trigger immediate callback. Text follow-up goes out within 10 seconds of a missed call.",
    },
    {
      question: "What happens with high-value cases like trucking or catastrophic injury?",
      answer:
        "High-value cases get warm-transferred to your team in under 60 seconds. The case value and priority are flagged before the transfer so your team is prepared.",
    },
    {
      question: "What happens to leads that don't qualify?",
      answer:
        "Non-qualifying leads are declined politely. Optionally, we route them to referral partners you specify, so you can still monetize cases outside your criteria.",
    },
    {
      question: "Is this software or a service?",
      answer:
        "Both. You get the system built and managed, plus the automation layer that runs it. If you already have staff answering, we integrate with them; if not, we cover after-hours and overflow.",
    },
    {
      question: "What exactly am I buying?",
      answer:
        "A working intake machine: 24/7 coverage (after-hours + overflow), lead capture + instant response, qualification + booking, follow-up + no-show reduction, and CRM integration + reporting so you see where cases leak.",
    },
  ],
  cta: {
    heading: "Stop losing cases to slow response times",
  },
};
