"use client";

import Image from "next/image";
import type { FeatureItem } from "@/components/el/motion";
import { StickyContent, fromFeatureItems } from "@/components/exact";

/*
 * The TheDavidImage case study showcase. Every visual is a real screenshot of the
 * live site, thedavidimage.com, in a browser frame. Nothing here is invented.
 */

function SiteFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="ring-hairline w-full max-w-[560px] overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-1.5 border-b border-hairline px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        <span className="ml-3 rounded-full bg-surface px-3 py-0.5 text-[12px] text-subtle">thedavidimage.com</span>
      </div>
      <Image src={src} alt={alt} width={1440} height={900} sizes="(min-width: 1024px) 560px, 90vw" className="h-auto w-full" />
    </div>
  );
}

const ITEMS: FeatureItem[] = [
  {
    label: "1. Galleries",
    title: "A gallery for each body of work",
    body: "Nine galleries, laid out as a clean grid of covers so a visitor can pick a series and go straight in. The work leads, and the site stays out of its way.",
    palette: "dusk",
    visual: () => <SiteFrame src="/images/clients/thedavidimage-home.webp" alt="TheDavidImage gallery overview showing a grid of gallery covers" />,
  },
  {
    label: "2. Each gallery",
    title: "Every series on its own page",
    body: "Each gallery opens to its own page with the title, the number of images, and the work shown large, so panoramic pieces get the room they need.",
    palette: "moss",
    visual: () => <SiteFrame src="/images/clients/thedavidimage-gallery.webp" alt="TheDavidImage Venice gallery page showing the image count and a large photograph" />,
  },
  {
    label: "3. Shop",
    title: "A shop of individual works",
    body: "Works are listed with their titles and prices, each with its own page, so a visitor can go from admiring a piece to owning it.",
    palette: "ember",
    visual: () => <SiteFrame src="/images/clients/thedavidimage-shop.webp" alt="TheDavidImage shop showing individual works with titles and prices" />,
  },
  {
    label: "4. About",
    title: "The story behind the work",
    body: "An about page that tells how the work came about, so the portfolio comes with the context that gives it meaning.",
    palette: "iris",
    visual: () => <SiteFrame src="/images/clients/thedavidimage-about.webp" alt="TheDavidImage about page telling the photographer's story" />,
  },
];

export function TheDavidImageWork() {
  return <StickyContent items={fromFeatureItems(ITEMS)} />;
}
