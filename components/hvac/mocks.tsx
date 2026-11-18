import type { ReactNode } from "react";
import { Check, PhoneMissed, Search, Star } from "lucide-react";

/*
 * Illustrations for the HVAC pages. Every interface here is generic on
 * purpose: 555 numbers, "another shop" / "your shop", no real business names,
 * no real customers, no ratings or results.
 */

const card = "ring-hairline rounded-2xl bg-white text-black shadow-[0_24px_60px_-24px_rgba(0,0,0,0.4)]";

/**
 * A phone showing a conversation, at real proportions (about 2:1): titanium
 * bezel, side buttons, dynamic island, contact header, input bar and home
 * indicator. `screenHeight` is the display height in px.
 */
export function PhoneFrame({
  children,
  time = "7:13",
  title = "Your shop",
  screenHeight = 500,
  className = "",
}: {
  children: ReactNode;
  time?: string;
  title?: string;
  screenHeight?: number;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-full max-w-[262px] ${className}`}>
      {/* Side buttons */}
      <span aria-hidden="true" className="absolute -left-[3px] top-[84px] h-7 w-[3px] rounded-l bg-[#2b2b2d]" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[130px] h-12 w-[3px] rounded-l bg-[#2b2b2d]" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[190px] h-12 w-[3px] rounded-l bg-[#2b2b2d]" />
      <span aria-hidden="true" className="absolute -right-[3px] top-[150px] h-[72px] w-[3px] rounded-r bg-[#2b2b2d]" />

      <div className="rounded-[46px] bg-[#1b1b1d] p-[7px] shadow-[0_0_0_1.5px_#3a3a3d,0_34px_70px_-26px_rgba(0,0,0,0.65)]">
        <div
          className="relative flex flex-col overflow-hidden rounded-[39px] bg-[#f7f6f4]"
          style={{ height: screenHeight }}
        >
          {/* Status bar and dynamic island */}
          <div className="relative flex items-center justify-between px-7 pt-3.5 text-[11px] font-semibold text-black">
            <span>{time}</span>
            <span
              className="absolute left-1/2 top-2.5 h-[22px] w-[74px] -translate-x-1/2 rounded-full bg-black"
              aria-hidden="true"
            />
            <span className="flex items-center gap-1" aria-hidden="true">
              <span className="flex items-end gap-[1.5px]">
                {[4, 6, 8, 10].map((h) => (
                  <span key={h} className="w-[2.5px] rounded-sm bg-black" style={{ height: h }} />
                ))}
              </span>
              <span className="ml-0.5 h-[10px] w-[20px] rounded-[3px] border border-black/60 p-[1px]">
                <span className="block h-full w-4/5 rounded-[1.5px] bg-black" />
              </span>
            </span>
          </div>

          {/* Conversation header */}
          <div className="mt-2 flex flex-col items-center border-b border-hairline pb-2.5">
            <span className="grad g-dusk flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-medium text-white">
              {title.charAt(0)}
            </span>
            <p className="mt-1 text-[11px] text-black">{title}</p>
          </div>

          {/* Messages */}
          <div className="flex min-h-0 flex-1 flex-col space-y-2 overflow-hidden px-3 py-3">{children}</div>

          {/* Input bar and home indicator */}
          <div className="px-3 pb-2">
            <div className="flex h-8 items-center rounded-full border border-black/15 bg-white px-3 text-[12px] text-black/35">
              Text Message
            </div>
            <span className="mx-auto mt-2 block h-1 w-24 rounded-full bg-black" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stamp({ children }: { children: ReactNode }) {
  return <p className="pt-1 text-center text-[11px] text-subtle">{children}</p>;
}

function Out({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end">
      <p className="max-w-[86%] rounded-2xl rounded-br-md bg-black px-3.5 py-2 text-[13.5px] leading-[1.35] text-white">
        {children}
      </p>
    </div>
  );
}

function In({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-start">
      <p className="ring-hairline max-w-[86%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2 text-[13.5px] leading-[1.35] text-black">
        {children}
      </p>
    </div>
  );
}

/**
 * The missed-call text-back conversation, revealed step by step.
 * 0 = missed call only, 1 = text goes out, 2 = homeowner replies, 3 = booked.
 */
export function TextThread({ upTo = 3, className = "" }: { upTo?: 0 | 1 | 2 | 3; className?: string }) {
  return (
    <PhoneFrame time={upTo === 0 ? "7:12" : upTo === 1 ? "7:13" : "7:15"} className={className}>
      <Stamp>Missed call · 7:12 PM</Stamp>
      {upTo >= 1 && (
        <Out>Got your call! We can be out at 8am tomorrow. Want that slot?</Out>
      )}
      {upTo >= 2 && <In>Yes please! Our AC just died.</In>}
      {upTo >= 3 && (
        <>
          <Out>You&apos;re booked for 8am. See you then.</Out>
          <Stamp>Appointment booked</Stamp>
        </>
      )}
    </PhoneFrame>
  );
}

/** The 7pm scenario: a homeowner calling down the list. */
export function CallListMock({ className = "" }: { className?: string }) {
  return (
    <div className={`${card} w-full max-w-[330px] overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 border-b border-hairline px-4 py-3 text-[13px] text-subtle">
        <Search className="h-3.5 w-3.5 flex-none" />
        <span className="truncate">AC repair near me</span>
        <span className="ml-auto flex-none">7:12 PM</span>
      </div>
      <ul className="divide-y divide-hairline">
        <li className="flex items-center justify-between gap-3 px-4 py-3.5">
          <span className="text-[15px]">Another shop</span>
          <span className="flex items-center gap-1.5 text-[13px] text-red-600">
            <PhoneMissed className="h-3.5 w-3.5" /> No answer
          </span>
        </li>
        <li className="flex items-center justify-between gap-3 px-4 py-3.5">
          <span className="text-[15px]">Another shop</span>
          <span className="flex items-center gap-1.5 text-[13px] text-red-600">
            <PhoneMissed className="h-3.5 w-3.5" /> No answer
          </span>
        </li>
        <li className="flex items-center justify-between gap-3 bg-surface px-4 py-3.5">
          <span className="text-[15px]">Your shop</span>
          <span className="flex items-center gap-1.5 text-[13px]">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black text-white">
              <Check className="h-2.5 w-2.5" />
            </span>
            Text sent
          </span>
        </li>
      </ul>
    </div>
  );
}

