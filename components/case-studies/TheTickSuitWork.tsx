"use client";

import { Check, Search, Sparkles, Star } from "lucide-react";
import { StickyFeatures, useSequence, type FeatureItem } from "@/components/el/motion";
import { LiveWebsite } from "@/components/home/live";

/*
 * The five workstreams behind the TheTickSuit case study, each with a drawn
 * illustration. These are illustrations of the kind of work, not screenshots
 * of TheTickSuit's tools, and they carry no invented numbers or results.
 */

const card = "ring-hairline rounded-2xl bg-white text-black shadow-[0_24px_60px_-24px_rgba(0,0,0,0.4)]";

function Dot() {
  return (
    <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-black text-white">
      <Check className="h-2.5 w-2.5" />
    </span>
  );
}

function Note({ children }: { children: string }) {
  return <p className="px-4 py-2 text-[11px] text-subtle">{children}</p>;
}

/** Two versions of a page tested against each other; one is kept. */
function ABTestDemo({ run }: { run: boolean }) {
  const step = useSequence(run, [300, 1400, 2600]);
  const Wire = ({ label, winner }: { label: string; winner: boolean }) => (
    <div
      className={`rounded-xl bg-surface p-3 transition-all duration-500 ${
        winner ? "ring-2 ring-black" : step >= 3 ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-subtle">Version {label}</span>
        {winner && (
          <span className="pop-in flex items-center gap-1 rounded-full bg-black px-2 py-0.5 text-[10px] text-white">
            <Check className="h-2.5 w-2.5" /> Kept
          </span>
        )}
      </div>
      <div className="mt-2 space-y-1.5" aria-hidden="true">
        <div className="h-14 rounded-lg bg-surface-2" />
        <div className="h-2 w-3/4 rounded-full bg-surface-2" />
        <div className="h-2 w-1/2 rounded-full bg-surface-2" />
        <div className={`mt-2 h-6 rounded-full ${label === "A" ? "w-20 bg-black/60" : "w-28 bg-black"}`} />
      </div>
    </div>
  );
  return (
    <div className={`${card} w-full max-w-[340px] overflow-hidden`}>
      <div className="flex items-center justify-between border-b border-hairline px-4 py-3 text-[13px]">
        <span>Testing the layout</span>
        <span className="text-subtle">{step >= 3 ? "Test complete" : step >= 1 ? "Running" : "Starting"}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 p-4">
        <Wire label="A" winner={false} />
        <Wire label="B" winner={step >= 3} />
      </div>
      <div className="px-4 pb-3 text-[13px] text-subtle">
        {step >= 3 ? "The version that converted best stays." : "Real visitors, split between two versions."}
      </div>
      <Note>Illustration, not TheTickSuit's data.</Note>
    </div>
  );
}

/** A 24/7 assistant answering the questions shoppers ask before buying. */
function ChatDemo({ run }: { run: boolean }) {
  const step = useSequence(run, [300, 1200, 2600, 3500, 4800]);
  const bubble = (side: "q" | "a", text: string) => (
    <div className={`pop-in flex ${side === "q" ? "justify-end" : "justify-start"}`}>
      <p
        className={`max-w-[88%] rounded-2xl px-3.5 py-2 text-[13.5px] leading-[1.35] ${
          side === "q" ? "rounded-br-md bg-black text-white" : "rounded-bl-md bg-surface"
        }`}
      >
        {text}
      </p>
    </div>
  );
  return (
    <div className={`${card} w-full max-w-[330px] overflow-hidden`}>
      <div className="flex items-center gap-2.5 border-b border-hairline px-4 py-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        <div>
          <p className="text-[13.5px]">Ask us anything</p>
          <p className="text-[11px] text-subtle">Answers any time, day or night</p>
        </div>
      </div>
      <div className="flex min-h-[290px] flex-col gap-2 px-3.5 py-3.5">
        {step >= 1 && bubble("q", "What size should I order?")}
        {step >= 2 && bubble("a", "Tell me your height and your usual clothing size and I'll point you to the right fit.")}
        {step >= 3 && bubble("q", "How does payment work?")}
        {step >= 4 && bubble("a", "I can walk you through checkout and the payment options.")}
        {step >= 5 && (
          <p className="pop-in mt-auto flex items-center gap-2 text-[12px] text-subtle">
            <Dot /> Answered without an email back and forth
          </p>
        )}
      </div>
      <Note>Illustrative conversation about size, fit and payment.</Note>
    </div>
  );
}

/** Purchase, follow-up request, review shown on the site. */
function ReviewDemo({ run }: { run: boolean }) {
  const step = useSequence(run, [300, 1200, 2200, 2500, 2800, 3100, 3400]);
  const stars = Math.max(0, step - 3);
  return (
    <div className={`${card} w-full max-w-[330px] overflow-hidden`}>
      <ol className="space-y-2 p-4">
        {[
          { t: "Customer buys and uses the suit", s: 1 },
          { t: "A review request goes out", s: 2 },
          { t: "The review appears on the site", s: 3 },
        ].map((x) => (
          <li
            key={x.t}
            className={`flex items-center gap-3 rounded-xl p-3 text-[14px] transition-all duration-500 ${
              step >= x.s ? "bg-surface opacity-100" : "opacity-30"
            }`}
          >
            {step >= x.s ? <Dot /> : <span className="h-4 w-4 rounded-full border border-black/20" />}
            {x.t}
          </li>
        ))}
      </ol>
      <div
        className={`mx-4 mb-4 rounded-xl border border-hairline p-3 transition-all duration-500 ${
          step >= 3 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <div className="flex gap-0.5" role="img" aria-label="Five stars">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 transition-all duration-300 ${i < stars ? "fill-black text-black" : "fill-transparent text-black/25"}`}
              strokeWidth={1.5}
            />
          ))}
        </div>
        <div className="mt-2 space-y-1.5" aria-hidden="true">
          <div className="h-2 w-full rounded-full bg-surface-2" />
          <div className="h-2 w-2/3 rounded-full bg-surface-2" />
        </div>
      </div>
      <Note>Illustration, not a real review.</Note>
    </div>
  );
}

/** What search and AI-search management covers, ticked off. */
function SearchDemo({ run }: { run: boolean }) {
  const step = useSequence(run, [300, 1100, 1900, 2700]);
  const rows = [
    { icon: Search, t: "Search visibility", d: "How the site shows up in search results" },
    { icon: Sparkles, t: "AI search discovery", d: "How AI tools find and describe the brand" },
  ];
  return (
    <div className={`${card} w-full max-w-[340px] overflow-hidden`}>
      <div className="border-b border-hairline px-4 py-3 text-[13px]">Managed by Kenstera</div>
      <ul className="space-y-2 p-4">
        {rows.map((r, i) => (
          <li
            key={r.t}
            className={`flex items-start gap-3 rounded-xl bg-surface p-3.5 transition-all duration-500 ${
              step > i * 2 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <span className="ring-hairline flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-white">
              <r.icon className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="text-[14px]">{r.t}</p>
              <p className="text-[12.5px] text-subtle">{r.d}</p>
            </div>
            {step > i * 2 + 1 && <Dot />}
          </li>
        ))}
      </ul>
      <Note>Ongoing work, not a one-time fix.</Note>
    </div>
  );
}

