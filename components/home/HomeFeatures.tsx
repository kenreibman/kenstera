"use client";

import { StickyContent, type StickyItem } from "@/components/exact";
import { HOME_SERVICES } from "./services";
import { LIVE_MOCKS } from "./live";

const BODIES: Record<string, string> = {
  "Custom Websites":
    "Conversion-optimized, high-performance websites, designed and built for your business. This is TheTickSuit, which we redesigned.",
  "Missed Call Text Back": "24/7 intake that instantly texts back missed calls, so no lead is ever lost.",
  "Voice Receptionist":
    "A voice receptionist answers your calls when you can't, asks what's going on, and gets the details to you. Pair it with text back for the callers who hang up.",
  "Review Funnel": "Automatic review funnels that acquire genuine social proof for your business.",
  "Marketing Campaigns": "Targeted paid and email campaigns that drive qualified demand.",
  "Local SEO": "Organic lead acquisition through local search visibility.",
};

const ITEMS: StickyItem[] = HOME_SERVICES.map((s) => ({
  title: s.title,
  body: BODIES[s.title] ?? s.description,
  media: (active: boolean) => (
    <div className={`grad g-${s.palette} flex h-full min-h-[440px] w-full items-center justify-center p-6 lg:min-h-0 lg:p-10`}>
      {LIVE_MOCKS[s.mock](active)}
    </div>
  ),
}));

export function HomeFeatures() {
  return <StickyContent items={ITEMS} />;
}
