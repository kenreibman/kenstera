// Pricing.tsx

import { PricingCards, Plan } from "@/components/PricingCards";

const FEATURED_PLANS: Plan[] = [
  {
    id: "seo",
    name: "SEO",
    icon: "sparkles",
    description:
      "Search Engine Optimization Rankings, Boost your online presence and leads.",
    startingAt: "$750",
    startingSuffix: "/month",
    cta: {
      type: "link",
      label: "Schedule a Call",
      href: "https://cal.com/kenstera/30min",
    },
    features: [
      "Discovery & strategy call",
      "1-3 page marketing site or landing page",
      "Responsive, mobile-first design",
      "Professional SEO setup",
      "Support and Analytics",
    ],
  },
  {
    id: "website",
    name: "Development",
    icon: "zap",
    badge: "Most popular",
    description: "For businesses that want a high-quality site, built to scale.",
    startingAt: "$4500",
    startingSuffix: "/project",
    featured: true,
    cta: {
      type: "link",
      label: "Schedule a Call",
      href: "https://cal.com/kenstera/30min",
    },
    features: [
      "Full website design",
      "SEO Ready",
      "Custom-designed homepage",
      "CMS Integration",
      "Analytics & conversion tracking",
      "Website revisions",
    ],
  },
  {
    id: "partner",
    name: "Partner",
    icon: "crown",
    description: "Marketing, web hosting, maintenance and more.",
    startingAt: "$149",
    startingSuffix: "/month",
    cta: {
      type: "link",
      label: "Schedule a Call",
      href: "https://cal.com/kenstera/30min",
    },
    features: [
      "Priority access & dedicated contact",
      "Ongoing design & dev iterations",
      "A/B testing",
      "Performance & SEO improvements",
      "Roadmap planning each quarter",
    ],
  },
];

export function Pricing() {
  return (
    <section
      className="relative w-full bg-black px-4 py-20 md:py-28"
      id="pricing"
    >
      <div className="mx-auto max-w-[1000px]">
        <h2 className="text-left text-5xl sm:text-7xl font-semibold tracking-tight text-white">
          Pricing
        </h2>

        <PricingCards plans={FEATURED_PLANS} />
      </div>
    </section>
  );
}
