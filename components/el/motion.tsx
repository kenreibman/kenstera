"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Palette } from "./ui";

/* Motion primitives modeled on the interactions on elevenlabs.io:
   scroll reveals, a scroll-driven text fill, a sticky panel that swaps while
   the copy scrolls, and timed sequences that play when they come into view. */

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True once the element has been on screen. */
export function useInView<T extends Element>(options?: IntersectionObserverInit, once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) io.disconnect();
      } else if (!once) {
        setInView(false);
      }
    }, options ?? { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView] as const;
}

/** Fade and rise into place when scrolled to. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  const Component = Tag as "div";
  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}

/**
 * Statement whose words fill from gray to black as the section scrolls
 * through the viewport, like the big paragraphs on elevenlabs.io.
 */
export function ScrollText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const words = text.split(" ");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block enters the lower third, 1 once its end passes the upper third.
      const start = vh * 0.85;
      const end = vh * 0.3;
      const p = (start - r.top) / (start - end + r.height * 0.6);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const on = progress * words.length > i;
        return (
          <span key={i} className="transition-colors duration-300" style={{ color: on ? "#000" : "rgba(0,0,0,0.45)" }}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}

/**
 * Plays a timed sequence. Returns how many steps have fired. Restarts from
 * zero every time `run` flips to true; shows everything at once for people who
 * prefer reduced motion.
 */
export function useSequence(run: boolean, times: number[]) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!run) {
      setStep(0);
      return;
    }
    if (prefersReducedMotion()) {
      setStep(times.length);
      return;
    }
    setStep(0);
    const timers = times.map((t, i) => window.setTimeout(() => setStep(i + 1), t));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);
  return step;
}

export interface FeatureItem {
  label: string;
  title: string;
  body: string;
  palette: Palette;
  /** Rendered in the panel. Receives whether this item is the active one. */
  visual: (active: boolean) => ReactNode;
}

/**
 * Left column of copy scrolls; a gradient product panel stays pinned on the
 * right and swaps to match, as on the elevenlabs.io /studio feature rows.
 * Below `lg` every item shows its own panel inline.
 */
export function StickyFeatures({ items }: { items: FeatureItem[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Desktop: pinned panel */}
      <div className="hidden gap-12 lg:grid lg:grid-cols-12">
        <div className="col-span-5">
          {items.map((item, i) => (
            <div
              key={item.title}
              data-index={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="flex min-h-[78vh] flex-col justify-center"
            >
              <div
                className={`transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-35"}`}
              >
                <p className="mb-3 text-[16px] text-subtle">{item.label}</p>
                <h3 className="text-[34px] font-normal leading-[1.12] tracking-[-0.012em] text-black">{item.title}</h3>
                <p className="mt-4 max-w-md text-[17px] leading-[1.5] text-subtle">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-7">
          <div className="sticky top-32 h-[min(600px,calc(100vh-10rem))]">
            {items.map((item, i) => (
              <div
                key={item.title}
                aria-hidden={active !== i}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  active === i ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                {/* .grad sets position: relative, so it can't carry the absolute positioning. */}
                <div className={`grad g-${item.palette} flex h-full w-full items-center justify-center rounded-2xl p-8`}>
                  <div className="relative flex w-full items-center justify-center">{item.visual(active === i)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile and tablet: stacked */}
      <div className="space-y-16 lg:hidden">
        {items.map((item) => (
          <Reveal key={item.title}>
            <p className="mb-3 text-[16px] text-subtle">{item.label}</p>
            <h3 className="text-[28px] font-normal leading-[1.15] tracking-[-0.012em] text-black">{item.title}</h3>
            <p className="mt-3 max-w-md text-[16px] leading-[1.5] text-subtle">{item.body}</p>
            <div
              className={`grad g-${item.palette} mt-6 flex min-h-[400px] items-center justify-center rounded-2xl p-6`}
            >
              <MobileVisual item={item} />
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}

/** On small screens a visual plays once its card is on screen. */
function MobileVisual({ item }: { item: FeatureItem }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.5 });
  return (
    <div ref={ref} className="relative flex w-full items-center justify-center">
      {item.visual(inView)}
    </div>
  );
}
