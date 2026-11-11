"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { Leaf } from "@/components/brand/Leaf";
import { CONTACT_EMAIL } from "@/content/site";

const EXPECT = [
  "We ask how your business actually runs, and where it leaks.",
  "You get a straight answer on whether we can help.",
  "If we can: a timeline and a quote before any work begins.",
];

export default function ContactPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "contact" });
      cal("on", {
        action: "__iframeReady",
        callback: () => {
          cal("ui", { hideEventTypeDetails: true, theme: "light", layout: "month_view" });
        },
      });
    })();
  }, []);

  return (
    <main id="main" className="relative z-[1] overflow-hidden pb-20 pt-32 md:pt-40">
      <Leaf veins className="pointer-events-none absolute -left-28 top-24 w-[460px] max-w-[70vw] -rotate-[22deg] text-moss/60" />
      <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="label fade-up mb-6 flex items-center gap-3 text-lime">
            <span className="inline-block h-px w-8 bg-lime" />
            Book a call
          </p>
          <h1 className="display text-[clamp(3rem,8vw,6.5rem)]">
            <span className="line-mask"><span>Fifteen minutes.</span></span>
            <span className="line-mask"><span style={{ ["--d" as string]: "0.12s" }}><em className="text-lime">No deck.</em></span></span>
          </h1>

          <ol className="fade-up mt-10 space-y-5" style={{ ["--d" as string]: "0.4s" }}>
            {EXPECT.map((e, i) => (
              <li key={e} className="flex gap-4 text-[17px] leading-relaxed text-paper/85">
                <span className="label pt-1.5 text-lime">0{i + 1}</span>
                {e}
              </li>
            ))}
          </ol>

          <p className="fade-up mt-10 text-sage" style={{ ["--d" as string]: "0.55s" }}>
            Prefer email?{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="nav-link text-paper">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="fade-up min-h-[560px] overflow-hidden rounded-[28px] bg-paper p-3 sm:p-6" style={{ ["--d" as string]: "0.3s", colorScheme: "light" }}>
            <Cal namespace="contact" calLink="kenstera/intake-15-minutes" style={{ width: "100%", minHeight: 520 }} />
          </div>
        </div>
      </div>
    </main>
  );
}
