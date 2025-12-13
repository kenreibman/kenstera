import { SectionHeader } from "@/components/SectionHeader";
import { PricingCards, Plan } from "@/components/PricingCards";
import { Zap, Sparkles, Crown } from "lucide-react";

const FEATURED_PLANS: Plan[] = [
  {
    id: "seo",
    name: "SEO",
    icon: <Sparkles className="h-4 w-4 text-purple-300" />,
    description:
      "Search Engine Optimization Rankings, Boost your online presence and leads.",
    startingAt: "$500",
    startingSuffix: "/month",
    cta: {
      type: "schedule",
      label: "Schedule a Call",
      calLink: "kenstera/30min"
    },
    features: [
      "Discovery & strategy call",
      "1-3 page marketing site or landing page",
      "Responsive, mobile-first design",
      "Basic on-page SEO setup",
      "Launch support & handoff",
    ],
  },
  {
    id: "website",
    name: "Website",
    icon: <Zap className="h-4 w-4 text-purple-300" />,
    badge: "Most popular",
    description:
      "For businesses that want a high-quality site, built to scale.",
    startingAt: "$3500",
    startingSuffix: "/project",
    featured: true,
    cta: {
      type: "schedule",
      label: "Schedule a Call",
      calLink: "kenstera/30min"
    },
    features: [
      "Full website design up to 15 pages",
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
    icon: <Crown className="h-4 w-4 text-purple-300" />,
    description:
      "Marketing, web hosting, maintenance and more.",
    startingAt: "$99",
    startingSuffix: "/month",
    cta: {
      type: "schedule",
      label: "Schedule a Call",
      calLink: "kenstera/30min"
    },
    features: [
      "Priority access & dedicated contact",
      "Ongoing design & dev iterations",
      "A/B testing & CRO support",
      "Performance & SEO improvements",
      "Roadmap planning each quarter",
    ],
  },
];

export function Pricing() {
  return (
    <section className="relative w-full bg-black px-4 py-20 md:py-28">
      <div className="mx-auto max-w-[1000px]">
        <SectionHeader
          eyebrow="Pricing"
          title={
            <>
              Websites that pay for themselves,
              <br />
              priced for where you are now.
            </>
          }
          subtitle={
            <>
              Choose a starting point that fits your needs. Every project
              includes strategy, thoughtful design, and clean implementation.
            </>
          }
          align="center"
        />

        <PricingCards plans={FEATURED_PLANS} />
      </div>
    </section>
  );
}
