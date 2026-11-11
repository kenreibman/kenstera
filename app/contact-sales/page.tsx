"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { CONTACT_EMAIL } from "@/content/site";

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
    <main id="main" className="relative z-[1] pb-24 pt-[clamp(112px,16vh,170px)]">
      <div className="wrap text-center">
        <h1 className="display h1 fade-up">Book a call.</h1>
        <p className="lede fade-up mx-auto mt-5 max-w-[40ch] text-paper/80" style={{ ["--d" as string]: "0.12s" }}>
          Fifteen minutes. Tell us where the business leaks, and you&apos;ll get
          a straight answer on whether we can help.
        </p>

        <div
          className="fade-up mx-auto mt-12 min-h-[560px] max-w-[900px] overflow-hidden rounded-[28px] bg-white p-3 sm:p-6"
          style={{ ["--d" as string]: "0.24s", colorScheme: "light" }}
        >
          <Cal namespace="contact" calLink="kenstera/intake-15-minutes" style={{ width: "100%", minHeight: 520 }} />
        </div>

        <p className="mt-8 text-[15px] text-sage">
          Prefer email?{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-paper hover:underline">
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </main>
  );
}
