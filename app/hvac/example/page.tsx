import type { Metadata } from "next";
import { Button, Container } from "@/components/el/ui";
import { Reveal } from "@/components/el/motion";
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
      <section>
        <Container framed>
          <div className="fade-in-up pb-12 pt-14 sm:pb-20 sm:pt-24">
            <p className="mb-3 text-[16px] text-subtle">A 2-minute example</p>
            <h1 className="max-w-3xl text-[40px] leading-[1.06] text-black sm:text-[56px]">
              Here&rsquo;s what happens when you miss a call.
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-[1.5] text-black">
              One missed call, from 7:12 PM to the Google review. The shop and the customer are made up, so you can
              see how it would look for yours. Scroll to watch it play.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-hairline">
        <Container framed>
          <div className="py-10 sm:py-16">
            <ExampleTimeline />
          </div>
        </Container>
      </section>

      <section className="border-t border-hairline">
        <Container framed>
          <div className="py-16 sm:py-28">
            <Reveal>
              <div className="grad g-ember flex min-h-[340px] flex-col justify-end rounded-2xl p-7 sm:p-12">
                <h2 className="max-w-xl text-[34px] leading-[1.1] text-white sm:text-[48px]">
                  Want this set up for your shop?
                </h2>
                <p className="mt-3 max-w-md text-[17px] leading-[1.45] text-white/90">
                  Book 15 minutes and we&rsquo;ll talk it through.
                </p>
                <div className="mt-8 flex flex-col gap-2 sm:flex-row">
                  <Button href={HVAC_BOOK_HREF} variant="light" className="w-full sm:w-auto">
                    Book 15 minutes
                  </Button>
                  <a
                    href="/hvac"
                    className="inline-flex h-11 w-full items-center justify-center rounded-full px-5 text-[16px] text-white ring-1 ring-white/40 transition-colors hover:bg-white/10 sm:w-auto"
                  >
                    See everything it does
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
