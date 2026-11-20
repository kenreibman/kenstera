"use client";

import { Button } from "@/components/el/ui";
import { BlockSection, HeroMedia, type MediaTab } from "@/components/exact";
import { HOME_SERVICES, type HomeService } from "./services";
import { LIVE_MOCKS } from "./live";

const ROTATE_MS = 7000;

/** One tab's art: a painted gradient with the live product demo and a white caption. */
function HeroArt({ service, run }: { service: HomeService; run: boolean }) {
  return (
    <div className={`grad g-${service.palette} h-full w-full`}>
      <div className="flex h-full w-full items-center justify-center px-8 py-6">{LIVE_MOCKS[service.mock](run)}</div>
      <div className="absolute bottom-0 left-0 z-10 max-w-[340px] p-10">
        <p className="text-[15px] text-white/80">{service.title}</p>
        <p className="mt-1 text-[16px] leading-[1.4] text-white">{service.description}</p>
      </div>
    </div>
  );
}

const TABS: MediaTab[] = HOME_SERVICES.map((s) => ({
  id: s.mock,
  label: s.short,
  icon: <span className={`grad g-${s.palette} h-3 w-3 rounded-full`} aria-hidden="true" />,
  media: (run: boolean) => <HeroArt service={s} run={run} />,
}));

/**
 * Hero in the exact elevenlabs.io layout: borderless block with the headline and buttons on the
 * left, a short paragraph on the right (columns 7-12), then the media card with notch tabs.
 * The card is hidden on phones because the sticky rows below show the same demos.
 */
export function HomeHero() {
  return (
    <>
      <BlockSection bare className="pb-6 pt-16 lg:pb-10 lg:pt-24">
        <div className="grid grid-cols-12 gap-x-3">
          <div className="contents lg:col-span-6 lg:block lg:pr-5">
            <h1 className="el-trim col-span-12 text-[36px] leading-[42px] tracking-[-0.72px] text-black lg:text-[48px] lg:leading-[52px] lg:tracking-[-0.96px]">
              Rapid growth
              <br />
              for business
            </h1>
            <div className="order-last col-span-12 mt-8 flex flex-wrap gap-2">
              <Button href="/contact">Contact us</Button>
              <Button href="#services" variant="secondary">
                What we do
              </Button>
            </div>
          </div>
          <div className="col-span-12 mt-8 flex flex-col lg:col-span-6 lg:mt-0 lg:pl-5">
            <p className="el-trim mt-auto text-balance text-[16px] leading-6 tracking-[0.16px] text-black lg:text-pretty">
              Kenstera builds high-converting websites, workflow automations, and marketing systems that drive
              rapid, predictable growth for your business.
            </p>
          </div>
        </div>
      </BlockSection>

      <BlockSection className="p-0" containerClassName="mt-[52px]" sectionClassName="hidden md:block">
        <HeroMedia tabs={TABS} autoAdvanceMs={ROTATE_MS} label="Services" />
      </BlockSection>
    </>
  );
}

export default HomeHero;
