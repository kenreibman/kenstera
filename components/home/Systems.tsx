"use client";

import { useEffect, useRef, useState } from "react";
import { SYSTEMS, type SystemId } from "@/content/site";
import { Anatomy } from "./Anatomy";

export function Systems() {
  const [active, setActive] = useState<SystemId>("roots");
  const blocks = useRef<(HTMLElement | null)[]>([]);

  // Whichever block crosses the middle of the viewport lights up its part.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.getAttribute("data-id") as SystemId);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    blocks.current.forEach((b) => b && io.observe(b));
    return () => io.disconnect();
  }, []);

  return (
    <section id="systems" className="on-paper scroll-mt-0 rounded-t-[28px] pb-24 pt-20 md:rounded-t-[48px] md:pb-36 md:pt-32">
      <div className="wrap">
        <header className="reveal mb-14 grid gap-6 md:mb-24 md:grid-cols-12">
          <p className="label text-stone md:col-span-3">The anatomy of growth</p>
          <div className="md:col-span-9">
            <h2 className="display text-[clamp(2.4rem,6.6vw,5.6rem)]">
              Four systems. <em className="text-clay">One living thing.</em>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone">
              A plant doesn&apos;t grow one part at a time, and neither does a
              business. Each system feeds the next, so we design them to work
              together from the roots up.
            </p>
          </div>
        </header>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <Anatomy active={active} className="mx-auto hidden h-auto w-full max-w-[440px] lg:block" />
              <Anatomy active={null} className="mx-auto h-auto w-[78%] max-w-[340px] lg:hidden" />
            </div>
          </div>

          <ol className="lg:col-span-7">
            {SYSTEMS.map((s, i) => (
              <li
                key={s.id}
                data-id={s.id}
                data-on={active === s.id ? "true" : "false"}
                ref={(el) => { blocks.current[i] = el; }}
                className="system-block rule py-12 first:border-t-0 first:pt-0 lg:min-h-[62vh] lg:py-16"
              >
                <p className="label mb-5 flex items-center gap-3 text-clay">
                  <span>0{i + 1}</span>
                  <span className="h-px w-6 bg-clay" />
                  <span>
                    {s.part} <span className="normal-case tracking-normal text-stone">({s.latin})</span>
                  </span>
                </p>
                <h3 className="display text-[clamp(1.9rem,4.2vw,3.4rem)]">{s.title}</h3>
                <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-stone">{s.summary}</p>

                <dl className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-3">
                  {s.items.map((it) => (
                    <div key={it.name} className="border-t border-bark/20 pt-4">
                      <dt className="font-semibold tracking-[-0.01em]">{it.name}</dt>
                      <dd className="mt-2 text-[15px] leading-relaxed text-stone">{it.detail}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
