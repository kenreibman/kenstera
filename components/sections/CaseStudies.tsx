"use client";

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
  image: {
    alt: string;
  };
  logo: string;
  company: string;
  title: string;
  subtitle: string;
  impact: string[];
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "logistics",
    image: {
      alt: "Warehouse with shelving and forklift",
    },
    logo: "MedixChain",
    company: "Healthcare logistics platform",
    title: "Streamlined operations and reduced errors across their supply chain.",
    subtitle:
      "We redesigned their site, clarified the offer, and built a lead gen funnel that connects directly into their CRM—so sales gets clean, qualified opportunities instead of noise.",
    impact: [
      "80% reduction in form drop-offs",
      "2.3x increase in qualified demos booked",
      "40% faster response time from lead to first touch",
      "Integrated analytics across marketing and sales",
    ],
  },
  {
    id: "saas",
    image: {
      alt: "SaaS dashboard on a laptop",
    },
    logo: "Flowboard",
    company: "B2B SaaS workflow tool",
    title: "Turned a confusing product story into a clear, conversion-focused site.",
    subtitle:
      "Flowboard's product was strong, but their marketing site wasn't telling the story. We rebuilt their homepage, pricing, and onboarding funnel to match how customers actually buy.",
    impact: [
      "30% lift in trial sign-ups",
      "Higher conversion from trial to paid",
      "New feature pages launched in days, not weeks",
      "Messaging playbook the whole team can use",
    ],
  },
  {
    id: "agency",
    image: {
      alt: "Modern office interior",
    },
    logo: "Northline Studio",
    company: "Creative production agency",
    title: "A portfolio that finally reflects the quality of their work.",
    subtitle:
      "We created a fast, visual-first portfolio experience that puts their best projects front and center while making it effortless for prospects to get in touch.",
    impact: [
      "60% more project enquiries",
      "Site performance in the high 90s on Lighthouse",
      "Editing new case studies without touching code",
      "Shorter sales cycles with better-informed leads",
    ],
  },
];

export function CaseStudies() {
  return (
    <section className="relative invert w-full bg-black px-0 md:px-20 py-12 md:py-20">
      <div className="mx-auto max-w-[1000px]">
        <SectionHeader
          eyebrow="Case Studies"
          title={
            <>
              See How Better Websites
              <br />
              Transform Businesses
            </>
          }
          subtitle={
            <>
              A few examples of how strategic design, clean development, and
              conversion-focused funnels have helped our clients win more of the
              right customers.
            </>
          }
          align="center"
        />

        <Carousel className="mt-12">
          <CarouselContent className="md:ml-0">
            {CASE_STUDIES.map((study) => (
              <CarouselItem key={study.id} className="pl-4 md:pl-0 basis-[85%] md:basis-full">
                <article className="grid gap-8 rounded-3xl border border-white/10 bg-neutral-950/80 p-6 md:grid-cols-2 lg:p-8">
                  {/* Left: image / visual placeholder */}
                  <div className="flex items-center justify-center">
                    <div className="relative h-64 w-full max-w-sm overflow-hidden rounded-2xl bg-neutral-900/90">
                      {/* Placeholder – swap this for an <Image /> later */}
                      <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-wide text-neutral-900">
                        {study.image.alt}
                      </div>
                    </div>
                  </div>

                  {/* Right: details */}
                  <div className="flex flex-col justify-center gap-4 text-sm text-neutral-200">
                    <div className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                      {study.logo}
                    </div>

                    <h3 className="text-lg font-semibold text-white sm:text-xl">
                      {study.title}
                    </h3>

                    <p className="text-sm text-neutral-300 hidden md:block">{study.subtitle}</p>

                    <div className="mt-2 hidden md:block">
                      <div className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Impact
                      </div>
                      <ul className="mt-2 space-y-1.5 text-sm text-neutral-200">
                        {study.impact.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-1.5 h-[3px] w-[3px] rounded-full bg-neutral-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

            <CarouselPrevious className="h-8 w-8 rounded-full border hidden md:flex" />
            <CarouselNext className="h-8 w-8 rounded-full hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
