import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
      href: "/contact-sales",
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
      href: "/contact-sales",
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
      href: "/contact-sales",
    },
    inheritFrom: "Business",
    features: [
      "Custom terms & assurance around DPA/SLAs",
      "BAAs for HIPAA customers",
      "Custom SSO",
      "Quarterly roadmap planning",
      "Priority support",
    ],
  },
];

function PricingCard({ tier }: { tier: PricingTier }) {
  const isCustom = tier.price === "Custom pricing";

  return (
    <article className="group relative flex flex-col border border-neutral-200 bg-white transition-all duration-300 hover:border-neutral-300 hover:shadow-lg">
      {/* Header with hover gradient */}
      <div className="relative overflow-hidden px-6 pt-6 pb-4">
        {/* Gradient overlay on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, #f5e6d3 0%, #e8d4c4 25%, #d4b896 50%, #c9a67a 75%, #b8956a 100%)",
          }}
        />
        {/* Noise texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <h3 className="relative text-lg font-medium text-neutral-900">
          {tier.name}
        </h3>

        <div className="relative mt-3 flex items-baseline gap-1">
          <span
            className={`font-semibold text-neutral-900 ${isCustom ? "text-xl" : "text-3xl"}`}
          >
            {tier.price}
          </span>
          {tier.priceSuffix && (
            <span className="text-sm text-neutral-500">{tier.priceSuffix}</span>
          )}
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-6 py-4">
        <Link
          href={tier.cta.href}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          {tier.cta.label}
        </Link>
      </div>

      {/* Features */}
      <div className="flex-1 border-t border-neutral-100 px-6 py-4">
        {tier.inheritFrom && (
          <p className="mb-3 flex items-center gap-1 text-xs text-neutral-500">
            Everything in {tier.inheritFrom}, plus
            <ArrowUpRight className="h-3 w-3" />
          </p>
        )}

        <ul className="space-y-2.5">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm">
              <span className="text-neutral-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom section */}
      {tier.bottomLabel && (
        <div className="border-t border-neutral-100 px-6 py-4">
          <p className="text-sm">
            <span className="font-medium text-neutral-900">
              {tier.bottomValue}
            </span>
            <span className="ml-1 text-neutral-500">{tier.bottomLabel}</span>
          </p>
        </div>
      )}
    </article>
  );
}

export function PricingCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tiers.map((tier) => (
        <PricingCard key={tier.name} tier={tier} />
      ))}
    </div>
  );
}
