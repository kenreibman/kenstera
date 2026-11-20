"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

export interface StickyItem {
  title: string;
  body: string;
  /** Square art (588x588 at 1440). A function receives `active` so a live demo can replay. */
  media: ReactNode | ((active: boolean) => ReactNode);
}

/** Runs `media(true)` once its block has scrolled into view (used for the stacked mobile rows). */
function WhenVisible({ media }: { media: StickyItem["media"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className="h-full">{typeof media === "function" ? media(on) : media}</div>;
}

/**
 * Sticky content. Two equal columns: rows on the left (min-h 500, px 48 / py 72, hairline borders),
 * a square panel pinned 80px from the top on the right that cross-fades between each row's art
 * (opacity + scale 1.025 -> 1, 700ms). Below lg there is no sticky panel: each row shows its own art.
 */
export function StickyContent({ items }: { items: StickyItem[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, [items.length]);

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2">
      <div className="relative">
        {items.map((it, i) => (
          <div
            key={it.title}
            data-i={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="relative border-b border-black/5 pb-10 lg:min-h-[500px] lg:border-r lg:px-12 lg:py-[72px] lg:pb-[72px]"
          >
            <div className="flex flex-col gap-3 px-4 pt-12 md:px-12 lg:px-0 lg:pt-0">
              <h3 className="el-trim text-[24px] font-normal leading-8 tracking-[-0.24px] text-black">{it.title}</h3>
              <p className="el-trim mt-[14px] text-[17px] leading-[25px] tracking-[0.17px] text-subtle">{it.body}</p>
            </div>
            {/* Mobile: the row's own art. */}
            <div className="mx-4 mt-8 overflow-hidden rounded-2xl lg:hidden">
              <WhenVisible media={it.media} />
            </div>
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="hidden lg:sticky lg:top-20 lg:block lg:self-start">
          <div className="relative aspect-square w-full overflow-hidden">
            {items.map((it, i) => (
              <div
                key={it.title}
                aria-hidden={i !== active}
                className={`absolute inset-0 transform-gpu transition-all duration-700 ease-[cubic-bezier(0.31,0.325,0,0.92)] ${
                  i === active ? "scale-100 opacity-100" : "pointer-events-none scale-[1.025] opacity-0"
                }`}
              >
                {typeof it.media === "function" ? it.media(i === active) : it.media}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
