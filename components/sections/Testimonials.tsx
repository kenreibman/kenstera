"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "LEARFIELD" },
  { name: "SIDEARM Sports" },
  { name: "TheTickSuit" },
  { name: "B Design" },
  { name: "TheDavidImage" },
];

export function Testimonials() {
  const marqueeLogos = [...logos, ...logos];

  return (
    <section className="relative bg-black py-10">
      <div className="mx-auto max-w-[700px] px-4">
        <p className="mb-8 text-center text-sm text-white">
          Businesses that trust Kenstera
        </p>

        <div className="relative overflow-hidden pointer-none:">
          {/* LEFT GRADIENT */}
          <div className="pointer-events-none absolute z-1 inset-y-0 left-0 w-24 bg-linear-to-r from-black to-transparent" />

          {/* RIGHT GRADIENT */}
          <div className="pointer-events-none absolute z-1 inset-y-0 right-0 w-24 bg-linear-to-l from-black to-transparent" />

          {/* MARQUEE TRACK */}
          <motion.div
            className="flex gap-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {marqueeLogos.map((logo, idx) => (
              <div
                key={`${logo.name}-${idx}`}
                className="flex min-w-[150px] items-center justify-center gap-3 text-sm text-white pointer-none z-[-1]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800/90">
                  <div className="h-3 w-3 rounded-full bg-neutral-500" />
                </div>
                <span className="font-medium tracking-tight">{logo.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
