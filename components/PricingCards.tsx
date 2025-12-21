import { ReactNode } from "react";
import Link from "next/link";
import { ScheduleModal } from '@/components/ScheduleModal';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export type PlanCTA =
  | {
      type: "link";
      label: string;
      href: string;
    }
  | {
      type: "schedule";
      label: string;
      calLink: string;
      modalTitle?: string;
  };


export type Plan = {
  id: string;
  name: string;
  icon: ReactNode;
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

export function PricingCards({ plans }: PricingCardsProps) {
  return (
    <div
      className="
        mt-10 
        grid 
        gap-6 
        sm:grid-cols-2 
        lg:grid-cols-3
      "
    >
      {plans.map((plan) => {
        const isFeatured = plan.featured;

        return (
          <article
            key={plan.id}
            className={[
              "flex flex-col border bg-neutral-950/80 p-6 text-sm text-neutral-200",
              isFeatured
                ? "border-violet-400/60 bg-linear-to-b from-violet-900/30 via-neutral-950/90 to-black shadow-[0_0_40px_rgba(88,28,135,0.45)]"
                : "border-white/10",
            ].join(" ")}
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                  {plan.icon}
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
            <p className="mt-4 text-sm text-neutral-300">{plan.description}</p>

            {/* CTA */}
            <div className="mt-6">
              {plan.cta.type === 'link' && plan.cta.href ? (
                <Button
                  asChild
                  className={
                    isFeatured
                      ? "w-full rounded-full bg-violet-400 hover:bg-violet-500"
                      : "w-full rounded-full bg-white/5 text-white hover:bg-white/10"
                  }
                >
                  <Link href={plan.cta.href}>{plan.cta.label}</Link>
                </Button>
              ) : plan.cta.type === "schedule" && plan.cta.calLink ? (
                <ScheduleModal
                  label={plan.cta.label}
                  calLink={plan.cta.calLink}
                  theme="auto"
                  layout="month_view"
                  className={
                    isFeatured
                      ? "w-full rounded-full bg-violet-400 px-4 py-2 text-sm font-semibold text-black hover:bg-violet-500 cursor-pointer transition"
                      : "w-full rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 cursor-pointer transition"
                  }
                />
              ) : (
                <Button
                  disabled
                  className={
                    isFeatured
                      ? "w-full rounded-full bg-violet-400/60 text-black"
                      : "w-full rounded-full bg-white/5 text-neutral-400"
                  }
                >
                  {plan.cta.label}
                </Button>
              )}
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
