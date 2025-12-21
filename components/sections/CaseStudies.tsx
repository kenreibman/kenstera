"use client";

import * as React from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CaseStudy = {
  id: string;
  href: string;
  category: string;
  company: string;
  blurb: string;
  tags: string[];
  // Replace this with real image later
  imageAlt: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "arslan",
    href: "/case-studies/arslan",
    category: "Construction",
    company: "Arslan Group",
    blurb:
      "A fast-growing construction and home expert, ready to elevate its digital presence to match its practical…",
    tags: ["Brand strategy & identity", "Digital development", "Digital marketing"],
    imageAlt: "Construction site with building facade",
  },
  {
    id: "hotel-four-stories",
    href: "/case-studies/hotel-four-stories",
    category: "Hospitality / Hotels",
    company: "Hotel Four Stories",
    blurb:
      "Custom hotel website with multilingual structure, MEWS integration, and a complete photo and video shoot for…",
    tags: ["Digital development", "Photography & visual production"],
    imageAlt: "Coastline aerial with beach and pier",
  },
  {
    id: "avra",
    href: "/case-studies/avra",
    category: "Telecom & Engineering",
    company: "Avra Gruppe",
    blurb:
      "Complete rebranding and new website for a leading German telecom and engineering company.",
    tags: ["Brand strategy & identity"],
    imageAlt: "Dark tech device close-up",
  },
  {
    id: "test",
    href: "/case-studies/test",
    category: "Telecom & Engineering",
    company: "Avra Gruppe",
    blurb:
      "Complete rebranding and new website for a leading German telecom and engineering company.",
    tags: ["Brand strategy & identity"],
    imageAlt: "Dark tech device close-up",
  },
];

function DotsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="5" r="1.7" />
      <circle cx="12" cy="12" r="1.7" />
      <circle cx="12" cy="19" r="1.7" />
    </svg>
  );
}

export function CaseStudies() {
  return (
    <section className="w-full bg-black px-4 py-12 md:px-20 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header row */}
        <div className="flex items-start justify-center">
          <SectionHeader
            eyebrow="Cases"
            title="Featured cases"
            subtitle={
              <>
                We believe in work that’s not just built to function, but built to shift brand perception, elevate
                experience, and drive measurable results. That’s the standard we create for.
              </>
            }
          />
        </div>

        {/* Cards */}
        <div className="mt-10">
          <Carousel className="relative">
            <CarouselContent className="-ml-6">
              {CASE_STUDIES.map((study) => (
                <CarouselItem key={study.id} className="pl-6 basis-[88%] sm:basis-1/2 lg:basis-1/3">
                  {/* Whole card clickable */}
                  <Link
                    href={study.href}
                    aria-label={`View case study: ${study.company}`}
                    className="group block"
                  >
                    <article className="relative h-[520px] w-full overflow-hidden bg-neutral-200">
                      {/* Image area (placeholder) */}
                      <div className="absolute inset-0">
                        {/* Swap this for <Image /> later */}
                        <div className="h-full w-full bg-neutral-300">
                          <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs font-semibold uppercase tracking-widest text-neutral-500">
                            {study.imageAlt}
                          </div>
                        </div>

                        {/* Dark overlay to match screenshot */}
                        <div className="absolute inset-0 bg-black/45 transition-colors duration-300 group-hover:bg-black/25" />
                        {/* Bottom fade for text readability */}
                        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/75 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
                      </div>

                      {/* Top-left category */}
                      <div className="absolute left-6 top-6 flex items-center gap-2">
                        <span className="h-2 w-2 bg-white transition-colors duration-300 group-hover:bg-blue-600" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-white">
                          {study.category}
                        </span>
                      </div>

                      {/* Main content */}
                      <div className="absolute inset-x-0 bottom-20 px-6">
                        <h3 className="text-3xl font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-blue-50">
                          {study.company}
                        </h3>

                        <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-white/85 transition-colors duration-300 group-hover:text-white">
                          {study.blurb}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {study.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center border border-white/60 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-white transition-colors duration-300 group-hover:border-blue-200 group-hover:text-blue-50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom bar: becomes black on hover (like screenshot), otherwise blue */}
                      <div className="absolute inset-x-0 bottom-0 flex h-16 items-center justify-between bg-blue-600 px-6 transition-colors duration-300 group-hover:bg-black">
                        <span className="text-xs font-semibold uppercase tracking-wider text-white">
                          See work
                        </span>
                        <DotsIcon className="h-5 w-5 fill-white" />
                      </div>
                    </article>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Nav (square, no rounded edges) */}
            <CarouselPrevious className="hidden md:flex h-10 w-10 border border-black/20 bg-white text-black shadow-none" />
            <CarouselNext className="hidden md:flex h-10 w-10 border border-black/20 bg-white text-black shadow-none" />
          </Carousel>

          {/* Bottom-right button */}
          <div className="mt-6 hidden w-full justify-end gap-3 md:flex">
            <Link
              href="/case-studies"
              type="button"
              className="hidden md:inline-flex items-center justify-center bg-blue-600 px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white"
            >
              View more cases
              <DotsIcon className="ml-3 h-4 w-4 fill-white" />
            </Link>
          </div>

          {/* Mobile header button */}
          <div className="mt-6 md:hidden">
            <Link
              href="/case-studies"
              type="button"
              className="inline-flex w-full items-center justify-center bg-blue-600 px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white"
            >
              View more cases
              <DotsIcon className="ml-3 h-4 w-4 fill-white" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
