'use client'

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function CalEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"intake-15-minutes"});
      cal("ui", {"theme":"light","hideEventTypeDetails":true,"layout":"month_view"});
    })();
  }, [])
  return <Cal namespace="intake-15-minutes"
    calLink="kenstera/intake-15-minutes"
    style={{width:"100%",height:"100%",overflow:"scroll"}}
    config={{"layout":"month_view","theme":"light","hideEventTypeDetails":"true"}}
  />;
}

export default function Hero() {
  return (
    <section className="relative pt-16 pb-12">
      <div className="w-full max-w-[1120px] mx-auto px-5">
        <div className="mx-auto text-center">
          <p className="text-[15px] font-medium text-gray-500 mb-5">
            Personal injury firms looking to scale their intake
          </p>

          <h1 className="text-[clamp(32px,6vw,48px)] font-bold leading-[1.15] mb-6 text-gray-900">
            Never miss a quality case. We specialize in Intake Optimization for PI Firms.
          </h1>

          <p className="text-lg text-red-600 font-medium mb-8">
            Book a call to see how it works for your firm 👇
          </p>

          <CalEmbed />
        </div>
      </div>
    </section>
  )
}
