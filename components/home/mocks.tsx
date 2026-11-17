import Image from "next/image";
import { Check, MapPin, Phone, Navigation, Globe, Star, Mail, MessageSquare, Clock } from "lucide-react";
import { THETICKSUIT } from "@/content/clients";

/*
 * Product-UI vignettes for each service, drawn as clean white cards in the
 * way elevenlabs.io shows its app screens. Illustrative interfaces only: no
 * customer names, ratings, or results are invented.
 */

const card = "ring-hairline rounded-2xl bg-white text-black shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]";

/** Real work: TheTickSuit's live homepage in a browser frame. */
export function WebsiteMock({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <div className={`${card} w-full max-w-[640px] overflow-hidden ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-hairline px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        <span className="ml-3 rounded-full bg-surface px-3 py-0.5 text-[12px] text-subtle">theticksuit.com</span>
      </div>
      <Image
        src={THETICKSUIT.image}
        alt="TheTickSuit homepage, redesigned by Kenstera"
        width={1440}
        height={900}
        sizes="(min-width: 1024px) 640px, 90vw"
        priority={priority}
        className="h-auto w-full"
      />
    </div>
  );
}

/** Missed-call text back: the call is missed, the text goes out on its own. */
export function TextBackMock({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full max-w-[360px] space-y-2.5 ${className}`}>
      <div className={`${card} flex items-center gap-3 px-4 py-3`}>
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-red-50 text-red-600">
          <Phone className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="text-[14px]">Missed call</p>
          <p className="text-[13px] text-subtle">(555) 010-2387 · just now</p>
        </div>
      </div>
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-2xl rounded-br-md bg-black px-4 py-2.5 text-[14px] leading-[1.4] text-white">
          Hi, sorry we missed your call! How can we help? You can also book a time here.
        </p>
      </div>
      <div className="flex justify-start">
        <p className="max-w-[80%] rounded-2xl rounded-bl-md bg-white px-4 py-2.5 text-[14px] leading-[1.4] text-black ring-hairline">
          Do you have anything open this week?
        </p>
      </div>
      <div className="flex justify-end">
        <span className={`${card} flex items-center gap-2 px-3.5 py-2 text-[13px]`}>
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black text-white">
            <Check className="h-2.5 w-2.5" />
          </span>
          Booking link sent
        </span>
      </div>
    </div>
  );
}

/** Review funnel: a timely request with a one-tap rating. */
export function ReviewMock({ className = "" }: { className?: string }) {
  return (
    <div className={`${card} w-full max-w-[360px] p-5 ${className}`}>
      <div className="flex items-center gap-2 text-[13px] text-subtle">
        <MessageSquare className="h-3.5 w-3.5" />
        Sent after the job is marked complete
      </div>
      <p className="mt-3 text-[16px] leading-[1.4]">Thanks for choosing us! How did we do today?</p>
      <div className="mt-4 flex gap-1.5">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className="flex h-10 flex-1 items-center justify-center rounded-xl bg-surface">
            <Star className="h-4 w-4 text-black/70" />
          </span>
        ))}
      </div>
      <p className="mt-3 text-[13px] text-subtle">Tap a star to leave a review on Google.</p>
    </div>
  );
}

/** Campaigns: a simple follow-up sequence. */
export function CampaignMock({ className = "" }: { className?: string }) {
  const steps = [
    { icon: Mail, title: "Email", body: "Seasonal offer to past customers", when: "Day 1" },
    { icon: MessageSquare, title: "Text", body: "Reminder with a booking link", when: "Day 3" },
    { icon: Clock, title: "Follow-up", body: "Personal note if no reply", when: "Day 7" },
  ];
  return (
    <div className={`${card} w-full max-w-[380px] p-5 ${className}`}>
      <p className="text-[13px] text-subtle">Campaign sequence</p>
      <ol className="mt-3 space-y-2">
        {steps.map((s) => (
          <li key={s.title} className="flex items-center gap-3 rounded-xl bg-surface p-3">
            <span className="ring-hairline flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white">
              <s.icon className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px]">{s.title}</span>
              <span className="block truncate text-[13px] text-subtle">{s.body}</span>
            </span>
            <span className="text-[12px] text-subtle">{s.when}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Local SEO: your business, first in the local results. */
export function LocalSearchMock({ className = "" }: { className?: string }) {
  return (
    <div className={`${card} w-full max-w-[380px] overflow-hidden ${className}`}>
      <div className="relative h-28 bg-[#e8eee6]">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,.9) 2px, transparent 2px), linear-gradient(0deg, rgba(255,255,255,.9) 2px, transparent 2px)",
            backgroundSize: "44px 36px",
          }}
        />
        <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white shadow-lg">
          <MapPin className="h-4 w-4" />
        </span>
      </div>
      <div className="p-4">
        <p className="text-[15px]">Your Business</p>
        <p className="text-[13px] text-subtle">Open now · Near you</p>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {[
            { icon: Phone, label: "Call" },
            { icon: Navigation, label: "Directions" },
            { icon: Globe, label: "Website" },
          ].map((a) => (
            <span key={a.label} className="flex flex-col items-center gap-1 rounded-xl bg-surface py-2 text-[12px]">
              <a.icon className="h-4 w-4" />
              {a.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
