"use client";

import { StickyFeatures, type FeatureItem } from "@/components/el/motion";
import { HOME_SERVICES } from "./services";
import { LIVE_MOCKS } from "./live";

const BODIES: Record<string, string> = {
  "Custom Websites":
    "Conversion-optimized, high-performance websites, designed and built for your business. This is TheTickSuit, which we redesigned.",
  "Missed Call Text Back": "24/7 intake that instantly texts back missed calls, so no lead is ever lost.",
  "Review Funnel": "Automatic review funnels that acquire genuine social proof for your business.",
  "Marketing Campaigns": "Targeted paid and email campaigns that drive qualified demand.",
  "Local SEO": "Organic lead acquisition through local search visibility.",
};

const ITEMS: FeatureItem[] = HOME_SERVICES.map((s) => ({
  label: s.short,
  title: s.title,
  body: BODIES[s.title] ?? s.description,
  palette: s.palette,
  visual: (active: boolean) => LIVE_MOCKS[s.mock](active),
}));

export function HomeFeatures() {
  return <StickyFeatures items={ITEMS} />;
}
