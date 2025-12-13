"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

type KeywordRow = {
  keyword: string;
  position: number;
  delta: number; // positive = up
  volume: string;
};

const KEYWORDS: KeywordRow[] = [
  { keyword: "web design agency", position: 3, delta: 2, volume: "6.6k" },
  { keyword: "nextjs development", position: 5, delta: 1, volume: "2.1k" },
  { keyword: "conversion landing page", position: 7, delta: 3, volume: "1.4k" },
  { keyword: "seo for local business", position: 9, delta: 1, volume: "3.2k" },
  { keyword: "website performance audit", position: 4, delta: 2, volume: "900" },
  { keyword: "technical seo checklist", position: 6, delta: 1, volume: "1.1k" },
  { keyword: "core web vitals fix", position: 8, delta: 2, volume: "700" },
  { keyword: "best web dev agency", position: 10, delta: 1, volume: "1.9k" },
];

const SERP_VARIANTS = [
  {
    title: "Kenstera — Websites Built to Convert",
    url: "kenstera.com/seo",
    snippet:
      "SEO that brings qualified traffic. Technical fixes, content strategy, and on-page optimization that turns searches into leads.",
  },
  {
    title: "SEO + Performance Optimization for Growth",
    url: "kenstera.com/services/seo",
    snippet:
      "Improve rankings and speed. From Core Web Vitals to content that matches intent—built for measurable outcomes.",
  },
  {
    title: "Technical SEO, Content, and Tracking Setup",
    url: "kenstera.com/solutions/seo",
    snippet:
      "Fix crawl issues, strengthen pages, and track conversions. A clean SEO foundation that scales with your business.",
  },
];

function KeywordTicker({ rows }: { rows: KeywordRow[] }) {
  // Infinite loop: duplicate list and translate by half.
  const doubled = useMemo(() => [...rows, ...rows], [rows]);

  return (
    <div className="relative h-[152px] overflow-hidden rounded-xl border border-white/10 bg-neutral-950/80">
      <div className="relative z-1 bg-black flex items-center justify-between border-b border-white/10 px-3 py-2">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
          Keyword rankings
        </div>
      </div>

      <motion.div
        className="flex flex-col gap-2 px-3 py-3"
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((r, i) => {
          const up = r.delta > 0;
          return (
            <div
              key={`${r.keyword}-${i}`}
              className="flex items-center justify-between rounded-lg border border-white/5 bg-black/50 px-3 py-2"
            >
              <div className="min-w-0">
                <div className="truncate text-[11px] text-neutral-200">
                  {r.keyword}
                </div>
                <div className="mt-0.5 flex items-center gap-2 text-[10px] text-neutral-500">
                  <span className="inline-flex items-center gap-1">
                    <span
                      className={[
                        "inline-block h-1.5 w-1.5 rounded-full",
                        up ? "bg-violet-400/70" : "bg-neutral-600",
                      ].join(" ")}
                    />
                    {up ? `+${r.delta}` : "—"}
                  </span>
                  <span className="text-neutral-600">•</span>
                  <span>intent match</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pl-3">
                <div className="text-[11px] font-semibold text-white">
                  {r.position}
                </div>
                <div className="text-[10px] text-neutral-500">{r.volume}</div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* top/bottom fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-neutral-950 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-neutral-950 to-transparent" />
    </div>
  );
}

function SerpPreview() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((v) => (v + 1) % SERP_VARIANTS.length);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  const item = SERP_VARIANTS[idx];

  return (
    <div className="rounded-xl border border-white/10 bg-neutral-950/80 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
          SERP preview
        </div>
        <div className="h-2 w-10 rounded-full bg-white/10" />
      </div>

      <div className="rounded-lg h-[110px] border border-white/5 bg-black/50 p-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="text-[10px] text-violet-300/80">{item.url}</div>
            <div className="mt-1 text-[12px] font-semibold text-white">
              {item.title}
            </div>
            <div className="mt-1 line-clamp-2 text-[10px] leading-snug text-neutral-400">
              {item.snippet}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* subtle shimmer */}
      <motion.div
        className="pointer-events-none mt-3 h-[1px] w-full bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function HealthMeter() {
  return (
    <div className="rounded-xl border border-white/10 bg-neutral-950/80 p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
          Site health
        </div>
      </div>

      <div className="rounded-lg border border-white/5 bg-black/50 p-3">
        <div className="flex items-end justify-between gap-3">
          <div className="flex-1">
            <div className="text-[11px] font-semibold text-white">98</div>
            <div className="mt-1 text-[10px] text-neutral-500">
              crawl • index • speed
            </div>

            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full w-[92%] rounded-full bg-violet-400/60"
                animate={{ width: ["88%", "92%", "90%", "92%"] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-white/10 bg-neutral-950">
            {/* scan line */}
            <motion.div
              className="absolute inset-x-0 h-6 bg-linear-to-b from-transparent via-purple-400/15 to-transparent"
              animate={{ y: ["-30%", "120%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 bg-linear-to-b from-white/3 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServiceSEOVisual() {
  return (
    <div className="mt-6">
      <div className="rounded-2xl border border-white/15 bg-neutral-950/80 p-3">
        <div className="flex gap-3">
          <div className="flex-1">
            <div className="grid gap-3">
              <KeywordTicker rows={KEYWORDS} />

              <div className="grid grid-cols-2 gap-3">
                <SerpPreview />
                <HealthMeter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
