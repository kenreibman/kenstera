"use client";

import Image from "next/image";
import { Play } from "lucide-react";

type VideoItem = {
  title: string;
  description?: string;
  posterSrc: string; // put this in /public or use a remote URL configured in next.config
  href?: string; // optional: link to case study / video page
};

const videos: VideoItem[] = [
  {
    title: "Growth",
    description:
      "In a world that changes at lightning speed, we create digital experiences that grow with your ambitions powered by smart technology, intentional design and a future-ready mindset.",
    posterSrc: "/videos/growth-poster.jpg",
    href: "/work/growth",
  },
];

export function Video() {
  const v = videos[0];

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-6xl">
            The agency that gives your brand the support it’s been looking for
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-pretty text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
            {v.description}
          </p>
        </div>

        <div className="mt-10 sm:mt-14">
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
            <div className="relative aspect-video w-full bg-neutral-950">
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
