import { IndustryContent } from "@/lib/industry-content";

export const intakeAndSchedulingContent: IndustryContent = {
  slug: "intake-and-scheduling",
  name: "Intake & Scheduling",
  hero: {
    headline: "Never Miss Another Lead.\nEver.",
    description:
      "Kenstera answers every call, qualifies every lead, and books appointments 24/7 by phone, web, and chat. Your calendar fills while you sleep.",
  },
  useCases: [
    {
      title: "After-Hours Coverage",
      description:
        "Nights, weekends, and holidays. Every inquiry gets answered in seconds. No voicemail, no delayed callbacks. Leads that call at 2 AM get the same experience as 2 PM.",
      gradient: "from-sky-100 via-blue-50 to-white",
    },
    {
      title: "Instant Booking",
      description:
        "Qualified leads book directly onto your calendar without back-and-forth. Real-time availability, confirmation texts, and calendar invites, all handled automatically.",
      gradient: "from-gray-100 via-gray-50 to-white",
    },
    {
      title: "Follow-Up Sequences",
      description:
        "Missed call? Text sent in 10 seconds. No-show? Automatic reschedule outreach. Multi-touch follow-up via text, email, and call keeps every lead warm.",
      gradient: "from-purple-200 via-pink-100 to-blue-100",
    },
  ],
  voiceAgents: {
    label: "24/7 Lead Response",
    heading: "Close the Speed-to-Lead Gap",
    description:
      "78% of customers buy from the first business that responds. Kenstera makes sure that's you, every single time. Instant answer, instant qualification, instant booking. No staffing headaches, no missed opportunities.",
  },
  multimodal: {
    heading:
      "Kenstera captures, qualifies, and books leads across every channel your customers use",
    features: [
      {
        title: "Lead qualification",
        description:
          "Custom screening questions tailored to your business. Qualified leads go straight to your calendar or get warm-transferred. Non-fits are handled politely.",
      },
      {
        title: "Smart routing",
        description:
          "High-priority leads get warm-transferred to your team immediately. Standard leads book appointments automatically. After-hours leads enter follow-up sequences.",
      },
      {
        title: "Multi-channel capture",
        description:
          "Phone calls, web forms, live chat, and SMS. Wherever a lead reaches out, they get an instant response and a path to your calendar.",
      },
    ],
  },
  workflows: {
    heading:
      "Automated follow-up sequences that turn missed calls into booked appointments",
    features: [
      {
        title: "Speed-to-lead sequences",
        description:
          "Text within 10 seconds of a missed call. Callback attempts at 1 min, 5 min, 30 min, and next day. Persistence that converts without annoying.",
      },
      {
        title: "Appointment reminders",
        description:
          "Automated reminders at 24 hours, 2 hours, and 30 minutes before the appointment. No-shows get automatic reschedule outreach.",
      },
      {
        title: "Re-engagement campaigns",
        description:
          "Leads that didn't book get periodic check-ins over days and weeks. When they're ready, the booking path is one tap away.",
      },
    ],
  },
  customizable: {
    heading: "Your intake process, your rules, enforced automatically",
    features: [
      {
        title: "Custom qualification criteria",
        description:
          "Define exactly what makes a qualified lead for your business. Set different criteria for different service lines. Update anytime without rebuilding.",
      },
      {
        title: "Compliant call handling",
        description:
          "Call disclosure scripts, recording consent logic, and data retention policies configured to your state and industry requirements.",
      },
      {
        title: "CRM & calendar sync",
        description:
          "Two-way sync with your CRM and calendar. New leads, booked appointments, and call notes appear in your system automatically.",
      },
    ],
  },
  integrations: {
    heading: "Connects to the tools your intake already runs on",
    description:
      "Your CRM, calendar, phone system, and communication tools. Built for lead response workflows, not generic automation.",
    additionalText: "And hundreds more via APIs or MCPs.",
    items: [
      "Pipedrive",
      "HubSpot",
      "Salesforce",
      "Cal.com",
      "Google Calendar",
      "Twilio",
      "Vonage",
      "Stripe",
      "n8n",
    ],
  },
  gettingStarted: {
    heading: "Live in under a week",
    description:
      "We configure your qualification rules, connect your calendar and CRM, set up follow-up sequences, and test everything so you start catching leads this week, not next month.",
  },
  faqs: [
    {
      question: "How fast does it respond to new leads?",
      answer:
        "Under 3 seconds. Phone calls answered on first ring. Web form submissions trigger immediate callback or text.",
    },
    {
      question: "Can it handle different types of appointments?",
      answer:
        "Yes. You can configure multiple appointment types with different durations, availability windows, and qualification criteria.",
    },
    {
      question: "What happens to leads that don't qualify?",
      answer:
        "They're declined politely. You can optionally route them to a partner, send a referral link, or log them for future outreach.",
    },
    {
      question: "Does it work with my existing phone number?",
      answer:
        "Yes. We can forward your existing number to Kenstera for after-hours coverage, or handle all calls 24/7. Your choice.",
    },
    {
      question: "How do I know it's working?",
      answer:
        "Real-time dashboard showing calls answered, leads qualified, appointments booked, and follow-up status. Weekly summary reports delivered to your inbox.",
    },
  ],
  cta: {
    heading: "Stop losing leads to slow response",
  },
};
