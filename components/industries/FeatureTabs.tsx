"use client";

import { BlockSection, StickyContent, TITLE_CLASS, TitleBlock } from "@/components/exact";
import type { Palette } from "@/components/el/ui";
import { Feature } from "@/lib/industry-content";

/**
 * Shared layout for the "Capabilities" and "Workflows" sections: a title block, then sticky rows
 * where each feature's title and copy scroll on the left while a painted square on the right swaps.
 * The square shows a small drawn card for the feature, not a repeat of its text.
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
  return (
    <>
      <BlockSection className="px-6 pb-16 pt-20 lg:px-8 lg:pb-20 lg:pt-[120px]">
        <TitleBlock eyebrow={label}>
          <h2 className={TITLE_CLASS}>{heading}</h2>
        </TitleBlock>
      </BlockSection>
      <BlockSection className="p-0">
        <StickyContent
          items={features.map((f, i) => ({
            title: f.title,
            body: f.description,
            media: () => (
              <div className={`grad g-${palette} flex h-full min-h-[380px] w-full items-center justify-center p-6 lg:min-h-0 lg:p-10`}>
                <div className="w-full max-w-[360px] rounded-2xl bg-white p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]">
                  <p className="text-[13px] text-subtle">
                    {label} · {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-[17px] leading-[1.35] text-black">{f.title}</p>
                  <div className="mt-5 space-y-2.5" aria-hidden="true">
                    <div className="h-2 w-full rounded-full bg-surface" />
                    <div className="h-2 w-5/6 rounded-full bg-surface" />
                    <div className="h-2 w-2/3 rounded-full bg-surface" />
                  </div>
                </div>
              </div>
            ),
          }))}
        />
      </BlockSection>
    </>
  );
}
