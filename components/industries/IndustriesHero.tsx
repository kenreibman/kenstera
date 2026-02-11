"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/* ============================================
   GRADIENT BACKGROUND
============================================ */
function GradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Left blue gradient */}
      <div className="absolute top-0 left-0 w-[50%] h-[70%] bg-gradient-to-br from-cyan-200/50 via-blue-100/40 to-transparent" />
      {/* Right blue gradient */}
      <div className="absolute top-0 right-0 w-[50%] h-[70%] bg-gradient-to-bl from-cyan-200/50 via-blue-100/40 to-transparent" />
      {/* Fade to white at bottom */}
      <div className="absolute top-[40%] left-0 right-0 h-[60%] bg-gradient-to-b from-transparent to-white" />
    </div>
  );
}

interface IndustriesHeroProps {
  headline?: string;
  description?: string;
}

export function IndustriesHero({
  headline = "The conversational\nagents platform",
  description = "Build and deploy AI-powered voice agents that handle complex conversations with human-like understanding and empathy, transforming customer experiences across industries.",
}: IndustriesHeroProps) {
  // Split headline by newline for line breaks
  const headlineParts = headline.split("\n");

  return (
    <section className="relative pt-32 pb-20 lg:pt-24 lg:pb-24 overflow-hidden">
      <GradientBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto mb-6"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-[-0.02em] text-gray-900 leading-[1.1]">
            {headlineParts.map((part, i) => (
              <span key={i}>
                {part}
                {i < headlineParts.length - 1 && <br />}
              </span>
            ))}
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-center text-base sm:text-md text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex items-center justify-center gap-4"
        >
          <Link
            href="/contact-sales"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href="/contact-sales"
            className="inline-flex items-center justify-center px-4 py-3 text-gray-900 text-sm font-medium hover:text-gray-600 transition-colors"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default IndustriesHero;
