"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GalaxyOrb } from "../GalaxyOrb";

export function Hero() {
  return (
    <section
      className="
        relative
        flex min-h-[90vh] items-center justify-center
        overflow-hidden
        bg-black
      "
    >
      {/* Galary Orb */}
      <div className="absolute inset-0 flex items-center justify-center">
         <div
      className="
        pointer-events-none
        relative
        h-[420px] w-[420px]
      "
      aria-hidden="true"
    >
        <GalaxyOrb />
    </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        {/* Pill / badge */}
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur">
          <span className="rounded-full bg-purple-500 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide">
            New
          </span>
          <span className="text-xs sm:text-sm">
            Free Website Audit and Consultation
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-white text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Engaging Websites
          <br />Built to Convert.
        </h1>

        {/* Subheading */}
        <p className="mt-5 max-w-xl text-balance text-sm text-neutral-300 sm:text-base">
          From design to strategy, <strong>Kenstera</strong> builds digital experiences engineered to turn visitors into leads.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            className="
              rounded-full
              bg-purple-500
              px-6 py-2
              text-sm font-semibold
              text-white
              hover:bg-purple-600
              transition-colors
            "
          >
            <Link href="/contact">
              Get started now
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="
              rounded-full
              border-white/15
              bg-black/60
              px-6 py-2
              text-sm font-semibold
              text-white
              hover:bg-white/5
            "
          >
            <Link href="#services">
              View services
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
