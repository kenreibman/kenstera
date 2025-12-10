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
    startingAt: "$850",
    startingSuffix: "/month",
    ctaLabel: "Choose this plan",
    ctaHref: "",
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
    startingAt: "$1500",
    startingSuffix: "/project",
    featured: true,
    ctaLabel: "Choose this plan",
    ctaHref: "",
    features: [
      "Full-site redesign (up to ~10 pages)",
      "Conversion-focused UI and UX",
      "Blog / CMS integration",
      "Analytics & conversion tracking setup",
      "30 days of post-launch support",
    ],
  },
  {
    id: "partner",
    name: "Partner",
    icon: <Crown className="h-4 w-4 text-purple-300" />,
    description:
      "Marketing, web hosting, maintenance and more.",
    startingAt: "$700",
    startingSuffix: "/month",
    ctaLabel: "Schedule a call",
    ctaHref: "/contact",
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
              Choose a starting point that fits your stage. Every project
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
