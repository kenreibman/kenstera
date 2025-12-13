"use client";
import { motion } from "framer-motion";
import { MessageSquare, Settings2, BarChart3, RefreshCw, ArrowUp, Check, CheckCircle2, Rocket, Server, Zap, AlertTriangle, GaugeCircle, MousePointer2, Search } from "lucide-react";
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

// Type for one stage card
type ProcessStage = {
  title: string;
  subtitle: string;
  visual: ReactNode;
};

const stages: ProcessStage[] = [
  {
    title: "Plan",
    subtitle:
      "We assess your current website and create a personalized plan for you.",
    visual: <Stage1Graphic />,
  },
  {
    title: "Develop",
    "subtitle": "Our team builds your website with the industry's best tech stack.",
    visual: <Stage2Graphic />
  },
  {  
    title: "Launch",
    "subtitle": "Just like that, we're ready to launch. Get ready for the leads and performance increase your business needed.",
    visual: <Stage3Graphic />
  },
  {  
    title: "Hosting & Maintenance",
    "subtitle": "We got you covered. Never worry about chasing freelancers for future updates.",
    visual: <Stage4Graphic />
  },
];

export function Process() {
  return (
    <section className="relative w-full bg-black px-4 py-12 md:py-20">
      <div className="mx-auto max-w-[900px]">
        <SectionHeader
          eyebrow="Our Process"
          title={
            <>
              Simple, Smart,
              <br />
              and Scalable Process
            </>
          }
          subtitle={
            <>
              We guide you through a clear, collaborative process. From
              understanding your goals to launching and optimizing a website
              that supports real growth.
            </>
          }
          align="center"
        />

        {/* Stages grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {stages.map((stage, index) => (
            <article
              key={stage.title}
              className="rounded-3xl border border-white/10 bg-neutral-900/70 p-6 text-sm text-neutral-200"
            >
              {/* Dynamic stage badge */}
              <div className="mb-4 inline-flex items-center rounded-full border border-white/15 bg-black/70 px-3 py-1 text-[11px] font-medium text-neutral-300">
                Stage {index + 1}
              </div>

              <h3 className="text-lg font-semibold text-white sm:text-xl">
                {stage.title}
              </h3>

              <p className="mt-2 text-sm text-neutral-300">{stage.subtitle}</p>

              {/* Custom visual for this stage */}
              {stage.visual}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


function LiveDot() {
  return (
    <motion.span
      className="h-1.5 w-1.5 rounded-full bg-violet-400/80"
      animate={{ opacity: [0.25, 1, 0.25], scale: [0.9, 1.15, 0.9] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function ScoreRow({
  icon,
  label,
  value,
  colorClass,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  colorClass: string;
  delay?: number;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-neutral-950/70 px-3 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-neutral-500">{icon}</span>
          <span className="text-[11px] text-neutral-300">{label}</span>
        </div>

        <motion.span
          className="text-[11px] font-semibold text-white"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay }}
        >
          {value}
        </motion.span>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className={`h-full rounded-full ${colorClass}`}
          animate={{ width: [`${Math.max(10, value - 12)}%`, `${value}%`, `${value - 3}%`, `${value}%`] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay }}
        />
      </div>
    </div>
  );
}

function Finding({
  title,
  tag,
  tone,
  delay = 0,
}: {
  title: string;
  tag: string;
  tone: "good" | "warn";
  delay?: number;
}) {
  const pill =
    tone === "good"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
      : "border-amber-400/20 bg-amber-400/10 text-amber-200";

  const icon =
    tone === "good" ? (
      <CheckCircle2 className="h-4 w-4 text-emerald-300/80" />
    ) : (
      <AlertTriangle className="h-4 w-4 text-amber-300/80" />
    );

  return (
    <motion.div
      className="flex items-center justify-between rounded-lg border border-white/10 bg-black/50 px-3 py-2"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[11px] text-neutral-200">{title}</span>
      </div>
      <span className={`rounded-full border px-2 py-0.5 text-[10px] ${pill}`}>
        {tag}
      </span>
    </motion.div>
  );
}

export function Stage1Graphic() {
  return (
    <div className="mt-6 flex flex-col gap-4 md:flex-col">
      {/* Right: Audit dashboard */}
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/70 p-4">
        {/* subtle sheen */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent" />
        <motion.div
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent"
          animate={{ x: ["-30%", "140%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        />

        {/* Header */}
        <div className="relative mb-3 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
              Site audit
            </div>
            <div className="mt-1 flex items-center gap-2 text-[11px] text-neutral-200">
              <LiveDot />
              Analyzing your current website…
            </div>
          </div>
        </div>

        {/* Scores */}
        <div className="relative grid grid-cols-1 gap-2 sm:grid-cols-3">
          <ScoreRow
            icon={<GaugeCircle className="h-4 w-4" />}
            label="Speed"
            value={92}
            colorClass="bg-emerald-400/60"
            delay={0}
          />
          <ScoreRow
            icon={<Search className="h-4 w-4" />}
            label="SEO"
            value={78}
            colorClass="bg-purple-400/55"
            delay={0.15}
          />
          <ScoreRow
            icon={<MousePointer2 className="h-4 w-4" />}
            label="UX"
            value={84}
            colorClass="bg-white/30"
            delay={0.3}
          />
        </div>

        {/* Bottom note */}
        <div className="relative mt-3 rounded-lg border border-white/10 bg-neutral-950/60 px-3 py-2 text-[10px] text-neutral-400">
          We map a clear plan before writing a single line of code.
        </div>
      </div>
    </div>
  );
}

function Stage2Graphic() {
  return (
    <div className="mt-6">
      {/* fake minimal browser frame */}
      <div className="rounded-2xl border border-white/15 bg-neutral-950/80 p-3">
        {/* top bar */}
        <div className="mb-3 flex items-center justify-between px-1 text-[10px] text-neutral-900">
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
          <div className="flex w-8 flex-col items-center gap-3 rounded-lg bg-black/80 py-3 text-[10px] text-neutral-900">
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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-200">
      {children}
    </span>
  );
}

function DotPulse({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="h-1.5 w-1.5 rounded-full bg-emerald-400/80"
      animate={{ opacity: [0.25, 1, 0.25], scale: [0.9, 1.15, 0.9] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function FlowLine() {
  return (
    <div className="relative h-0.5 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="absolute inset-y-0 w-20 rounded-full bg-linear-to-r from-transparent via-purple-400/45 to-transparent"
        animate={{ x: ["-30%", "130%"] }}
        transition={{ duration: 2.1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function StepNode({
  icon,
  title,
  active,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  active?: boolean;
  delay?: number;
}) {
  return (
    <div className="relative flex flex-1 flex-col items-center text-center">
      <motion.div
        className={[
          "flex h-14 w-14 items-center justify-center rounded-2xl border bg-black/70",
          active ? "border-purple-400/50" : "border-white/10",
        ].join(" ")}
        animate={
          active
            ? { boxShadow: ["0 0 0 rgba(0,0,0,0)", "0 0 30px rgba(167,139,250,0.18)", "0 0 0 rgba(0,0,0,0)"] }
            : {}
        }
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <div className={active ? "text-purple-200" : "text-neutral-500"}>
          {icon}
        </div>
      </motion.div>

      <div className="mt-2 text-[11px] font-semibold text-white">{title}</div>
    </div>
  );
}

function StatusPanel() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/70 p-4">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
          Deployment
        </div>
        <Pill>
          <span className="inline-flex items-center gap-2">
            <DotPulse />
            Live
          </span>
        </Pill>
      </div>

      <div className="mt-3 rounded-xl border border-white/10 bg-black/60 p-3">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-semibold text-white">kenstera.com</div>
          <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-300/80" />
            Healthy
          </div>
        </div>

        <div className="mt-2 space-y-2">
          <Row label="Build" delay={0.0} />
          <Row label="Tests" delay={0.2} />
          <Row label="Deploy" delay={0.4} />
        </div>
      </div>

      {/* subtle scan */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent"
        animate={{ x: ["-30%", "140%"] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function Row({ label, delay }: { label: string; delay: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/5 bg-neutral-950/60 px-2.5 py-2">
      <div className="text-[10px] text-neutral-300">{label}</div>

      <div className="flex items-center gap-2">
        <motion.div
          className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10"
          initial={false}
        >
          <motion.div
            className="h-full rounded-full bg-emerald-400/60"
            animate={{ width: ["10%", "100%"] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatDelay: 1.0,
              ease: "easeInOut",
              delay,
            }}
          />
        </motion.div>

        <motion.span
          className="text-[10px] text-neutral-400"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay }}
        >
          ok
        </motion.span>
      </div>
    </div>
  );
}

export function Stage3Graphic() {
  return (
    <div className="mt-6">
      <div className="relative rounded-2xl border border-white/10 bg-neutral-950/80 px-6 py-6">
        <div className="rounded-2xl border border-white/10 bg-black/50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
              Launch pipeline
            </div>
          </div>

          <div className="flex items-center gap-4">
            <StepNode
              icon={<Server className="h-5 w-5" />}
              title="Build"
              active
              delay={0}
            />

            <div className="w-20">
              <FlowLine />
            </div>

            <StepNode
              icon={<Zap className="h-5 w-5" />}
              title="Test"
              active
              delay={0.2}
            />

            <div className="w-20">
              <FlowLine />
            </div>

            <StepNode
              icon={<Rocket className="h-5 w-5" />}
              title="Deploy"
              active
              delay={0.4}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


function Stage4Graphic() {
  return (
    <div className="mt-6">
      <div className="rounded-2xl border border-white/10 bg-neutral-950/80 px-5 py-4 text-sm text-neutral-200">
        <div className="space-y-2">
          {/* Row 1 */}
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/70 px-3 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                <MessageSquare size={16} className="text-purple-300" />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-white">
                  Google Search Rankings
                </div>
              </div>
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-purple-400/60 bg-violet-400/10">
              <RefreshCw size={14} className="text-purple-300" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/70 px-3 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                <Settings2 size={16} className="text-purple-300" />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-white">
                  Hassle-free Hosting
                </div>
              </div>
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-purple-400/60 bg-violet-400/10">
              <ArrowUp size={14} className="text-purple-300" />
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/70 px-3 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                <BarChart3 size={16} className="text-purple-300" />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-white">
                  24/7 Support and Uptime
                </div>
              </div>
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-purple-400/60 bg-violet-400/10">
              <Check size={14} className="text-purple-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
