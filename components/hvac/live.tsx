"use client";

import { useState, type ReactNode } from "react";
import { Check, Phone, PhoneMissed, Search, Star } from "lucide-react";
import { useInView, useSequence } from "@/components/el/motion";
import { PhoneFrame } from "./mocks";

/*
 * Animated versions of the HVAC illustrations. Each plays when `run` is true
 * and restarts whenever it flips back on. Everything shown is generic:
 * 555 numbers, "another shop" and "your shop", nothing that claims a result.
 */

const card = "ring-hairline rounded-2xl bg-white text-black shadow-[0_24px_60px_-24px_rgba(0,0,0,0.4)]";

function Typing({ side }: { side: "out" | "in" }) {
  return (
    <div className={`pop-in flex ${side === "out" ? "justify-end" : "justify-start"}`}>
      <span
        className={`flex items-center gap-1 rounded-2xl px-3.5 py-3 ${
          side === "out" ? "rounded-br-md bg-black" : "ring-hairline rounded-bl-md bg-white"
        }`}
        aria-label="Typing"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`typing-dot h-1.5 w-1.5 rounded-full ${side === "out" ? "bg-white" : "bg-black"}`}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
    </div>
  );
}

function Bubble({ side, children }: { side: "out" | "in"; children: ReactNode }) {
  return (
    <div className={`pop-in flex ${side === "out" ? "justify-end" : "justify-start"}`}>
      <p
        className={`max-w-[86%] px-3.5 py-2 text-[13.5px] leading-[1.35] ${
          side === "out"
            ? "rounded-2xl rounded-br-md bg-black text-white"
            : "ring-hairline rounded-2xl rounded-bl-md bg-white text-black"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

function Stamp({ children }: { children: ReactNode }) {
  return <p className="pop-in pt-1 text-center text-[11px] text-subtle">{children}</p>;
}

/** The missed-call text-back conversation, typed out in real time. */
export function LiveThread({ run, className = "" }: { run: boolean; className?: string }) {
  const step = useSequence(run, [200, 900, 2000, 2900, 4000, 4900, 5500]);
  const time = step < 3 ? "7:12" : step < 5 ? "7:13" : "7:15";
  return (
    <PhoneFrame time={time} className={className}>
      <div className="flex flex-col gap-2">
        {step >= 1 && <Stamp>Missed call · 7:12 PM</Stamp>}
        {step === 2 && <Typing side="out" />}
        {step >= 3 && <Bubble side="out">Got your call! We can be out at 8am tomorrow. Want that slot?</Bubble>}
        {step === 4 && <Typing side="in" />}
        {step >= 5 && <Bubble side="in">Yes please! Our AC just died.</Bubble>}
        {step >= 6 && <Bubble side="out">You&apos;re booked for 8am. See you then.</Bubble>}
        {step >= 7 && <Stamp>Appointment booked</Stamp>}
      </div>
    </PhoneFrame>
  );
}

/** The 7pm scenario: a homeowner calling down the list, one shop at a time. */
export function LiveCalls({ run, className = "" }: { run: boolean; className?: string }) {
  const step = useSequence(run, [200, 1100, 1700, 2600, 3500]);
  const row = (n: number, failStep: number) => {
    // n: the step at which this row starts ringing.
    if (step < n) return <span className="text-[13px] text-subtle/60">Waiting</span>;
    if (step < failStep)
      return (
        <span className="flex items-center gap-1.5 text-[13px] text-subtle">
          <Phone className="h-3.5 w-3.5 animate-pulse" /> Calling…
        </span>
      );
    return (
      <span className="pop-in flex items-center gap-1.5 text-[13px] text-red-600">
        <PhoneMissed className="h-3.5 w-3.5" /> No answer
      </span>
    );
  };
  return (
    <div className={`${card} w-full max-w-[330px] overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 border-b border-hairline px-4 py-3 text-[13px] text-subtle">
        <Search className="h-3.5 w-3.5 flex-none" />
        <span className="truncate">AC repair near me</span>
        <span className="ml-auto flex-none">7:12 PM</span>
      </div>
      <ul className="divide-y divide-hairline">
        <li className="flex min-h-[52px] items-center justify-between gap-3 px-4 py-3.5">
          <span className="text-[15px]">Another shop</span>
          {row(1, 2)}
        </li>
        <li className="flex min-h-[52px] items-center justify-between gap-3 px-4 py-3.5">
          <span className="text-[15px]">Another shop</span>
          {row(3, 4)}
        </li>
        <li className={`flex min-h-[52px] items-center justify-between gap-3 px-4 py-3.5 transition-colors duration-500 ${step >= 5 ? "bg-surface" : ""}`}>
          <span className="text-[15px]">Your shop</span>
          {step >= 5 ? (
            <span className="pop-in flex items-center gap-1.5 text-[13px]">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black text-white">
                <Check className="h-2.5 w-2.5" />
              </span>
              Text sent
            </span>
          ) : (
            <span className="text-[13px] text-subtle/60">Missed</span>
          )}
        </li>
      </ul>
    </div>
  );
}

/** The voice receptionist answering a call, with a live transcript. */
export function LiveVoiceCall({
  run,
  className = "",
  general = false,
}: {
  run: boolean;
  className?: string;
  /** Industry-neutral script for pages that aren't about HVAC. */
  general?: boolean;
}) {
  const step = useSequence(run, [300, 1500, 3000, 4400, 5800]);
  const script = general
    ? {
        caller1: "Hi, I'd like to book an appointment.",
        ai2: "Happy to help. What's the best number to reach you?",
        caller2: "(555) 010-4471.",
        done: "Details sent to the team",
      }
    : {
        caller1: "My AC just stopped working.",
        ai2: "Sorry to hear that. What's the address?",
        caller2: "12 Example Street.",
        done: "Details sent to the shop",
      };
  const line = (who: "ai" | "caller", text: string) => (
    <div className={`pop-in flex ${who === "ai" ? "justify-start" : "justify-end"}`}>
      <p
        className={`max-w-[88%] rounded-2xl px-3.5 py-2 text-[13.5px] leading-[1.35] ${
          who === "ai" ? "bg-surface text-black" : "bg-black text-white"
        }`}
      >
        {text}
      </p>
    </div>
  );
  return (
    <div className={`${card} w-full max-w-[330px] overflow-hidden ${className}`}>
      <div className="flex items-center gap-3 border-b border-hairline px-4 py-3.5">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-black text-white">
          <Phone className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px]">Incoming call</p>
          <p className="text-[12px] text-subtle">(555) 010-2387</p>
        </div>
        <span className="flex h-6 items-end gap-[3px]" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`wave-bar w-[3px] rounded-full bg-black ${step >= 1 ? "" : "opacity-20"}`}
              style={{ animationDelay: `${i * 0.12}s`, animationPlayState: step >= 1 ? "running" : "paused" }}
            />
          ))}
        </span>
      </div>
      <div className="flex min-h-[250px] flex-col gap-2 px-4 py-4">
        {step >= 1 && line("ai", "Thanks for calling. How can I help?")}
        {step >= 2 && line("caller", script.caller1)}
        {step >= 3 && line("ai", script.ai2)}
        {step >= 4 && line("caller", script.caller2)}
        {step >= 5 && (
          <p className="pop-in mt-1 flex items-center gap-2 text-[12px] text-subtle">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black text-white">
              <Check className="h-2.5 w-2.5" />
            </span>
            {script.done}
          </p>
        )}
      </div>
      <p className="border-t border-hairline px-4 py-2 text-[11px] text-subtle">Illustration, not a real call.</p>
    </div>
  );
}

