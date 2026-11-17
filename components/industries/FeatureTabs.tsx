"use client";

import { useState } from "react";
import { Section, GradientCard, type Palette } from "@/components/el/ui";
import { Feature } from "@/lib/industry-content";

/**
 * Shared layout for the "Robust" and "Workflows & Testing" sections:
 * label + headline, a selectable feature list, and a gradient panel that
 * shows the selected feature as a white card.
 */
export function FeatureTabs({
  label,
  heading,
  features,
  palette,
}: {
  label: string;
  heading: string;
  features: Feature[];
  palette: Palette;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = features[activeIndex];

  return (
    <Section>
      <p className="mb-3 text-[16px] text-subtle">{label}</p>
      <h2 className="max-w-3xl text-[32px] leading-[1.15] text-black sm:text-[40px]">{heading}</h2>

      <div className="mt-14 grid gap-3 lg:grid-cols-2">
        <div className="flex flex-col gap-1">
          {features.map((feature, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={feature.title}
                type="button"
                aria-expanded={isActive}
                onClick={() => setActiveIndex(index)}
                className={`rounded-2xl p-6 text-left transition-colors ${isActive ? "bg-surface" : "hover:bg-surface/60"}`}
              >
                <span className={`block text-[17px] ${isActive ? "text-black" : "text-black/50"}`}>{feature.title}</span>
                <span className={`grid transition-[grid-template-rows] duration-300 ease-out ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <span className="overflow-hidden">
                    <span className="block pt-2 text-[15px] leading-[1.5] text-subtle">{feature.description}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <GradientCard palette={palette} className="min-h-[380px] lg:min-h-[480px]">
          {active && (
            <div
              key={active.title}
              className="fade-in-up ring-hairline w-full max-w-[400px] rounded-2xl bg-white p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]"
            >
              <p className="text-[13px] text-subtle">{label}</p>
              <p className="mt-2 text-[17px] leading-[1.35] text-black">{active.title}</p>
              <p className="mt-2 text-[14px] leading-[1.5] text-subtle">{active.description}</p>
            </div>
          )}
        </GradientCard>
      </div>
    </Section>
  );
}
