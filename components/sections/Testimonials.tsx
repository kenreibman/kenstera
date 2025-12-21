"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Logo = {
  name: string;
  src: string;
  width?: number;
  height?: number;
};

const logos: Logo[] = [
  { name: "FrontEnd Mentor", src: "/testimonials/frontendmentor.png", width: 30, height: 30 },
  { name: "LEARFIELD", src: "/testimonials/learfield.png", width: 100, height: 40 },
  { name: "SIDEARM Sports", src: "/testimonials/sidearm.webp", width: 80, height: 40 },
  { name: "Upwork", src: "/testimonials/upwork.png", width: 80, height: 40 },
  { name: "Fiverr", src: "/testimonials/fiverr.png", width: 50, height: 50 },
];

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion();

  const track = [...logos, ...logos];

  return (
    <section className="bg-black">
      <div className="overflow-hidden mx-auto max-w-[1440px] px-6 py-12 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="text-sm font-medium text-white">
              Kenstera is
              <br />
              trusted by
            </div>
          </div>

          <div className="lg:col-span-9">
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-black to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-black to-transparent" />

              <motion.div
                className="flex w-max items-center gap-6 pr-6"
                animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : {
                        duration: 40,
                        ease: "linear",
                        repeat: Infinity,
                      }
                }
              >
                {track.map((logo, idx) => (
                  <div
                    key={`${logo.name}-${idx}`}
                    className="flex h-24 text-white w-[220px] shrink-0 items-center justify-center border border-white/20 bg-white/0 px-6"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={logo.width ?? 160}
                      height={logo.height ?? 40}
                      className="w-auto opacity-80 grayscale"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
