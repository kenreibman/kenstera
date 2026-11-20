import Link from "next/link";
import type { ReactNode } from "react";

export interface BentoCard {
  title: string;
  description: string;
  /** Art. For `wide` cards it fills the whole card (copy sits over its left side); otherwise it sits at the bottom. */
  media: ReactNode;
  wide?: boolean;
  /** 512 for the short card beside the wide one, 560 for the row of three. Omit for natural height. */
  height?: 512 | 560;
  href?: string;
  /** Small gray line above the title (for example a service list). */
  meta?: string;
}

/**
 * Card grid. gap 12 (8 on mobile). 3 columns: row 1 = one wide card + one narrow, row 2 = three narrow.
 * 2 columns: equal cards. Card: 16px radius, #f5f3f1, overflow hidden, 0.5px inset ring overlay.
 * Copy uses the untrimmed f-* sizes: title 24/31.2, description 16/22.4.
 */
export function BentoGrid({ cards, columns = 3 }: { cards: BentoCard[]; columns?: 2 | 3 }) {
  return (
    <div className={`grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {cards.map((c) => {
        const copy = (
          <>
            {c.meta && <p className="mb-2 text-[14px] leading-[19.6px] text-subtle">{c.meta}</p>}
            <h3 className="mb-[18px] text-[24px] font-normal leading-[31.2px] tracking-[-0.24px] text-black">{c.title}</h3>
            <p className="text-[16px] leading-[22.4px] tracking-[0.16px] text-[#6e6e6e]">{c.description}</p>
          </>
        );
        const heightClass = c.height === 560 ? "lg:min-h-[560px]" : c.height === 512 ? "lg:min-h-[512px]" : "";
        return (
          <div
            key={c.title}
            className={`group relative flex flex-col justify-between gap-[100px] overflow-hidden rounded-2xl bg-surface ${
              c.wide ? "sm:col-span-2 lg:p-8" : ""
            } ${heightClass}`}
          >
            {c.wide ? (
              <>
                <div className="absolute inset-0">{c.media}</div>
                <div className="relative z-[1] flex flex-col justify-between gap-20 p-5 lg:flex-row lg:p-0">
                  <div className="flex basis-2/5 flex-col justify-between gap-8">
                    <div>{copy}</div>
                  </div>
                  <div className="basis-3/5" />
                </div>
              </>
            ) : (
              <div className="relative z-[1] flex h-full flex-col justify-between gap-20">
                <div className="px-5 pt-7">{copy}</div>
                <div className="relative w-full overflow-hidden">{c.media}</div>
              </div>
            )}
            {c.href && <Link href={c.href} aria-label={c.title} className="absolute inset-0 z-20" />}
            <div className="pointer-events-none absolute inset-0 z-30 rounded-2xl shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.075)]" />
          </div>
        );
      })}
    </div>
  );
}
