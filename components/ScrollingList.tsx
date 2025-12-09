"use client";

import { motion } from "framer-motion";
import type { ServiceItem } from "@/components/ServiceBlock";

export function ScrollingList({ items }: { items: ServiceItem[] }) {
  const doubled = [...items, ...items];

  return (
    <div className="relative h-56 overflow-hidden">
      <motion.div
        className="flex flex-col gap-2"
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {doubled.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className="flex items-center justify-between rounded-sm border border-white/5 bg-neutral-900/80 px-3 py-3 text-xs text-neutral-200"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-[10px] text-white/70">
                {item.icon}
              </div>
              <span>{item.label}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
