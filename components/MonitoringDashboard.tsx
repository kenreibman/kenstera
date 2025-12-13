"use client";

import { motion } from "framer-motion";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/60 p-3">
      {children}
    </div>
  );
}

function LineChart() {
  // “draw” a line using an SVG path + strokeDashoffset animation
  return (
    <div className="relative h-20 overflow-hidden rounded-lg bg-neutral-950/60">
      <div className="absolute inset-0 bg-linear-to-b from-white/3 to-transparent" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 240 80"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 C30,50 45,20 70,32 C95,44 110,26 125,18 C150,6 170,22 190,28 C215,36 225,22 240,16"
          fill="none"
          stroke="rgba(167,139,250,0.55)" // purple-300-ish
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <motion.path
          d="M0,60 C30,50 45,20 70,32 C95,44 110,26 125,18 C150,6 170,22 190,28 C215,36 225,22 240,16"
          fill="none"
          stroke="rgba(196,181,253,0.9)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="260"
          animate={{ strokeDashoffset: [260, 0, 0, 260] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            times: [0, 0.55, 0.8, 1],
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* subtle “scan” */}
      <motion.div
        className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent"
        animate={{ x: ["-20%", "120%"] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function Bars() {
  const bars = [34, 52, 28, 64, 46, 72, 38];
  return (
    <div className="flex h-20 items-end gap-1 rounded-lg bg-neutral-950/60 px-3 py-2">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-2 rounded-sm bg-white/10"
          style={{ height: `${h}%` }}
          animate={{ opacity: [0.55, 1, 0.55], scaleY: [1, 1.06, 1] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.08,
          }}
        />
      ))}
    </div>
  );
}

function Donut() {
  // rotating conic gradient to mimic a donut chart
  return (
    <div className="flex items-center gap-3">
      <motion.div
        className="relative h-14 w-14 rounded-full"
        style={{
          background:
            "conic-gradient(rgba(196,181,253,0.9) 0 65%, rgba(255,255,255,0.06) 65% 100%)",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-2 rounded-full bg-neutral-950/90" />
      </motion.div>

      <div className="flex flex-col gap-1">
        <div className="text-[10px] uppercase tracking-wide text-neutral-500">
          Uptime
        </div>
        <div className="text-sm font-semibold text-white">99.98%</div>
        <div className="text-[10px] text-neutral-500">last 7 days</div>
      </div>
    </div>
  );
}

function ActivityRows() {
  const rows = [
    { label: "Response time", value: "100ms" },
    { label: "Core Web Vitals", value: "Execellent" },
    { label: "Errors", value: "None" },
  ];

  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <motion.div
          key={r.label}
          className="flex items-center justify-between rounded-lg border border-white/10 bg-neutral-950/60 px-3 py-2"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        >
          <span className="text-[11px] text-neutral-300">{r.label}</span>
          <span className="text-[11px] font-semibold text-white">{r.value}</span>
        </motion.div>
      ))}
    </div>
  );
}

export function MonitoringDashboard() {
  return (
    <div className="rounded-xl border border-white/10 bg-neutral-950/90 p-3">

      {/* charts */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Card>
          <div className="mb-2 flex items-center justify-between">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
              Traffic
            </div>
            <div className="h-2 w-10 rounded-full bg-white/10" />
          </div>
          <LineChart />
        </Card>

        <Card>
          <div className="mb-2 flex items-center justify-between">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
              Events
            </div>
            <div className="h-2 w-10 rounded-full bg-white/10" />
          </div>
          <Bars />
        </Card>
      </div>

      {/* bottom row */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Card>
          <Donut />
        </Card>

        <Card>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
            Health
          </div>
          <ActivityRows />
        </Card>
      </div>
    </div>
  );
}
