import type { Metadata } from "next";
import { Button } from "@/components/el/ui";
import { BlockSection, CtaBand } from "@/components/exact";
import { ExampleTimeline } from "@/components/hvac/ExampleTimeline";
import { HVAC_BOOK_HREF } from "@/components/hvac/links";

// This page is for owners who reply to the cold email, not for search.
export const metadata: Metadata = {
  title: "A 2-minute example",
  description: "What happens when your shop misses a call, from the call to the Google review.",
  robots: { index: false, follow: false },
};

export default function HvacExamplePage() {
  return (
    <main className="bg-page">
      <BlockSection bare className="pb-10 pt-16 lg:pb-14 lg:pt-24">
        <div className="grid grid-cols-12 gap-x-3">
          <div className="col-span-12 lg:col-span-7 lg:pr-5">
            <p className="el-trim mb-5 text-[14px] leading-[21px] tracking-[0.14px] text-subtle">A 2-minute example</p>
            <h1 className="el-trim text-[36px] leading-[42px] tracking-[-0.72px] text-black lg:text-[48px] lg:leading-[52px] lg:tracking-[-0.96px]">
              Here&rsquo;s what happens when you miss a call.
            </h1>
          </div>
          <div className="col-span-12 mt-8 flex flex-col lg:col-span-5 lg:mt-0 lg:pl-5">
            <p className="el-trim mt-auto text-balance text-[16px] leading-6 tracking-[0.16px] text-black lg:text-pretty">
              One missed call, from 7:12 PM to the Google review. The shop and the customer are made up, so you can see
              how it would look for yours. Scroll to watch it play.
            </p>
          </div>
        </div>
      </BlockSection>

      <BlockSection className="p-0">
        <ExampleTimeline />
      </BlockSection>

      <CtaBand title="Want this set up for your shop? Book 15 minutes and we'll talk it through.">
        <Button href={HVAC_BOOK_HREF}>Book 15 minutes</Button>
        <Button href="/hvac" variant="secondary">
          See everything it does
        </Button>
      </CtaBand>
    </main>
  );
}
