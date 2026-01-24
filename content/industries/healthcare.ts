import { IndustryContent } from "@/lib/industry-content";

export const healthcareContent: IndustryContent = {
  slug: "healthcare",
  name: "Healthcare",
  hero: {
    headline: "AI Voice Agents\nfor Healthcare",
    description:
      "Transform patient experiences with intelligent voice agents that handle scheduling, answer questions, and provide 24/7 support — all while maintaining HIPAA compliance.",
  },
  useCases: [
    {
      title: "Patient Intake",
      description:
        "streamlined with voice agents that collect information, verify insurance, and prepare patients before appointments.",
      gradient: "from-emerald-100 via-teal-50 to-white",
    },
    {
      title: "Appointment Scheduling",
      description:
        "automated through intelligent agents that coordinate with provider calendars and patient preferences in real-time.",
      gradient: "from-sky-100 via-blue-50 to-white",
    },
    {
      title: "Post-Care Follow-ups",
      description:
        "handled by empathetic agents that check on recovery, remind about medications, and escalate concerns to care teams.",
      gradient: "from-rose-100 via-pink-50 to-white",
    },
  ],
  voiceAgents: {
    label: "HIPAA-Compliant",
    heading: "Healthcare Voice Agents",
    description:
      "Kenstera Healthcare Agents understand medical terminology, maintain patient privacy, and integrate seamlessly with EHR systems. Reduce administrative burden while improving patient satisfaction scores.",
  },
  multimodal: {
    heading:
      "Agents that understand healthcare — from scheduling to symptom triage",
    features: [
      {
        title: "Medical-aware conversations",
        description:
          "Trained on healthcare terminology and protocols, our agents understand symptoms, medications, and procedures to provide accurate, helpful responses while knowing when to escalate to human staff.",
      },
      {
        title: "EHR and practice management integration",
        description:
          "Connect directly to Epic, Cerner, Athena, and other EHR systems. Agents can check schedules, update records, and trigger workflows without manual data entry.",
      },
      {
        title: "Multi-channel patient engagement",
        description:
          "Reach patients on their preferred channel — phone, text, patient portal, or mobile app. Consistent care coordination across every touchpoint.",
      },
    ],
  },
  workflows: {
    heading:
      "Build compliant workflows with audit trails and role-based access controls",
    features: [
      {
        title: "HIPAA-compliant by design",
        description:
          "Built-in safeguards ensure PHI is protected. Automatic audit logging, encryption at rest and in transit, and BAA agreements available for enterprise customers.",
      },
      {
        title: "Clinical escalation paths",
        description:
          "Define rules for when agents should transfer to nurses, physicians, or emergency services. Never miss a critical patient need.",
      },
      {
        title: "Performance analytics",
        description:
          "Track patient satisfaction, call resolution rates, and appointment conversion. Identify opportunities to improve care delivery.",
      },
    ],
  },
  customizable: {
    heading: "Tailored to your practice and patient population",
    features: [
      {
        title: "Train on your protocols and knowledge base",
        description:
          "Upload your practice guidelines, FAQs, and care instructions. Agents provide answers specific to your organization and specialties.",
      },
      {
        title: "Voices that put patients at ease",
        description:
          "Choose from calming, professional voice profiles or create custom voices that match your brand. Multilingual support for diverse patient populations.",
      },
      {
        title: "Deep integration with your health IT stack",
        description:
          "Connect to scheduling systems, patient portals, billing platforms, and communication tools. Automate end-to-end patient journeys.",
      },
    ],
  },
  integrations: {
    heading:
      "Integrate with the healthcare platforms you already use",
    description:
      "Connect agents to your EHR, practice management system, patient engagement platform, and communication tools. Enterprise-grade integrations with the leading healthcare IT vendors.",
    additionalText: "Plus custom integrations via HL7 FHIR and secure APIs.",
    items: [
      "Epic",
      "Cerner",
      "Athenahealth",
      "Salesforce Health",
      "Twilio",
      "Zoom",
      "Microsoft Teams",
      "Stripe",
      "Calendly",
    ],
  },
  gettingStarted: {
    heading: "Go live in weeks, not months",
    description:
      "Our healthcare implementation team helps you configure agents, integrate with your systems, and train your staff — with full HIPAA compliance from day one.",
  },
  faqs: [
    {
      question: "Is Kenstera HIPAA compliant?",
      answer:
        "Yes, Kenstera is fully HIPAA compliant. We provide Business Associate Agreements (BAA), encrypt all PHI at rest and in transit, maintain audit logs, and follow healthcare security best practices.",
    },
    {
      question: "Can agents integrate with our EHR system?",
      answer:
        "Yes, we have pre-built integrations with Epic, Cerner, Athenahealth, and other major EHR systems. Custom integrations are available via HL7 FHIR and secure APIs.",
    },
    {
      question: "How do agents handle medical emergencies?",
      answer:
        "Agents are trained to recognize emergency situations and immediately transfer to appropriate staff or provide emergency service information. You define the escalation rules based on your protocols.",
    },
    {
      question: "Can patients schedule appointments through the voice agent?",
      answer:
        "Yes, agents can check provider availability, book appointments, send confirmations, and add reminders — all integrated with your scheduling system.",
    },
    {
      question: "What languages do healthcare agents support?",
      answer:
        "Our healthcare agents support English, Spanish, and many other languages. Multilingual support helps you serve diverse patient populations effectively.",
    },
  ],
  cta: {
    heading: "Transform your patient experience with AI",
  },
};
