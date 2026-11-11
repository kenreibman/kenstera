import Link from "next/link";
import { Arrow, Leaf } from "@/components/brand/Leaf";
import { BOOKING_HREF, CAPABILITIES } from "@/content/site";

export function Hero() {
  return (
    <section data-scene-window className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="hero-scrim pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Static leaf for devices without WebGL */}
      <Leaf
        veins
        className="scene-fallback-leaf pointer-events-none absolute -right-[12%] top-[16%] w-[70%] max-w-[620px] rotate-[14deg] text-leaf/50 md:right-[4%] md:w-[38%]"
      />

      <div className="wrap relative flex flex-1 flex-col justify-end pb-10 pt-32 md:justify-center md:pb-24">
        <p className="label fade-up mb-6 flex items-center gap-3 text-lime" style={{ ["--d" as string]: "0.1s" }}>
          <span className="inline-block h-px w-8 bg-lime" />
          Business automation, grown to order
        </p>

        <h1 className="display text-[clamp(3.5rem,13.5vw,10.5rem)] text-paper md:max-w-[9ch]">
          <span className="line-mask">
            <span style={{ ["--d" as string]: "0.15s" }}>Make your</span>
          </span>
          <span className="line-mask">
            <span style={{ ["--d" as string]: "0.27s" }}>business</span>
          </span>
          <span className="line-mask">
            <span style={{ ["--d" as string]: "0.39s" }}>
              <em className="text-lime">thrive.</em>
            </span>
          </span>
        </h1>

        <div className="mt-8 grid gap-8 md:mt-10 md:max-w-xl">
          <p className="fade-up text-[17px] leading-relaxed text-paper/85 sm:text-lg" style={{ ["--d" as string]: "0.7s" }}>
            Kenstera builds the websites, automations, and follow-up systems that
            catch every lead, answer every inquiry, and take the busywork off
            your team. So growth stops depending on someone remembering.
          </p>
          <div className="fade-up flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "0.85s" }}>
            <Link href={BOOKING_HREF} className="btn btn-lime">
              Book a 15-minute call <Arrow />
            </Link>
            <a href="#systems" className="btn btn-ghost">
              See what we grow
            </a>
          </div>
        </div>
      </div>

      <p className="label hero-hint pointer-events-none absolute bottom-24 right-[var(--gutter)] hidden text-sage lg:block" aria-hidden="true">
        Move your cursor. The light follows.
      </p>

      {/* Capability ticker */}
      <div className="rule-dark relative overflow-hidden bg-ink/40 py-4 backdrop-blur-sm" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex shrink-0 items-center">
              {CAPABILITIES.map((c) => (
                <li key={c} className="label flex items-center gap-6 pl-6 text-paper/70">
                  {c}
                  <Leaf className="h-3 w-3 text-lime/70" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