/** The review request that goes out after a finished job. */
export function ReviewRequestPhone({ className = "" }: { className?: string }) {
  return (
    <PhoneFrame time="9:40" className={className}>
      <Stamp>Job complete</Stamp>
      <Out>Thanks for having us out today! If we took good care of you, would you leave us a quick Google review?</Out>
      <div className="flex justify-end">
        <span className="ring-hairline rounded-full bg-white px-3.5 py-1.5 text-[13px]">Leave a review</span>
      </div>
    </PhoneFrame>
  );
}

/** A generic "review landed" notification. No reviewer, no text, no rating claim. */
export function ReviewLandsCard({ className = "" }: { className?: string }) {
  return (
    <div className={`${card} w-full max-w-[340px] p-5 ${className}`}>
      <div className="flex items-center justify-between text-[12px] text-subtle">
        <span>New Google review</span>
        <span>Just now</span>
      </div>
      <div className="mt-3 flex gap-0.5" aria-label="Five stars">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="h-4 w-4 fill-black text-black" strokeWidth={1.5} />
        ))}
      </div>
      <div className="mt-3 space-y-2" aria-hidden="true">
        <div className="h-2.5 w-full rounded-full bg-surface-2" />
        <div className="h-2.5 w-11/12 rounded-full bg-surface-2" />
        <div className="h-2.5 w-2/3 rounded-full bg-surface-2" />
      </div>
      <p className="mt-4 text-[12px] text-subtle">Illustration, not a real customer.</p>
    </div>
  );
}

/** Review request plus the review landing, for the services bento. */
export function ReviewFlowMock({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full max-w-[340px] space-y-3 ${className}`}>
      <div className="flex justify-end">
        <p className="max-w-[88%] rounded-2xl rounded-br-md bg-black px-4 py-2.5 text-[14px] leading-[1.4] text-white">
          Thanks for having us out today! If we took good care of you, would you leave us a quick Google review?
        </p>
      </div>
      <ReviewLandsCard className="max-w-none" />
    </div>
  );
}
