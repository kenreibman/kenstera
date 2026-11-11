"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Arrow, Leaf } from "@/components/brand/Leaf";
import { BOOKING_HREF, LEAKS, SYSTEMS } from "@/content/site";

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
        <label htmlFor={id} className="text-[15px] text-paper/80">{label}</label>
        <output htmlFor={id} className="font-mono text-[15px] text-lime">{format(value)}</output>
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
  const [picked, setPicked] = useState<string[]>(["missed-calls", "few-reviews"]);
  const [hours, setHours] = useState(12);
  const [rate, setRate] = useState(40);
  const [share, setShare] = useState(40);

  const chosen = useMemo(() => LEAKS.filter((l) => picked.includes(l.id)), [picked]);
  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const hoursBack = Math.round(hours * 52 * (share / 100));
  const valueBack = hoursBack * rate;

  return (
    <section id="planner" className="relative scroll-mt-0 bg-ink-2 py-24 text-paper md:py-36">
      <div className="wrap">
        <header className="reveal mb-14 grid gap-6 md:mb-20 md:grid-cols-12">
          <p className="label text-sage md:col-span-3">Garden planner</p>
          <div className="md:col-span-9">
            <h2 className="display text-[clamp(2.4rem,6.6vw,5.6rem)]">
              Where does your business <em className="text-lime">leak?</em>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sage">
              Pick what sounds familiar. We&apos;ll sketch the workflow that
              closes each gap, the same way we would on a first call.
            </p>
          </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="max-lg:contents lg:col-span-5">
            <div role="group" aria-label="Common problems" className="flex flex-wrap gap-2.5 max-lg:order-1">
              {LEAKS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  className="chip"
                  aria-pressed={picked.includes(l.id)}
                  onClick={() => toggle(l.id)}
                >
                  <span className="dot" />
                  {l.label}
                </button>
              ))}
            </div>

            {/* Honest maths: the visitor's own numbers, nothing implied. */}
            <div className="rounded-3xl border border-paper/12 bg-ink/60 p-6 max-lg:order-3 sm:p-8 lg:mt-12">
              <p className="label mb-6 text-sage">Your numbers, not ours</p>
              <div className="space-y-5">
                <Slider id="pl-hours" label="Hours a week on repetitive tasks" value={hours} min={1} max={60} step={1} onChange={setHours} format={(v) => `${v} h`} />
                <Slider id="pl-rate" label="What an hour of that time costs" value={rate} min={15} max={150} step={5} onChange={setRate} format={(v) => usd.format(v)} />
                <Slider id="pl-share" label="Share you think could be automated" value={share} min={10} max={80} step={5} onChange={setShare} format={(v) => `${v}%`} />
              </div>
              <div className="rule-dark mt-7 grid grid-cols-2 gap-4 pt-6" aria-live="polite">
                <div>
                  <p className="display text-4xl text-lime sm:text-5xl">{num.format(hoursBack)}</p>
                  <p className="mt-1 text-sm text-sage">hours back a year</p>
                </div>
                <div>
                  <p className="display text-4xl text-lime sm:text-5xl">{usd.format(valueBack)}</p>
                  <p className="mt-1 text-sm text-sage">of time, by your own estimate</p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-lg:order-2 lg:col-span-7">
            <div className="relative lg:min-h-[420px] pl-7 sm:pl-10">
              {/* the vine */}
              <div className="absolute bottom-0 left-2 top-2 w-px bg-gradient-to-b from-lime via-lime/50 to-transparent sm:left-3" aria-hidden="true" />

              {chosen.length === 0 && (
                <p className="display pt-6 text-3xl text-paper/50">
                  Nothing leaking? Lucky you. Pick one anyway.
                </p>
              )}

              <ul className="space-y-10">
                {chosen.map((l) => {
                  const sys = SYSTEMS.find((s) => s.id === l.system)!;
                  return (
                    <li key={l.id} className="relative">
                      <Leaf className="branch-step absolute -left-[34px] top-0 h-5 w-5 -rotate-[70deg] text-lime sm:-left-[42px]" />
                      <p className="label branch-step mb-4 text-sage">
                        {l.label} <span className="text-lime">→ {sys.part}</span>
                      </p>
                      <ol className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-y-3">
                        {l.steps.map((step, i) => (
                          <li key={step} className="flex items-center gap-2.5">
                            {i > 0 && (
                              <span
                                className="branch-twig hidden h-px w-6 bg-lime/60 sm:block"
                                style={{ ["--d" as string]: `${i * 0.12}s` }}
                                aria-hidden="true"
                              />
                            )}
                            <span
                              className={`branch-step rounded-2xl border px-4 py-2.5 text-[15px] leading-snug ${
                                i === l.steps.length - 1
                                  ? "border-lime bg-lime/10 text-lime"
                                  : "border-paper/15 bg-paper/[0.04] text-paper"
                              }`}
                              style={{ ["--d" as string]: `${i * 0.12 + 0.05}s` }}
                            >
                              <span className="mr-2 font-mono text-xs opacity-60">{i + 1}</span>
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </li>
                  );
                })}
              </ul>

              {chosen.length > 0 && (
                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <Link href={BOOKING_HREF} className="btn btn-lime">
                    Talk through {chosen.length === 1 ? "this one" : `these ${chosen.length}`} <Arrow />
                  </Link>
                  <p className="text-sm text-sage">15 minutes. No deck.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
