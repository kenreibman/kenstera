"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Static hero background used on mobile instead of the scrubbing video (which
// performs poorly on phones). It's a fixed image that fades to black over the
// first viewport of scroll, so the rest of the site is just black — matching
// the "image for the hero, black for the rest" intent. next/image serves an
// optimized (webp/avif), responsively-sized version, so the mobile payload is
// well under the raw jpg.
export default function HeroImage({ poster }: { poster: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: () => "+=" + window.innerHeight,
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-0 will-change-[opacity] pointer-events-none"
    >
      <Image
        src={poster}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}
