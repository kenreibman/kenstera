import Link from "next/link";
import { Check } from "lucide-react";
import { buttonClass } from "@/components/el/ui";

export type PricingTier = {
  name: string;
  price: string;
  priceSuffix: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  inheritFrom?: string;
  features: string[];
  bottomLabel?: string;
  bottomValue?: string;
};

export const tiers: PricingTier[] = [
  {
    name: "Scale",
    price: "$599",
    priceSuffix: "per month",
    description: "Your online foundation: a website that converts, plus the systems that catch every lead and earn the reviews.",
    cta: {
      label: "Choose Scale",
      href: "/contact",
    },
    features: [
      "A custom website, designed and built around your business to turn visitors into customers",
      "Missed-call text back, so a call you miss gets an instant reply instead of going to the next shop",
      "Local SEO: keyword research, meta tags, fast load times, and regular updates so you can be found on Google",
      "An automatic review pipeline that asks your happy customers for 5-star reviews",
    ],
  },
  {
    name: "Business",
    price: "$1820",
    priceSuffix: "per month",
    description: "For businesses with a steady flow of leads that want every one answered, followed up, and won back.",
    cta: {
      label: "Choose Business",
      href: "/contact",
    },
    inheritFrom: "Scale",
    features: [
      "A voice receptionist that answers the calls you can't, asks what's going on, and gets you the details",
      "Automated follow-up sequences by text and email, so no lead goes quiet",
      "Re-marketing campaigns that bring past customers back",
      "Targeted paid and email campaigns that drive qualified demand",
      "A 24/7 website chat that answers customer questions",
      "CRM and calendar integration",
    ],
  },
  {
    name: "Partner",
    price: "Custom pricing",
    priceSuffix: "",
    description: "Ongoing marketing, hosting, maintenance and more.",
    cta: {
      label: "Contact us",
      href: "/contact",
    },
    inheritFrom: "Business",
    features: [
      "Custom software, integrations, and workflow automation built for your operations",
      "A/B tested pages, so your website keeps converting better",
      "Ongoing content and blogging to grow your search presence",
      "Hosting and maintenance, handled for you",
      "Quarterly roadmap planning",
      "Priority support",
    ],
  },
];

const DOTS =
  "repeating-radial-gradient(circle, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 6px)";

function Dots() {
  return <div aria-hidden className="h-[2px] w-full" style={{ backgroundImage: DOTS, backgroundSize: "6px 100%" }} />;
}

/**
 * One plan as a full-height column, the way elevenlabs.io lays out its pricing: a surface card with the
 * plan name on top and the price at the bottom, a black pill button, then "Everything in X, plus" over
 * dotted feature rows. The highlighted plan gets a painted gradient card.
 */
function PricingColumn({ tier, highlighted }: { tier: PricingTier; highlighted: boolean }) {
  const isCustom = tier.price === "Custom pricing";
  return (
    <article className="flex flex-col border-b border-black/5 px-4 pb-8 pt-4 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
      <div
        className={`relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl p-5 ${
          highlighted ? "grad g-iris text-white" : "bg-surface text-black"
        }`}
      >
        <div>
          <h3 className="text-[28px] font-light leading-8 tracking-[-0.28px]">{tier.name}</h3>
          <p className={`mt-2 max-w-[260px] text-[14px] leading-[19.6px] ${highlighted ? "text-white/85" : "text-subtle"}`}>
            {tier.description}
          </p>
        </div>
        <p className="flex items-baseline gap-1.5">
          <span className={`font-display font-light tracking-[-0.02em] ${isCustom ? "text-[28px]" : "text-[36px]"}`}>{tier.price}</span>
          {tier.priceSuffix && (
            <>
              {" "}
              <span className={`text-[14px] ${highlighted ? "text-white/85" : "text-subtle"}`}>{tier.priceSuffix}</span>
            </>
          )}
        </p>
        {!highlighted && (
          <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.075)]" />
        )}
      </div>

      <Link href={tier.cta.href} className={`${buttonClass("primary", "md")} mt-4 w-full`}>
        {tier.cta.label}
      </Link>

      <div className="mt-8 flex-1">
        <p className="pb-3 text-[14px] leading-[18px] text-subtle">
          {tier.inheritFrom ? `Everything in ${tier.inheritFrom}, plus` : "Includes"}
        </p>
        <Dots />
        <ul>
          {tier.features.map((feature) => (
            <li key={feature}>
              <div className="flex items-start gap-3 py-3.5 text-[15px] leading-[22px] text-black">
                <Check className="mt-[3px] h-4 w-4 flex-none text-[#a59f97]" strokeWidth={1.8} aria-hidden="true" />
                {feature}
              </div>
              <Dots />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function PricingCards() {
  return (
    <div className="grid lg:grid-cols-3">
      {tiers.map((tier, i) => (
        <PricingColumn key={tier.name} tier={tier} highlighted={i === 1} />
      ))}
    </div>
  );
}
