"use client";
import { motion } from "framer-motion";

import { ReactNode } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { Radar } from "@/components/Radar";
import { CodeScroll } from "@/components/CodeScroll";

import { 
    ChevronLeft, 
    ChevronRight, 
    RotateCcw,
    Minus,
    Square,
    X,
} from "lucide-react";

// Type for one step card
type ProcessStep = {
  title: string;
  subtitle: string;
  visual: ReactNode;
};

const steps: ProcessStep[] = [
  {
    title: "Smart Analyzing",
    subtitle:
      "We assess your current website, funnels, and workflows to uncover what’s working, what isn’t, and where the biggest opportunities are.",
    visual: <Step1Graphic />,
  },
  {
    title: "AI Development",
    "subtitle": "Our team builds intelligent automation systems tailored to your business processes.",
    visual: <Step2Graphic />
  },
  {  
    title: "Seamless Launch",
    "subtitle": "Our team builds intelligent automation systems tailored to your business processes.",
    visual: <Step3Graphic />
  },
];

export function Process() {
  return (
    <section className="relative w-full bg-black px-4 py-20 md:py-28">
      <div className="mx-auto max-w-[1000px]">
        <SectionHeader
          eyebrow="Our Process"
          title={
            <>
              Our Simple, Smart,
              <br />
              and Scalable Process
            </>
          }
          subtitle={
            <>
              We guide you through a clear, collaborative process—from
              understanding your goals to launching and optimizing a website
              that supports real growth.
            </>
          }
          align="center"
        />

        {/* Steps grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-3xl border border-white/10 bg-neutral-900/70 p-6 text-sm text-neutral-200"
            >
              {/* Dynamic step badge */}
              <div className="mb-4 inline-flex items-center rounded-full border border-white/15 bg-black/70 px-3 py-1 text-[11px] font-medium text-neutral-300">
                Step {index + 1}
              </div>

              <h3 className="text-lg font-semibold text-white sm:text-xl">
                {step.title}
              </h3>

              <p className="mt-2 text-sm text-neutral-300">{step.subtitle}</p>

              {/* Custom visual for this step */}
              {step.visual}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


function Step1Graphic() {
  return (
    <div className="mt-6 flex flex-col gap-4 md:flex-row">
      {/* Radar graphic (client component) */}
      <Radar />

      {/* Checklist panel */}
      <div className="flex-1 rounded-xl border border-white/10 bg-black/80 p-3 text-xs text-neutral-200">
        <ul className="space-y-2">
          <li className="flex items-center justify-between">
            <span>Current site audit</span>
            <span className="text-[10px] text-neutral-500">In progress</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Performance &amp; speed check</span>
            <span className="text-[10px] text-neutral-500">Reviewing</span>
          </li>
          <li className="flex items-center justify-between">
            <span>UX &amp; content review</span>
            <span className="text-[10px] text-neutral-500">Analyzing</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Tech stack &amp; integrations</span>
            <span className="text-[10px] text-neutral-500">Noted</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Growth opportunities</span>
            <span className="text-[10px] text-neutral-500">Identified</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Step2Graphic() {
  return (
    <div className="mt-6">
      {/* fake minimal browser frame */}
      <div className="rounded-2xl border border-white/15 bg-neutral-950/80 p-3">
        {/* top bar */}
        <div className="mb-3 flex items-center justify-between px-1 text-[10px] text-neutral-500">
          <div className="flex items-center gap-1">
            <ChevronLeft size={12} strokeWidth={2} />
            <ChevronRight size={12} strokeWidth={2} />
            <RotateCcw size={10} strokeWidth={2} />
          </div>
          <div className="h-3 w-24 rounded-full bg-neutral-800" />
          <div className="flex items-center gap-1">
            <Minus size={12} strokeWidth={2} />
            <Square size={10} strokeWidth={2} /> 
            <X size={12} strokeWidth={2} />
          </div>
        </div>

        <div className="flex gap-3">
          {/* sidebar icons */}
          <div className="flex w-8 flex-col items-center gap-3 rounded-lg bg-black/80 py-3 text-[10px] text-neutral-500">
            <div className="h-4 w-4 rounded-md bg-neutral-800" />
            <div className="h-4 w-4 rounded-md bg-neutral-800" />
            <div className="h-4 w-4 rounded-md bg-neutral-800" />
            <div className="h-4 w-4 rounded-md bg-neutral-800" />
          </div>

          {/* scrolling code panel */}
          <div className="flex-1">
            <CodeScroll />
          </div>
        </div>
      </div>
    </div>
  );
}

function PulseLine({ offset }: { offset: number }) {
  return (
    <div
      className="relative w-20 h-[1px] bg-white/[0.05]" // base line
      style={{ transform: `translateY(${offset}px)` }}
    >
      {/* Energy pulse */}
      <motion.div
        className="absolute top-0 h-[1px] w-6 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(129,74,200,0.1) 0%, rgba(129,74,200,0.6) 90%, rgba(221,121,253,0.6) 100%)",
        }}
        animate={{ x: ["0%", "150%"] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
function Step3Graphic() {
  return (
    <div className="mt-6">
      <div className="relative rounded-2xl border border-white/10 bg-neutral-950/80 px-20 py-8">
        <div className="relative flex items-center justify-between gap-8">
          {/* Three connecting lines between squares */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1.5">
            <PulseLine offset={-6} />
            <PulseLine offset={0} />
            <PulseLine offset={6} />
          </div>

          {/* Our solution (left) */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-black/80" />
            <span className="text-[11px] text-neutral-300">Our solution</span>
          </div>

          {/* Your stack (right) */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-black/80" />
            <span className="text-[11px] text-neutral-300">Your stack</span>
          </div>
        </div>
      </div>
    </div>
  );
}