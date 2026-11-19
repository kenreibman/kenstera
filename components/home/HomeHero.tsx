"use client";

import { useEffect, useState } from "react";
import { Button, Container, GradientCard } from "@/components/el/ui";
import { useInView } from "@/components/el/motion";
import { HOME_SERVICES } from "./services";
import { LIVE_MOCKS } from "./live";

const ROTATE_MS = 7000;

/**
 * Hero in the elevenlabs.io pattern: headline and buttons on the left, a
 * statement on the right, then a tabbed tray. Each tab plays what that
 * service looks like, on a grainy gradient. Tabs advance on their own until
 * the visitor picks one.
 */
export function HomeHero() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 }, false);
  const current = HOME_SERVICES[active];

  useEffect(() => {
    if (!auto || !inView) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % HOME_SERVICES.length), ROTATE_MS);
    return () => clearTimeout(t);
  }, [active, auto, inView]);

  return (
    <section>
      <Container framed>
        <div className="grid gap-8 pb-12 pt-16 sm:pt-24 md:grid-cols-2 md:gap-12">
          <div>
            <h1 className="text-[46px] leading-[1.04] text-black sm:text-[60px]">
              Rapid growth
              <br />
              for business
            </h1>
            <div className="mt-8 flex flex-wrap gap-2">
              <Button href="/contact">Contact us</Button>
              <Button href="#services" variant="secondary">
                What we do
              </Button>
            </div>
          </div>
          <p
            className="max-w-[520px] text-[17px] leading-[1.45] text-black md:pt-3"
          >
            Kenstera builds high-converting websites, workflow automations, and marketing systems that
            drive rapid, predictable growth for your business.
          </p>
        </div>

        <div
          ref={ref}
          className="fade-in-up mb-20 hidden rounded-2xl bg-surface p-1.5 ring-hairline md:block sm:mb-28"
          style={{ animationDelay: "240ms" }}
        >
          <div role="tablist" aria-label="Services" className="scrollbar-hide flex gap-1 overflow-x-auto">
            {HOME_SERVICES.map((s, i) => (
              <button
                key={s.title}
                type="button"
                role="tab"
                id={`hero-tab-${i}`}
                aria-controls="hero-panel"
                aria-selected={i === active}
                onClick={() => {
                  setActive(i);
                  setAuto(false);
                }}
                className={`relative flex h-11 flex-1 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-xl px-4 text-[15px] transition-colors ${
                  i === active ? "ring-hairline bg-white text-black" : "text-black/60 hover:text-black"
                }`}
              >
                <span className={`grad g-${s.palette} h-3 w-3 rounded-full`} aria-hidden="true" />
                {s.short}
                {i === active && auto && inView && (
                  <span
                    key={`${active}-bar`}
                    aria-hidden="true"
                    className="absolute inset-x-3 bottom-0 h-[2px] origin-left bg-black/70"
                    style={{ animation: `tab-progress ${ROTATE_MS}ms linear forwards` }}
                  />
                )}
              </button>
            ))}
          </div>

          <div id="hero-panel" role="tabpanel" aria-labelledby={`hero-tab-${active}`} className="mt-1.5">
            <GradientCard
              key={current.title}
              palette={current.palette}
              label={current.title}
              caption={current.description}
              className="min-h-[460px] sm:min-h-[520px]"
            >
              <div className="fade-in-up flex w-full justify-center">{LIVE_MOCKS[current.mock](inView)}</div>
            </GradientCard>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HomeHero;
