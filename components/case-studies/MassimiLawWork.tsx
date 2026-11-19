"use client";

import Image from "next/image";
import { StickyFeatures, type FeatureItem } from "@/components/el/motion";

/*
 * The MassimiLaw case study showcase. Every visual is a real screenshot of the
 * live site, massimilaw.com, in a browser frame. Nothing here is invented.
 */

function SiteFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="ring-hairline w-full max-w-[560px] overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-1.5 border-b border-hairline px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        <span className="ml-3 rounded-full bg-surface px-3 py-0.5 text-[12px] text-subtle">massimilaw.com</span>
      </div>
      <Image src={src} alt={alt} width={1440} height={900} sizes="(min-width: 1024px) 560px, 90vw" className="h-auto w-full" />
    </div>
  );
}

const ITEMS: FeatureItem[] = [
  {
    label: "1. The front page",
    title: "A clear first impression",
    body: "A plain-spoken headline, a phone number and a Call Now button that stay at the top of every page, and a free consultation button right under the intro. Someone who lands here can act in seconds.",
    palette: "dusk",
    visual: () => <SiteFrame src="/images/clients/massimilaw-home.webp" alt="MassimiLaw homepage with the headline 'We deliver results that are worth your trust'" />,
  },
  {
    label: "2. Practice areas",
    title: "16 practice-area pages, easy to scan",
    body: "Ten employment law topics and six civil rights topics, each with its own page, laid out as a simple grid so a visitor can find their situation at a glance. If theirs isn't listed, a line invites them to get in touch.",
    palette: "moss",
    visual: () => <SiteFrame src="/images/clients/massimilaw-practice.webp" alt="MassimiLaw practice areas grid covering employment law and civil rights" />,
  },
  {
    label: "3. Free consultation",
    title: "One obvious next step",
    body: "A free case evaluation section with a click-to-call button, the firm's hours, what the consultation covers, and an answer to what happens when you call. No forms to fill in first.",
    palette: "ember",
    visual: () => <SiteFrame src="/images/clients/massimilaw-consult.webp" alt="MassimiLaw free case evaluation section with a call button" />,
  },
  {
    label: "4. How it works",
    title: "A path people can picture",
    body: "Four steps from the free consultation to resolution, so people know what working with the firm looks like before they ever call. An FAQ below answers the questions potential clients ask most.",
    palette: "iris",
    visual: () => <SiteFrame src="/images/clients/massimilaw-process.webp" alt="MassimiLaw four-step process: free consultation, case evaluation, build your case, resolution" />,
  },
];

export function MassimiLawWork() {
  return <StickyFeatures items={ITEMS} />;
}
