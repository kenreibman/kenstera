"use client";

import type { ReactNode } from "react";
import { StickyContent, type StickyItem } from "@/components/exact";
import { LiveCalls, LiveReview, LiveThread, LiveVoiceCall } from "./live";

function Art({ palette, children }: { palette: string; children: ReactNode }) {
  return (
    <div className={`grad ${palette} flex h-full min-h-[440px] w-full items-center justify-center p-6 lg:min-h-0 lg:p-10`}>
      {children}
    </div>
  );
}

const ITEMS: StickyItem[] = [
  {
    title: "A call goes unanswered",
    body: "You're on a roof, in an attic, or finally sitting down to dinner. It happens to every shop, and the homeowner is already dialing the next number.",
    media: (active) => (
      <Art palette="g-dusk">
        <LiveCalls run={active} />
      </Art>
    ),
  },
  {
    title: "They get a text from your business number",
    body: "Something like “Got your call, we can be out at 8am, want that slot?” It comes from your own number, so they're talking to you, not the next shop.",
    media: (active) => (
      <Art palette="g-iris">
        <LiveThread run={active} />
      </Art>
    ),
  },
  {
    title: "The job's done, then the review",
    body: "After each finished job, the customer gets a text asking for a Google review. Each one helps you show up higher in local search.",
    media: (active) => (
      <Art palette="g-ember">
        <LiveReview run={active} />
      </Art>
    ),
  },
  {
    title: "Optional: have a voice answer instead",
    body: "If you'd rather a voice picks up the call than a text, a voice receptionist answers, asks what's going on, and gets the details to you.",
    media: (active) => (
      <Art palette="g-dawn">
        <LiveVoiceCall run={active} />
      </Art>
    ),
  },
];

export function HowItWorks() {
  return <StickyContent items={ITEMS} />;
}
