"use client";

import { StickyFeatures, type FeatureItem } from "@/components/el/motion";
import { LiveCalls, LiveReview, LiveThread, LiveVoiceCall } from "./live";

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
    title: "They get a text from your business number",
    body: "Something like “Got your call, we can be out at 8am, want that slot?” It comes from your own number, so they're talking to you, not the next shop.",
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
  {
    label: "Optional",
    title: "Have a voice answer instead",
    body: "If you'd rather a voice picks up the call than a text, a voice receptionist answers, asks what's going on, and gets the details to you.",
    palette: "dawn",
    visual: (active) => <LiveVoiceCall run={active} />,
  },
];

export function HowItWorks() {
  return <StickyFeatures items={ITEMS} />;
}
