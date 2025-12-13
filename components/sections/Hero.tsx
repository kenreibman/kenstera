"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GalaxyOrb } from "../GalaxyOrb";
import { ScheduleModal } from "../ScheduleModal";

export function Hero() {
  return (
    <section
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-black"
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
          <span className="rounded-full bg-purple-700 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide">
            New
          </span>
          <span className="text-xs sm:text-sm">
            Free Website Audit and Consultation
          </span>
        </div>

        {/* Heading */}
        <h1
          className="
            text-balance
            text-4xl
            font-semibold
            leading-tight
            tracking-tight
            sm:text-5xl
            md:text-6xl
            bg-[linear-gradient(235deg,#ffffff_0%,#c381bc_78%)]
            bg-clip-text
            text-transparent
          "
        >
          Engaging Websites
          <br />Built to Convert.
        </h1>

        {/* Subheading */}
        <p className="mt-5 max-w-xl text-balance text-sm text-white/90 sm:text-base">
          From design to strategy, <strong>Kenstera</strong> builds digital experiences engineered to turn visitors into leads.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <ScheduleModal
            label="Free Strategy Call"
            calLink="kenstera/15min" // or whatever your event slug is
            namespace="hero-strategy-call"
            theme="auto"
            layout="month_view"
            className="
              h-10
              cursor-pointer
              rounded-full
              px-6
              text-sm
              font-semibold
              text-white
              bg-purple-700
              hover:bg-purple-900
              transition-colors
            "
          />

          <Button
            asChild
            variant="outline"
            className="
              h-10
              rounded-full
              px-6
              text-sm
              font-semibold
              border border-white/15
              bg-black/60
              text-white
              hover:bg-white/5 hover:text-white
              transition-colors
            "
          >
            <Link href="#services" className="inline-flex items-center justify-center">
              View our Services
            </Link>
          </Button>

        </div>
      </motion.div>
    </section>
  );
}
