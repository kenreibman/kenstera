"use client";

import { Bell, Calendar, Check, Mail, MessageSquare, Phone } from "lucide-react";
import { useInView, useSequence } from "@/components/el/motion";
import type { Palette } from "@/components/el/ui";

/*
 * Animated product-UI vignettes for the three use-case cards under the
 * industry heroes. Illustrations only: no real clients, results or numbers.
 * `law` uses personal-injury intake language; `general` is industry-neutral.
 */

export type UseCaseVariant = "law" | "general";

const card = "ring-hairline rounded-2xl bg-white text-black shadow-[0_24px_60px_-24px_rgba(0,0,0,0.4)]";
const PALETTES: Palette[] = ["dusk", "iris", "dawn"];

function Typing() {
  return (
    <div className="pop-in flex justify-end">
      <span className="flex items-center gap-1 rounded-2xl rounded-br-md bg-black px-3.5 py-3" role="img" aria-label="Typing">
        {[0, 1, 2].map((i) => (
          <span key={i} className="typing-dot h-1.5 w-1.5 rounded-full bg-white" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </span>
    </div>
  );
}

function TickDot() {
  return (
    <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-black text-white">
      <Check className="h-2.5 w-2.5" />
    </span>
  );
}

/** 24/7 coverage: a late-night message answered in seconds. */
function IntakeDemo({ run, v }: { run: boolean; v: UseCaseVariant }) {
  const step = useSequence(run, [300, 1100, 2300, 3300]);
  const law = v === "law";
  return (
    <div className="flex w-full max-w-[300px] flex-col gap-2.5">
      {step >= 1 && (
        <p className="pop-in text-center text-[12px] text-white/90">{law ? "2:07 AM" : "9:41 PM"}</p>
      )}
      {step >= 1 && (
        <div className="pop-in flex justify-start">
          <p className="ring-hairline max-w-[88%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-[14px] leading-[1.35]">
            {law ? "I've been in a car accident and need legal help." : "Hi, I'd like to book an appointment."}
          </p>
        </div>
      )}
      {step === 2 && <Typing />}
      {step >= 3 && (
        <div className="pop-in flex justify-end">
          <p className="max-w-[90%] rounded-2xl rounded-br-md bg-black px-3.5 py-2.5 text-[14px] leading-[1.35] text-white">
            {law
              ? "We're here to help, 24/7. Let me gather some information to start your case."
              : "Happy to help! Let me get a few details to get you booked."}
          </p>
        </div>
      )}
      {step >= 4 && (
        <div className={`${card} pop-in flex items-center gap-2 self-end px-3.5 py-2 text-[12.5px]`}>
          <TickDot /> Response in seconds
        </div>
      )}
    </div>
  );
}

/** Qualification, then a booked consult. */
function QualifyDemo({ run, v }: { run: boolean; v: UseCaseVariant }) {
  const step = useSequence(run, [250, 800, 1350, 1900, 2900]);
  const rows = v === "law"
    ? ["Incident date", "Injury type", "Treatment status", "Liability signals"]
    : ["Name", "What you need", "Best number", "Preferred time"];
  return (
    <div className="flex w-full max-w-[300px] flex-col gap-2.5">
      <div className={`${card} p-4`}>
        <p className="text-[12px] text-subtle">{v === "law" ? "Qualifying the case" : "Collecting details"}</p>
        <ul className="mt-2.5 min-h-[132px] space-y-2">
          {rows.map(
            (r, i) =>
              step > i && (
                <li key={r} className="pop-in flex items-center justify-between text-[14px]">
                  {r}
                  <TickDot />
                </li>
              ),
          )}
        </ul>
      </div>
      <div
        className={`${card} flex items-center gap-3 p-3.5 transition-all duration-500 ${
          step >= 5 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-surface">
          <Calendar className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[14px]">{v === "law" ? "Consultation booked" : "Appointment booked"}</p>
          <p className="text-[12px] text-subtle">Tue 10:00 AM</p>
        </div>
      </div>
    </div>
  );
}

/** Follow-up sequence and a show-up reminder. */
function FollowUpDemo({ run, v }: { run: boolean; v: UseCaseVariant }) {
  const step = useSequence(run, [250, 900, 1550, 2600]);
  const steps = [
    { icon: MessageSquare, title: "Text", when: "5 min" },
    { icon: Mail, title: "Email", when: "Day 1" },
    { icon: Phone, title: "Call", when: "Day 2" },
  ];
  return (
    <div className="flex w-full max-w-[300px] flex-col gap-2.5">
      <div className={`${card} p-4`}>
        <p className="text-[12px] text-subtle">Follow-up sequence</p>
        <ol className="mt-2.5 min-h-[150px] space-y-2">
          {steps.map(
            (s, i) =>
              step > i && (
                <li key={s.title} className="pop-in flex items-center gap-3 rounded-xl bg-surface p-2.5">
                  <span className="ring-hairline flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white">
                    <s.icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-[14px]">{s.title}</span>
                  <span className="text-[12px] text-subtle">{s.when}</span>
                </li>
              ),
          )}
        </ol>
      </div>
      <div
        className={`${card} flex items-start gap-3 p-3.5 transition-all duration-500 ${
          step >= 4 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-black text-white">
          <Bell className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[14px]">{v === "law" ? "Consultation tomorrow, 10:00 AM" : "Appointment tomorrow, 10:00 AM"}</p>
          <p className="text-[12px] text-subtle">Reminder sent. Reply C to confirm.</p>
        </div>
      </div>
    </div>
  );
}

/** One animated card visual. Plays when scrolled into view. */
export function UseCaseVisual({ index, variant = "general" }: { index: number; variant?: UseCaseVariant }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const palette = PALETTES[index % PALETTES.length];
  const Demo = [IntakeDemo, QualifyDemo, FollowUpDemo][index % 3];
  return (
    <div ref={ref} className={`grad g-${palette} flex h-full w-full items-center justify-center p-5`}>
      <div className="relative flex w-full justify-center">
        <Demo run={inView} v={variant} />
      </div>
    </div>
  );
}
