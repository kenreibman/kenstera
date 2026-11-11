// Single source of truth for site copy. Everything here is a statement Kenstera
// can stand behind — no invented clients, quotes, or numbers.

export const BOOKING_HREF = "/contact-sales";
export const CONTACT_EMAIL = "info@kenstera.com";

export type SystemId = "roots" | "stem" | "branches" | "leaves";

export interface System {
  id: SystemId;
  part: string; // plant anatomy
  latin: string; // specimen-label flourish
  title: string;
  summary: string;
  items: { name: string; detail: string }[];
}

export const SYSTEMS: System[] = [
  {
    id: "roots",
    part: "Roots",
    latin: "radix",
    title: "A foundation people can find",
    summary:
      "Before anything can be automated, customers have to land somewhere worth landing. We build the site and the search presence everything else grows from.",
    items: [
      {
        name: "Custom websites",
        detail:
          "Fast, hand-built sites designed to turn a visit into a call, a form, or a booking. Not a template with your logo on it.",
      },
      {
        name: "Local SEO",
        detail:
          "Keyword research, clean structure, performance, and regular updates, so the people already searching for what you do can find you.",
      },
      {
        name: "Managed for you",
        detail:
          "Hosting, updates, and monitoring stay with us after launch. You never get handed a codebase and a goodbye.",
      },
    ],
  },
  {
    id: "stem",
    part: "Stem",
    latin: "caulis",
    title: "Every inquiry answered",
    summary:
      "The stem carries everything upward. This is the layer that catches each call, form, and message, and replies before a competitor does.",
    items: [
      {
        name: "Missed-call text-back",
        detail:
          "When a call goes unanswered, the caller gets a text within seconds. The conversation keeps going while you finish the job in front of you.",
      },
      {
        name: "Instant lead follow-up",
        detail:
          "New inquiries get an immediate reply by text and email, then reminders until they book or say no.",
      },
      {
        name: "Booking & scheduling",
        detail:
          "Prospects pick a time themselves. It lands on the right calendar with the context your team needs.",
      },
    ],
  },
  {
    id: "branches",
    part: "Branches",
    latin: "ramus",
    title: "The busywork, automated",
    summary:
      "Branches are where a plant spreads its weight. We connect the tools you already use so data moves on its own and nobody retypes anything.",
    items: [
      {
        name: "Workflow automation",
        detail:
          "Data entry, approvals, notifications, and handoffs, turned into systems that run without someone remembering to run them.",
      },
      {
        name: "Integrations",
        detail:
          "CRM to billing, forms to calendar, helpdesk to chat. Your tools start behaving like one system.",
      },
      {
        name: "Internal tools",
        detail:
          "Dashboards, reporting, and admin tools that replace the spreadsheets quietly slowing your team down.",
      },
    ],
  },
  {
    id: "leaves",
    part: "Leaves",
    latin: "folium",
    title: "Reputation that compounds",
    summary:
      "Leaves are how a plant feeds itself. These systems turn finished work into reviews, repeat business, and new demand.",
    items: [
      {
        name: "Review funnels",
        detail:
          "Every finished job triggers a well-timed review request, so real customers build your reputation without anyone chasing them.",
      },
      {
        name: "Email & paid campaigns",
        detail:
          "Targeted campaigns that bring in qualified demand, measured against bookings rather than clicks.",
      },
      {
        name: "Re-marketing",
        detail:
          "Past customers hear from you at the right moments, automatically, so one job becomes several.",
      },
    ],
  },
];

export interface Leak {
  id: string;
  label: string;
  system: SystemId;
  steps: string[];
}

