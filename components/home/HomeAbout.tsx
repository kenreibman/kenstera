"use client";

import { motion } from "framer-motion";

export function HomeAbout() {
  return (
    <section id="about" className="relative py-20 md:py-28">
      {/* Dotted line separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#e5e7eb_4px,#e5e7eb_8px)]" />

      <div className="w-full max-w-7xl mx-auto px-5">
        {/* Label */}
        <p className="text-sm font-medium text-gray-900 mb-16">About Kenstera</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] tracking-tight text-gray-900">
              We help businesses{" "}
              <span className="underline decoration-2 decoration-gray-300 underline-offset-[6px]">
                grow
              </span>
            </h2>
          </motion.div>

          {/* Right — statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xl sm:text-2xl font-medium leading-relaxed text-gray-900">
              Websites, automations, and marketing systems that turn stagnant
              brands into{" "}
              <span className="underline decoration-2 decoration-gray-300 underline-offset-[6px]">
                thriving
              </span>{" "}
              ones. Watch your business{" "}
              <span className="underline decoration-2 decoration-gray-300 underline-offset-[6px]">
                bloom
              </span>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HomeAbout;
