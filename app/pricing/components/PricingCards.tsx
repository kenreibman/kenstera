import Link from "next/link";
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
    price: "$830",
    priceSuffix: "per month",
    description: "For starter businesses looking to automate lead engagement.",
    cta: {
      label: "Choose Scale",
      href: "/contact",
    },
    features: [
      "Standard TTS voices",
      "Basic NLU capabilities",
      "Basic analytics dashboard",
    ],
  },
  {
    name: "Business",
    price: "$1820",
    priceSuffix: "per month",
    description: "For businesses with high volume leads and advanced needs.",
    cta: {
      label: "Choose Business",
      href: "/contact",
    },
    inheritFrom: "Scale",
    features: [
      "Low-latency TTS voices",
      "Advanced NLU capabilities",
      "Multi-channel support (SMS, email, chat)",
      "CRM integration",
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
      "Custom terms & assurance around DPA/SLAs",
      "Custom SSO",
      "Quarterly roadmap planning",
      "Priority support",
    ],
  },
];

function PricingCard({ tier, highlighted }: { tier: PricingTier; highlighted: boolean }) {
  const isCustom = tier.price === "Custom pricing";

  return (
    <article
      className={`flex flex-col rounded-2xl p-2 ${highlighted ? "bg-surface-2" : "bg-surface"}`}
    >
      <div className="ring-hairline flex flex-1 flex-col rounded-xl bg-white p-6">
        <h3 className="text-[16px] text-black">{tier.name}</h3>
        <p className="mt-1 text-[14px] leading-[1.5] text-subtle">{tier.description}</p>

        <div className="mt-6 flex items-baseline gap-1.5">
          <span className={`font-display font-light tracking-[-0.02em] text-black ${isCustom ? "text-[28px]" : "text-[40px]"}`}>
            {tier.price}
          </span>
          {tier.priceSuffix && <span className="text-[14px] text-subtle">{tier.priceSuffix}</span>}
        </div>

        <Link href={tier.cta.href} className={`${buttonClass(highlighted ? "primary" : "secondary")} mt-6 w-full`}>
          {tier.cta.label}
        </Link>

        <div className="mt-6 border-t border-hairline pt-5">
          {tier.inheritFrom && (
            <p className="mb-3 text-[13px] text-subtle">Everything in {tier.inheritFrom}, plus</p>
          )}
          <ul className="space-y-2.5">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-[14px] text-black/80">
                <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-black/30" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {tier.bottomLabel && (
          <p className="mt-6 border-t border-hairline pt-4 text-[14px]">
            <span className="text-black">{tier.bottomValue}</span>
            <span className="ml-1 text-subtle">{tier.bottomLabel}</span>
          </p>
        )}
      </div>
    </article>
  );
}

export function PricingCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {tiers.map((tier, i) => (
        <PricingCard key={tier.name} tier={tier} highlighted={i === 1} />
      ))}
    </div>
  );
}
