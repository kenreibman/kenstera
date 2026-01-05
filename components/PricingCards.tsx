import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Zap, Sparkles, Crown } from "lucide-react";

export type PlanCTA = {
  type: "link";
  label: string;
  href: string;
};

export type PlanIcon = "sparkles" | "zap" | "crown";

export type Plan = {
  id: string;
  name: string;
  icon: PlanIcon;
  badge?: string;
  description: string;
  startingAt: string;
  startingSuffix: string;
  featured?: boolean;
  cta: PlanCTA;
  features: string[];
};

type PricingCardsProps = {
  plans: Plan[];
};

function PlanIcon({ name }: { name: PlanIcon }) {
  const cls = "h-4 w-4 text-purple-300";
  if (name === "sparkles") return <Sparkles className={cls} />;
  if (name === "zap") return <Zap className={cls} />;
  return <Crown className={cls} />;
}

export function PricingCards({ plans }: PricingCardsProps) {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => {
        const isFeatured = plan.featured;

        return (
          <article
            key={plan.id}
            className={[
              "flex flex-col border p-6 text-sm text-neutral-200",
              isFeatured
                ? "border-violet-400/60 bg-linear-to-b from-violet-900/30 via-neutral-950/90 to-black shadow-[0_0_40px_rgba(88,28,135,0.45)]"
                : "border-white/10 bg-neutral-950/80",
            ].join(" ")}
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                  <PlanIcon name={plan.icon} />
                </span>
                <span className="text-base font-semibold">{plan.name}</span>
              </div>

              {plan.badge && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-neutral-200">
                  {plan.badge}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mt-2">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
                Starting at
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-3xl font-semibold text-white">
                  {plan.startingAt}
                </span>
                <span className="text-xs text-neutral-400">
                  {plan.startingSuffix}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="mt-4 text-sm text-neutral-300">
              {plan.description}
            </p>

            {/* CTA */}
            <div className="mt-6">
              <Button
                asChild
                className={
                  isFeatured
                    ? "w-full rounded-full bg-violet-400 hover:bg-violet-500"
                    : "w-full rounded-full bg-white/5 text-white hover:bg-white/10"
                }
              >
                <Link
                  href={plan.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.cta.label}
                </Link>
              </Button>
            </div>

            {/* Features */}
            <div className="mt-6 border-t border-white/10 pt-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                What&apos;s included
              </div>
              <ul className="space-y-1.5 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Check className="mt-[3px] h-3 w-3 text-purple-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}
    </div>
  );
}
