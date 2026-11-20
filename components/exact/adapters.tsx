"use client";
import type { FeatureItem } from "@/components/el/motion";
import type { StickyItem } from "./StickyContent";

/**
 * Converts the older `FeatureItem` list (label, title, body, palette, visual) into sticky rows.
 * The visual is placed on a painted panel, like the product panel on the real site.
 */
export function fromFeatureItems(items: FeatureItem[], opts: { labels?: boolean } = {}): StickyItem[] {
  return items.map((it) => ({
    eyebrow: opts.labels ? it.label : undefined,
    title: it.title,
    body: it.body,
    media: (active: boolean) => (
      <div className={`grad g-${it.palette} flex h-full min-h-[440px] w-full items-center justify-center p-6 lg:min-h-0 lg:p-10`}>
        {it.visual(active)}
      </div>
    ),
  }));
}
