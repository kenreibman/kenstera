"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BOOKING_HREF, LEAKS } from "@/content/site";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const num = new Intl.NumberFormat("en-US");

function Slider({
  id, label, value, min, max, step, onChange, format,
}: {
  id: string; label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; format: (v: number) => string;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[15px] text-paper/75">{label}</label>
        <output htmlFor={id} className="text-[15px] font-medium text-paper">{format(value)}</output>
      </div>
      <input
        id={id}
        type="range"
        className="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--fill" as string]: `${fill}%` }}
      />
    </div>
  );
}

export function Planner() {
  const [picked, setPicked] = useState<string[]>(["missed-calls"]);
  const [hours, setHours] = useState(12);
  const [rate, setRate] = useState(40);
  const [share, setShare] = useState(40);

  const chosen = useMemo(() => LEAKS.filter((l) => picked.includes(l.id)), [picked]);
  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const hoursBack = Math.round(hours * 52 * (share / 100));
  const valueBack = hoursBack * rate;

  return (
    <section id="planner" className="section relative scroll-mt-10 bg-ink-2 text-paper">
      <div className="wrap max-w-[860px]">
        <header className="reveal mb-12 text-center">
          <h2 className="display h2">Where does your business leak?</h2>
          <p className="lede mx-auto mt-5 max-w-[40ch] text-sage">
            Pick what sounds familiar. See how we&apos;d fix it.
          </p>
        </header>

        <div role="group" aria-label="Common problems" className="flex flex-wrap justify-center gap-2.5">
          {LEAKS.map((l) => (
            <button key={l.id} type="button" className="chip" aria-pressed={picked.includes(l.id)} onClick={() => toggle(l.id)}>
              {l.label}
            </button>
          ))}
        </div>

        <ul className="mt-10 space-y-4" aria-live="polite">
          {chosen.map((l) => (
            <li key={l.id} className="step-in rounded-[28px] bg-white/[0.06] p-7 sm:p-9">
              <h3 className="h3">{l.label}</h3>
              <ol className="mt-5 flex flex-col gap-x-3 gap-y-2 text-[17px] text-paper/80 sm:flex-row sm:flex-wrap sm:items-center">
                {l.steps.map((step, i) => (
                  <li key={step} className="step-in flex items-center gap-3" style={{ ["--d" as string]: `${i * 0.08}s` }}>
                    {i > 0 && <span className="text-lime max-sm:hidden" aria-hidden="true">→</span>}
                    <span className={i === l.steps.length - 1 ? "font-medium text-lime" : ""}>{step}</span>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>

        {/* The visitor's own numbers. Nothing implied. */}
        <div className="mt-4 rounded-[28px] bg-white/[0.06] p-7 sm:p-9">
          <h3 className="h3">What is the busywork costing you?</h3>
          <div className="mt-7 grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="space-y-5">
              <Slider id="pl-hours" label="Hours a week on repetitive tasks" value={hours} min={1} max={60} step={1} onChange={setHours} format={(v) => `${v} h`} />
              <Slider id="pl-rate" label="Cost of an hour of that time" value={rate} min={15} max={150} step={5} onChange={setRate} format={(v) => usd.format(v)} />
              <Slider id="pl-share" label="Share you think could be automated" value={share} min={10} max={80} step={5} onChange={setShare} format={(v) => `${v}%`} />
            </div>
            <div className="flex flex-col justify-center gap-6" aria-live="polite">
              <div>
                <p className="display text-[clamp(2.75rem,6vw,4.5rem)] text-lime">{num.format(hoursBack)}</p>
                <p className="mt-1 text-[15px] text-sage">hours back a year</p>
              </div>
              <div>
                <p className="display text-[clamp(2.75rem,6vw,4.5rem)] text-lime">{usd.format(valueBack)}</p>
                <p className="mt-1 text-[15px] text-sage">of time, by your own estimate</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center">
          <Link href={BOOKING_HREF} className="btn btn-lime">
            Talk it through
          </Link>
        </p>
      </div>
    </section>
  );
}
