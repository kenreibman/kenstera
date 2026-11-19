"use client";

import { StickyFeatures, type FeatureItem } from "@/components/el/motion";
import { LiveCalls, LiveReview, LiveThread, LiveVoiceCall } from "./live";

const ITEMS: FeatureItem[] = [
  {
    label: "7:12 PM",
    title: "A homeowner calls. Nobody answers.",
    body: "Their AC just quit. They search, and start calling down the list. Your crew is still out on a job.",
    palette: "dusk",
    visual: (active) => <LiveCalls run={active} />,
  },
  {
    label: "7:12 PM",
    title: "The voice receptionist picks up.",
    body: "Instead of voicemail, the caller reaches someone who asks what's wrong and takes the details, so the job isn't lost.",
    palette: "dawn",
    visual: (active) => <LiveVoiceCall run={active} />,
  },
  {
    label: "7:13 PM to 7:15 PM",
    title: "If they hang up, a text goes out. They reply and book the 8am slot.",
    body: "No one has to remember. The customer hears from you before they've dialed the next shop, and you find out in the morning, not at 7pm.",
    palette: "iris",
    visual: (active) => <LiveThread run={active} />,
  },
  {
    label: "After the job",
    title: "A review request goes out, and the review lands.",
    body: "Once the job is done, the customer gets a short text asking for a Google review. Each one helps you show up higher in local search, so the next 7pm call is more likely to find you first.",
    palette: "ember",
    visual: (active) => <LiveReview run={active} />,
  },
];

export function ExampleTimeline() {
  return <StickyFeatures items={ITEMS} />;
}
