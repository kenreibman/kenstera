"use client";

import { motion } from "framer-motion";

export function GalaxyOrb() {
  return (
    <div
      className="
        pointer-events-none
        absolute left-1/2 top-1/2
        flex items-center justify-center
      "
      style={{
        transform: "translate(-50%, -50%)",
        filter: "blur(10px)",
        opacity: 0.6,
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center">
        {/* BIG CIRCLE */}
        <motion.div
          className="relative h-[406px] w-[406px] rounded-full overflow-hidden"
          style={{
            background:
              "linear-gradient(229deg, #df7afe 13%, rgba(201,110,240,0) 35.0235827429%, rgba(164,92,219,0) 64.1724422556%, rgb(129,74,200) 88%)",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 26,
            ease: "linear",
            repeat: Infinity,
          }}
        />

        {/* SMALL CIRCLE */}
        <motion.div
          className="
            absolute inset-0 m-auto
            h-[300px] w-[300px]
            rounded-full overflow-hidden
          "
          style={{
            background:
              "linear-gradient(141deg, #df7afe 13%, rgba(201,110,240,0) 35.0235827429%, rgba(164,92,219,0) 64.1724422556%, rgb(129,74,200) 88%)",
          }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 18,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  );
}
