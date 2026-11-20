"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

export interface MediaTab {
  id: string;
  label: string;
  icon?: ReactNode;
  /** The art. A function receives `active` so a live demo can replay when its tab is current. */
  media: ReactNode | ((active: boolean) => ReactNode);
}

/**
 * Hero media card with notch tabs. Rounded-3xl card at 2:1 on a warm backdrop; art cross-fades
 * (700ms, cubic-bezier(.31,.325,0,.92)). Under it the bottom outline dips into a notch with 20px
 * curved corners and the tab pill sits in the gap. `autoAdvanceMs` rotates tabs while the card
 * is on screen until the visitor picks one.
 */
export function HeroMedia({
  tabs,
  autoAdvanceMs,
  label = "Highlights",
  className = "",
}: {
  tabs: MediaTab[];
  autoAdvanceMs?: number;
  label?: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(Boolean(autoAdvanceMs));
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !visible || !autoAdvanceMs) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % tabs.length), autoAdvanceMs);
    return () => clearTimeout(t);
  }, [active, auto, visible, autoAdvanceMs, tabs.length]);

  return (
    <div ref={ref} className={`px-4 py-4 ${className}`}>
      <div className="relative z-[2] flex min-h-[560px] items-center justify-center overflow-hidden rounded-3xl md:aspect-[2/1] md:min-h-0">
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full rounded-xl bg-[#f7f4f2]" />
        </div>
        {tabs.map((t, i) => (
          <div
            key={t.id}
            id={`hero-panel-${t.id}`}
            role="tabpanel"
            aria-hidden={i !== active}
            className={`absolute inset-0 z-10 transform-gpu transition-all duration-700 ease-[cubic-bezier(0.31,0.325,0,0.92)] ${
              i === active ? "scale-100 opacity-100" : "pointer-events-none scale-[1.025] opacity-0"
            }`}
          >
            {typeof t.media === "function" ? t.media(i === active && visible) : t.media}
          </div>
        ))}
      </div>

      {/* The notch: curved outline under the card with the pill sitting in it. */}
      <div className="relative mx-auto mb-5 flex h-12 max-w-4xl px-8">
        <div className="h-12 min-w-5 flex-grow rounded-bl-[20px] border-b border-l border-black/5" />
        <div className="relative flex translate-y-1/2 justify-center bg-page">
          <div role="tablist" aria-label={label} className="grid h-11 grid-flow-col rounded-full shadow-[inset_0_0_0_0.5px_#d7d2cc]">
            {tabs.map((t, i) => {
              const on = i === active;
              return (
                <button
                  key={t.id}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls={`hero-panel-${t.id}`}
                  onClick={() => {
                    setActive(i);
                    setAuto(false);
                  }}
                  className={`flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 text-[16px] transition-[background-color,color,box-shadow] duration-150 lg:px-5 ${
                    on ? "bg-white text-black shadow-[0_0_0_0.5px_#d7d2cc]" : "text-subtle hover:text-black"
                  }`}
                >
                  {t.icon}
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="h-12 min-w-5 flex-grow rounded-br-[20px] border-b border-r border-black/5" />
      </div>
    </div>
  );
}
