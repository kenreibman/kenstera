// WebsiteDesignVisual.tsx
import { ScrollingList } from "@/components/ScrollingList";
import type { ServiceItem } from "@/components/ServiceBlock"; // if you kept that type there

import {
  LayoutDashboard,
  Rocket,
  Smartphone,
  Server,
  Search,
  GaugeCircle,
} from "lucide-react";

const ServiceWebsiteVisualItems: ServiceItem[] = [
  { label: "UX-focused layouts", icon: <LayoutDashboard size={14} /> },
  { label: "High-converting landing pages", icon: <Rocket size={14} /> },
  { label: "Mobile-first responsive design", icon: <Smartphone size={14} /> },
  { label: "Custom back-end functionality", icon: <Server size={14} /> },
  { label: "Search engine optimizations", icon: <Search size={14} /> },
  { label: "Blazing fast performance", icon: <GaugeCircle size={14} /> },
];

export function ServiceWebsiteVisual() {
  return (
    <div className="px-12 pt-12 pb-6 max-w-md rounded-2xl bg-neutral-800/40 backdrop-blur-sm">
      <div className="relative mx-auto max-w-md rounded-sm border border-white/10 bg-linear-to-b from-neutral-900/80 to-black/90 p-4">
        {/* Header bar */}
        <div className="mb-3 flex items-center justify-between rounded-sm border border-white/10 bg-black/60 px-3 py-2 text-xs text-neutral-300">
          <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            What&apos;s Included
          </span>
        </div>

        {/* Animated list */}
        <ScrollingList items={ServiceWebsiteVisualItems} />

        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black to-transparent" />
      </div>
    </div>
  );
}
