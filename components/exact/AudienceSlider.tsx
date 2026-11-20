"use client";
import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function IconButton({ children, label, onClick }: { children: ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="relative inline-flex size-8 items-center justify-center rounded-full bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.125)] transition-[background-color,opacity] duration-150 hover:bg-surface"
    >
      <span className="absolute -inset-4" aria-hidden />
      {children}
    </button>
  );
}

export interface AudienceItem {
  title: string;
  description: string;
  /** Square art, 376px at desktop. */
  media: ReactNode;
}

/**
 * Tabbed asset slider (COMPONENTS.md section 8). Snap-scroll row of 376px cards, 12px gap.
 * Tile: aspect-square, 20px radius, 1px #e5e5e5 outline. Title 18/25.2, copy 14/19.6 #6e6e6e, 3 lines.
 * Arrows are 32px white circles at -48px outside, visible on hover (hover devices only).
 */
export function AudienceSlider({ items }: { items: AudienceItem[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const by = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * 388, behavior: "smooth" });
  return (
    <div className="group/scroll-grid relative -mx-3 flow-root">
      <div className="absolute -left-12 top-1/2 z-10 -mt-4 hidden opacity-0 transition-opacity duration-150 can-hover:block group-hover/scroll-grid:opacity-100">
        <IconButton label="Previous" onClick={() => by(-1)}><ChevronLeft className="size-4" /></IconButton>
      </div>
      <div className="absolute -right-12 top-1/2 z-10 -mt-4 hidden opacity-0 transition-opacity duration-150 can-hover:block group-hover/scroll-grid:opacity-100">
        <IconButton label="Next" onClick={() => by(1)}><ChevronRight className="size-4" /></IconButton>
      </div>
      <div className="-my-6 overflow-hidden rounded-sm py-6">
        <ul
          ref={ref}
          className="-my-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-3 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((it) => (
            <li key={it.title} className="w-[300px] flex-none snap-start sm:w-[376px]">
              <div className="flex h-full flex-col">
                <div className="relative flex aspect-square flex-1 items-center justify-center overflow-hidden rounded-[20px] border border-[#e5e5e5]">
                  {it.media}
                </div>
                <div className="relative z-10 mt-5 flex flex-col gap-1 px-3 text-left">
                  <h4 className="text-[18px] leading-[25.2px] text-black">{it.title}</h4>
                  <p className="line-clamp-3 text-balance text-[14px] leading-[19.6px] text-[#6e6e6e]">{it.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
