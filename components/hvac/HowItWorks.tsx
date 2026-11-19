"use client";

import { StickyFeatures, type FeatureItem } from "@/components/el/motion";
import { LiveCalls, LiveReview, LiveThread, LiveVoiceCall } from "./live";

const ITEMS: FeatureItem[] = [
  {
    label: "Step 1",
    title: "A call comes in while you're busy",
    body: "You're on a roof, in an attic, or finally sitting down to dinner. It happens to every shop, and the homeowner is already dialing the next number.",
    palette: "dusk",
    visual: (active) => <LiveCalls run={active} />,
  },
  {
    label: "Step 2",
    title: "A voice receptionist picks up",
    body: "Instead of voicemail, someone answers, asks what's going on, and gets the details. You read them when you're back, not at 7pm.",
    palette: "dawn",
    visual: (active) => <LiveVoiceCall run={active} />,
  },
  {
    label: "Step 3",
    title: "If they hang up, they get a text back right away",
    body: "Something like “Got your call, we can be out at 8am, want that slot?” So they're talking to you, not the next shop.",
    palette: "iris",
    visual: (active) => <LiveThread run={active} />,
  },
  {
    label: "Step 4",
    title: "The job's done, then the review",
    body: "After each finished job, the customer gets a text asking for a Google review. Each one helps you show up higher in local search.",
    palette: "ember",
    visual: (active) => <LiveReview run={active} />,
  },
];

export function HowItWorks() {
  return <StickyFeatures items={ITEMS} />;
}
