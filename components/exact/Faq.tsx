"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  q: string;
  a: ReactNode;
}

/**
 * FAQ. 12-col grid: title col-span-4, list col-span-8. Row: question 17/25 (py-5), 20px chevron
 * #a59f97 -> black on hover, 2px dotted divider (1px dots at 15% black, 6px apart), answer height
 * animates 800ms cubic-bezier(.16,1,.3,1) with a 12px mask fade; the content fades and rises 8px in 200ms.
 */
export function ElFaq({
  title = "Frequently asked questions",
  items,
  defaultOpen,
}: {
  title?: string;
  items: FaqItem[];
  defaultOpen?: number;
}) {
  return (
    <div className="-mx-6 grid grid-cols-12 gap-x-3 px-3 lg:-mx-8">
      <h2 className="el-trim col-span-12 mb-12 px-5 text-[26px] leading-8 text-black lg:col-span-4 lg:mb-0 lg:text-[32px] lg:leading-9 lg:tracking-[-0.03em]">
        {title}
      </h2>
      <div className="col-span-12 px-5 lg:col-span-8">
        <div className="flow-root">
          {items.map((it, i) => (
            <Row key={it.q} item={it} first={i === 0} startOpen={i === defaultOpen} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ item, first, startOpen }: { item: FaqItem; first: boolean; startOpen: boolean }) {
  const [open, setOpen] = useState(startOpen);
  const [h, setH] = useState(0);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = inner.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(el.scrollHeight));
    ro.observe(el);
    setH(el.scrollHeight);
    return () => ro.disconnect();
  }, []);

  return (
    <div className={`group relative isolate ${first ? "-mt-5" : ""}`}>
      <h3 className="relative z-50">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="group/trigger relative w-full rounded text-left outline-none focus-visible:ring-2 focus-visible:ring-black/30"
        >
          <div className="flex gap-4">
            <div className="el-trim flex-auto py-5 text-[17px] font-normal leading-[25px] tracking-[0.17px] text-black">{item.q}</div>
            <div className="relative mt-4 size-5 flex-none text-[#a59f97] transition-colors duration-150 group-hover/trigger:text-black">
              <ChevronDown className={`size-full transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </div>
          </div>
          <div
            aria-hidden
            className="absolute bottom-0 left-0 h-[2px] w-full"
            style={{
              backgroundImage:
                "repeating-radial-gradient(circle, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 6px)",
              backgroundSize: "6px 100%",
            }}
          />
        </button>
      </h3>
      <div
        className="overflow-hidden motion-safe:transition-[height] motion-safe:duration-[800ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          height: open ? h : 0,
          maskImage: "linear-gradient(rgb(0,0,0) calc(100% - 12px), rgba(0,0,0,0))",
          WebkitMaskImage: "linear-gradient(rgb(0,0,0) calc(100% - 12px), rgba(0,0,0,0))",
        }}
        aria-hidden={!open}
      >
        <div
          ref={inner}
          className={`pb-8 pt-2 text-[16px] leading-6 tracking-[0.16px] text-subtle motion-safe:transition-[opacity,transform] motion-safe:duration-200 motion-safe:ease-out ${
            open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          {item.a}
        </div>
      </div>
    </div>
  );
}
