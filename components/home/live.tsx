"use client";

import Image from "next/image";
import type { ReactElement } from "react";
import { Check, Clock, Mail, MapPin, MessageSquare, Navigation, Phone, Globe, Star } from "lucide-react";
import { useSequence } from "@/components/el/motion";
import { THETICKSUIT } from "@/content/clients";
import type { MockKind } from "./services";

/*
 * Animated product-UI vignettes for the home page. Each plays when `run` is
 * true and replays when it flips back on. Interfaces are illustrative only:
 * no customer names, ratings or results are invented.
 */

const card = "ring-hairline rounded-2xl bg-white text-black shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]";

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

/** A real site, scrolling itself in a browser frame. */
export function LiveWebsite({ run }: { run: boolean }) {
  return (
    <div className={`${card} w-full max-w-[520px] overflow-hidden`}>
      <div className="flex items-center gap-1.5 border-b border-hairline px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        <span className="ml-3 rounded-full bg-surface px-3 py-0.5 text-[12px] text-subtle">theticksuit.com</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={THETICKSUIT.image}
          alt="TheTickSuit homepage, redesigned by Kenstera"
          width={1440}
          height={900}
          sizes="(min-width: 1024px) 520px, 90vw"
          className="h-auto w-full transition-transform duration-[6000ms] ease-in-out"
          style={{ transform: run ? "translateY(-22%)" : "translateY(0)" }}
        />
      </div>
    </div>
  );
}

export function LiveTextBack({ run }: { run: boolean }) {
  const step = useSequence(run, [200, 1000, 2100, 3000, 4100]);
  return (
    <div className="flex min-h-[270px] w-full max-w-[360px] flex-col gap-2.5">
      {step >= 1 && (
        <div className={`${card} pop-in flex items-center gap-3 px-4 py-3`}>
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-red-50 text-red-600">
            <Phone className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[14px]">Missed call</p>
            <p className="text-[13px] text-subtle">(555) 010-2387 · just now</p>
          </div>
        </div>
      )}
      {step === 2 && <Typing side="out" />}
      {step >= 3 && (
        <div className="pop-in flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-br-md bg-black px-4 py-2.5 text-[14px] leading-[1.4] text-white">
            Hi, sorry we missed your call! How can we help? You can also book a time here.
          </p>
        </div>
      )}
      {step === 4 && <Typing side="in" />}
      {step >= 5 && (
        <>
          <div className="pop-in flex justify-start">
            <p className="ring-hairline max-w-[80%] rounded-2xl rounded-bl-md bg-white px-4 py-2.5 text-[14px] leading-[1.4] text-black">
              Do you have anything open this week?
            </p>
          </div>
        </>
      )}
      {step >= 5 && (
        <div className="pop-in flex justify-end" style={{ animationDelay: "0.5s" }}>
          <span className={`${card} flex items-center gap-2 px-3.5 py-2 text-[13px]`}>
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black text-white">
              <Check className="h-2.5 w-2.5" />
            </span>
            Booking link sent
          </span>
        </div>
      )}
    </div>
  );
}

export function LiveReviewRequest({ run }: { run: boolean }) {
  const step = useSequence(run, [300, 1400, 1700, 2000, 2300, 2600]);
  const filled = Math.max(0, step - 1);
  return (
    <div className={`${card} w-full max-w-[360px] p-5`}>
      <div className="flex items-center gap-2 text-[13px] text-subtle">
        <MessageSquare className="h-3.5 w-3.5" />
        Sent after the job is marked complete
      </div>
      <p className="mt-3 text-[16px] leading-[1.4]">Thanks for choosing us! How did we do today?</p>
      <div className="mt-4 flex gap-1.5">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`flex h-10 flex-1 items-center justify-center rounded-xl transition-colors duration-300 ${
              i < filled ? "bg-black" : "bg-surface"
            }`}
          >
            <Star
              className={`h-4 w-4 transition-colors duration-300 ${i < filled ? "fill-white text-white" : "text-black/70"}`}
            />
          </span>
        ))}
      </div>
      <p className="mt-3 text-[13px] text-subtle">Tap a star to leave a review on Google.</p>
    </div>
  );
}

export function LiveCampaign({ run }: { run: boolean }) {
  const step = useSequence(run, [250, 900, 1550]);
  const steps = [
    { icon: Mail, title: "Email", body: "Seasonal offer to past customers", when: "Day 1" },
    { icon: MessageSquare, title: "Text", body: "Reminder with a booking link", when: "Day 3" },
    { icon: Clock, title: "Follow-up", body: "Personal note if no reply", when: "Day 7" },
  ];
  return (
    <div className={`${card} w-full max-w-[380px] p-5`}>
      <p className="text-[13px] text-subtle">Campaign sequence</p>
      <ol className="mt-3 min-h-[212px] space-y-2">
        {steps.map(
          (s, i) =>
            step > i && (
              <li key={s.title} className="pop-in flex items-center gap-3 rounded-xl bg-surface p-3">
                <span className="ring-hairline flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white">
                  <s.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px]">{s.title}</span>
                  <span className="block truncate text-[13px] text-subtle">{s.body}</span>
                </span>
                <span className="text-[12px] text-subtle">{s.when}</span>
              </li>
            ),
        )}
      </ol>
    </div>
  );
}

export function LiveLocal({ run }: { run: boolean }) {
  const step = useSequence(run, [250, 900, 1300, 1700]);
  return (
    <div className={`${card} w-full max-w-[380px] overflow-hidden`}>
      <div className="relative h-28 bg-[#e8eee6]">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,.9) 2px, transparent 2px), linear-gradient(0deg, rgba(255,255,255,.9) 2px, transparent 2px)",
            backgroundSize: "44px 36px",
          }}
        />
        {step >= 1 && (
          <span className="pop-in absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white shadow-lg">
            <MapPin className="h-4 w-4" />
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-[15px]">Your Business</p>
        <p className="text-[13px] text-subtle">Open now · Near you</p>
        <div className="mt-3 grid min-h-[58px] grid-cols-3 gap-1.5">
          {[
            { icon: Phone, label: "Call" },
            { icon: Navigation, label: "Directions" },
            { icon: Globe, label: "Website" },
          ].map(
            (a, i) =>
              step > i + 1 && (
                <span key={a.label} className="pop-in flex flex-col items-center gap-1 rounded-xl bg-surface py-2 text-[12px]">
                  <a.icon className="h-4 w-4" />
                  {a.label}
                </span>
              ),
          )}
        </div>
      </div>
    </div>
  );
}

export const LIVE_MOCKS: Record<MockKind, (run: boolean) => ReactElement> = {
  website: (run) => <LiveWebsite run={run} />,
  textback: (run) => <LiveTextBack run={run} />,
  review: (run) => <LiveReviewRequest run={run} />,
  campaign: (run) => <LiveCampaign run={run} />,
  local: (run) => <LiveLocal run={run} />,
};