/** The review request, then the review landing with its stars filling in. */
export function LiveReview({ run, className = "" }: { run: boolean; className?: string }) {
  const step = useSequence(run, [200, 1300, 2500, 2900, 3100, 3300, 3500, 3700]);
  const stars = Math.max(0, step - 3);
  return (
    <div className={`flex w-full max-w-[340px] flex-col gap-3 ${className}`}>
      <PhoneFrame time="9:40" screenHeight={340}>
        <div className="flex flex-col gap-2">
          {step >= 1 && <Stamp>Job complete</Stamp>}
          {step >= 2 && (
            <Bubble side="out">
              Thanks for having us out today! If we took good care of you, would you leave us a quick Google review?
            </Bubble>
          )}
        </div>
      </PhoneFrame>
      <div
        className={`${card} p-4 transition-all duration-500 ${
          step >= 3 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between text-[12px] text-subtle">
          <span>New Google review</span>
          <span>Just now</span>
        </div>
        <div className="mt-2 flex gap-0.5" aria-label="Five stars">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 transition-all duration-300 ${i < stars ? "fill-black text-black" : "fill-transparent text-black/25"}`}
              strokeWidth={1.5}
            />
          ))}
        </div>
        <p className="mt-2 text-[11px] text-subtle">Illustration, not a real customer.</p>
      </div>
    </div>
  );
}

/** Hero product card: a pill toggle swaps between the two things Kenstera does. */
export function HvacHeroCard() {
  const [tab, setTab] = useState<"missed" | "voice" | "review">("missed");
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const tabs = [
    { id: "missed" as const, label: "Text back" },
    { id: "voice" as const, label: "Voice receptionist" },
    { id: "review" as const, label: "Reviews" },
  ];
  const palette = tab === "missed" ? "g-dusk" : tab === "voice" ? "g-dawn" : "g-ember";
  return (
    <div
      ref={ref}
      className={`grad ${palette} relative rounded-2xl transition-[background] duration-700`}
    >
      <div className="relative flex min-h-[520px] flex-col items-center justify-center gap-8 px-5 pb-24 pt-10 sm:min-h-[580px] sm:px-10">
        <div
          key={tab}
          className="pop-in flex w-full flex-col items-center justify-center gap-8 md:flex-row md:gap-16"
        >
          {tab === "missed" ? (
            <>
              <LiveCalls run={inView} className="hidden sm:block" />
              <LiveThread run={inView} />
            </>
          ) : tab === "voice" ? (
            <LiveVoiceCall run={inView} />
          ) : (
            <LiveReview run={inView} />
          )}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <div role="tablist" aria-label="What Kenstera does" className="flex rounded-full bg-white/90 p-1 shadow-lg backdrop-blur">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`h-9 rounded-full px-4 text-[14px] transition-colors ${
                tab === t.id ? "bg-black text-white" : "text-black hover:bg-black/5"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
