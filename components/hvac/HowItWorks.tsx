"use client";

import { StickyFeatures, type FeatureItem } from "@/components/el/motion";
import { LiveCalls, LiveReview, LiveThread } from "./live";

const ITEMS: FeatureItem[] = [
  {
    label: "Step 1",
    title: "A call goes unanswered",
    body: "You're on a roof, in an attic, or finally sitting down to dinner. It happens to every shop, and the homeowner is already dialing the next number.",
    palette: "dusk",
    visual: (active) => <LiveCalls run={active} />,
  },
  {
    label: "Step 2",
    title: "They get a text back right away",
    body: "Something like “Got your call, we can be out at 8am, want that slot?” So they're talking to you, not the next shop.",
    palette: "iris",
    visual: (active) => <LiveThread run={active} />,
  },
  {
    label: "Step 3",
    title: "The job's done, then the review",
    body: "After each finished job, the customer gets a text asking for a Google review. Each one helps you show up higher in local search.",
    palette: "ember",
    visual: (active) => <LiveReview run={active} />,
  },
];

export function HowItWorks() {
  return <StickyFeatures items={ITEMS} />;
}