const ITEMS: FeatureItem[] = [
  {
    label: "1. Redesign",
    title: "A modern site with a clear story",
    body: "We rebuilt TheTickSuit's site around what the suit does: a clear message up top, large outdoor photography, and a straightforward path from the homepage to the shop. The goal was a site that looks as good as the product feels and doesn't make shoppers hunt for the buy button.",
    palette: "moss",
    visual: (active) => <LiveWebsite run={active} />,
  },
  {
    label: "2. A/B testing",
    title: "The layout was tested, not guessed",
    body: "Instead of arguing about which design would sell best, we tested versions of the interface against each other with real visitors and kept the ones that converted best. Testing doesn't end at launch: each round teaches us what this audience responds to.",
    palette: "dusk",
    visual: (active) => <ABTestDemo run={active} />,
  },
  {
    label: "3. 24/7 customer chat",
    title: "Questions answered at any hour",
    body: "People considering a suit ask the same things before they buy: what size, how it fits, and how payment works. We added a chat that answers those questions around the clock. Shoppers get an answer when they're ready to buy, and the team spends less time replying to emails.",
    palette: "tide",
    visual: (active) => <ChatDemo run={active} />,
  },
  {
    label: "4. Review pipeline",
    title: "Social proof that builds itself",
    body: "Happy customers rarely think to leave a review on their own. We set up a pipeline that asks customers for reviews, so the site shows more real feedback from people who have bought and used the suit. That gives new shoppers a reason to trust it.",
    palette: "ember",
    visual: (active) => <ReviewDemo run={active} />,
  },
  {
    label: "5. SEO and AI search",
    title: "Easier to find, wherever people look",
    body: "We manage TheTickSuit's search optimization and how the brand shows up when people ask AI search tools for answers. It's ongoing work: search and AI results keep changing, so we keep tending to them.",
    palette: "iris",
    visual: (active) => <SearchDemo run={active} />,
  },
];

export function TheTickSuitWork() {
  return <StickyFeatures items={ITEMS} />;
}
