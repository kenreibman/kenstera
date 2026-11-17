"use client";

import { useState } from "react";
import { Button, Container, GradientCard } from "@/components/el/ui";
import { HOME_SERVICES, type MockKind } from "./services";
import { CampaignMock, LocalSearchMock, ReviewMock, TextBackMock, WebsiteMock } from "./mocks";

const MOCKS: Record<MockKind, () => React.ReactElement> = {
  website: () => <WebsiteMock className="max-w-[520px]" priority />,
  textback: () => <TextBackMock />,
  review: () => <ReviewMock />,
  campaign: () => <CampaignMock />,
  local: () => <LocalSearchMock />,
};

/**
 * Hero in the elevenlabs.io pattern: headline and buttons on the left, a
 * statement on the right, then a tabbed tray. Each tab shows what that
 * service actually looks like, on a grainy gradient.
 */
export function HomeHero() {
  const [active, setActive] = useState(0);
  const current = HOME_SERVICES[active];
  const Mock = MOCKS[current.mock];

  return (
    <section>
      <Container framed>
        <div className="grid gap-8 pb-12 pt-16 sm:pt-24 md:grid-cols-2 md:gap-12">
          <div>
            <h1 className="text-[44px] leading-[1.08] text-black sm:text-[52px]">
              Rapid growth
              <br />
              for business
            </h1>
            <div className="mt-7 flex flex-wrap gap-2">
              <Button href="/contact-sales">Contact us</Button>
              <Button href="#services" variant="secondary">
                What we do
              </Button>
            </div>
          </div>
          <p className="max-w-[520px] text-[17px] leading-[1.45] text-black md:pt-9">
            Kenstera builds high-converting websites, workflow automations, and marketing systems that
            drive rapid, predictable growth for your business.
          </p>
        </div>

        <div className="mb-20 rounded-2xl bg-surface p-1.5 ring-hairline sm:mb-28">
          <div role="tablist" aria-label="Services" className="scrollbar-hide flex gap-1 overflow-x-auto">
            {HOME_SERVICES.map((s, i) => (
              <button
                key={s.title}
                type="button"
                role="tab"
                id={`hero-tab-${i}`}
                aria-controls="hero-panel"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`flex h-11 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 text-[15px] transition-colors ${
                  i === active ? "ring-hairline bg-white text-black" : "text-black/60 hover:text-black"
                }`}
              >
                <span className={`grad g-${s.palette} h-3 w-3 rounded-full`} aria-hidden="true" />
                {s.short}
              </button>
            ))}
          </div>

          <div id="hero-panel" role="tabpanel" aria-labelledby={`hero-tab-${active}`} className="mt-1.5">
            <GradientCard
              key={current.title}
              palette={current.palette}
              label={current.title}
              caption={current.description}
              className="min-h-[440px] sm:min-h-[500px]"
            >
              <div className="fade-in-up flex w-full justify-center">
                <Mock />
              </div>
            </GradientCard>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HomeHero;