// The "garden planner": pick a problem, see the workflow that fixes it.
export const LEAKS: Leak[] = [
  {
    id: "missed-calls",
    label: "Calls go unanswered",
    system: "stem",
    steps: [
      "Call missed",
      "Text-back sent in seconds",
      "Conversation logged to the lead",
      "Booking link offered",
    ],
  },
  {
    id: "slow-follow-up",
    label: "Leads wait too long for a reply",
    system: "stem",
    steps: [
      "Form submitted",
      "Instant reply by text + email",
      "Routed to the right person",
      "Reminders until booked",
    ],
  },
  {
    id: "manual-entry",
    label: "We retype the same data everywhere",
    system: "branches",
    steps: [
      "Record created once",
      "Synced to CRM, billing, calendar",
      "Team notified in chat",
      "Dashboard updates itself",
    ],
  },
  {
    id: "few-reviews",
    label: "Good work never becomes a review",
    system: "leaves",
    steps: [
      "Job marked complete",
      "Review request, well timed",
      "One gentle reminder",
      "New review alerts the team",
    ],
  },
  {
    id: "invisible",
    label: "People can't find us online",
    system: "roots",
    steps: [
      "Someone searches nearby",
      "You show up in results",
      "A fast site answers them",
      "Clear path to call or book",
    ],
  },
  {
    id: "one-and-done",
    label: "Customers buy once and vanish",
    system: "leaves",
    steps: [
      "Job finished",
      "Added to a nurture list",
      "Timely check-in or offer",
      "Repeat booking",
    ],
  },
];

export const METHOD = [
  {
    step: "01",
    name: "Seed",
    title: "A 15-minute call",
    body: "We learn how your business actually runs and where it leaks. No deck, no pitch theatre.",
  },
  {
    step: "02",
    name: "Sprout",
    title: "A plan you can see",
    body: "You get a timeline and a quote before any work begins, and a working prototype before any major build.",
  },
  {
    step: "03",
    name: "Grow",
    title: "Launch in weeks",
    body: "We build, connect, and ship. Simple sites and integrations take a week or two; bigger systems are scoped individually.",
  },
  {
    step: "04",
    name: "Tend",
    title: "We keep it alive",
    body: "Hosting, monitoring, updates, and improvements stay with us. Systems get better with use instead of abandoned after delivery.",
  },
] as const;

// Commitments carried over from Kenstera's own published terms.
export const PROMISES = [
  {
    title: "No contracts",
    body: "Stay because it's working. Cancel anytime if it isn't.",
  },
  {
    title: "Priced to keep you",
    body: "We'd rather keep a client for ten years than overcharge one for ten months.",
  },
  {
    title: "A quote before work begins",
    body: "You see the timeline and the price first. No surprise invoices.",
  },
  {
    title: "Managed after launch",
    body: "We host it, watch it, and improve it. You run the business.",
  },
] as const;

/**
 * Client proof. Only real, verbatim material goes here.
 * Leave `quote` empty until the client has supplied their own words;
 * the Proof section adapts and never renders a placeholder quote.
 */
export const FEATURED_CLIENT = {
  name: "TheTickSuit",
  quote: "",
  person: "",
  role: "",
};

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "When will I start seeing results?",
    answer:
      "It depends on how long you've been in business, the quality of your work, what else you're doing to get customers, and whether you actually use the system. We build the foundation that makes growth repeatable. We don't perform miracles, and we'll tell you on the first call if we're not the right fit.",
  },
  {
    question: "How exactly does this grow my business?",
    answer:
      "Four ways. People can find you and your site converts them. Every inquiry gets an immediate reply, so fewer leads go cold. Finished work turns into reviews and repeat business automatically. And the repetitive tasks eating your team's week get handled by systems instead of people.",
  },
  {
    question: "Do I have to sign a contract?",
    answer:
      "No. We'd be sad to see you go, but you can cancel anytime.",
  },
  {
    question: "Why is your pricing lower than I expected?",
    answer:
      "Because our interest is keeping you for ten-plus years. The best way we know to do that is to price fairly and do excellent work, so you never have a reason to leave.",
  },
  {
    question: "Will you work with the tools we already use?",
    answer:
      "Yes. We build around your existing CRM, calendar, payment, and communication tools. Integration is a core part of every project, not an add-on.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We stay. Kenstera manages hosting, updates, monitoring, and ongoing improvements, so the system keeps getting better instead of slowly going stale.",
  },
];

export const CAPABILITIES = [
  "Custom websites",
  "Missed-call text-back",
  "Workflow automation",
  "Review funnels",
  "Local SEO",
  "Integrations",
  "Internal tools",
  "Campaigns",
  "Lead follow-up",
  "Re-marketing",
];
