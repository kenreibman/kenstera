"use client";

import { motion } from "framer-motion";

export function Radar() {
  return (
    <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/80">
      {/* concentric rings */}
      <div className="absolute h-32 w-32 rounded-full border border-purple-500/30" />
      <div className="absolute h-24 w-24 rounded-full border border-purple-500/20" />
      <div className="absolute h-16 w-16 rounded-full border border-purple-500/10" />

      {/* rotating wedge */}
      <motion.div
        className="absolute h-32 w-32 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(168,85,247,0.9), transparent 40deg, transparent 360deg)",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 6,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* center dot */}
      <div className="absolute h-2 w-2 rounded-full bg-purple-800" />
    </div>
  );
}
