"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

type Tile = { src: string; alt: string };

const GAP_PX = 24; // tailwind gap-6 = 24px

function useMeasure<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => setHeight(el.getBoundingClientRect().height);

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();

    return () => ro.disconnect();
  }, []);

  return { ref, height };
}

function TileCard({ tile }: { tile: Tile }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden bg-neutral-900/40 ring-1 ring-white/10">
      <Image src={tile.src} alt={tile.alt} fill className="object-cover" />
    </div>
  );
}

function TileSet({
  items,
  measureRef,
  idPrefix,
}: {
  items: Tile[];
  measureRef?: React.Ref<HTMLDivElement>;
  idPrefix: string;
}) {
  return (
    <div ref={measureRef as any} className="flex flex-col gap-6">
      {items.map((t) => (
        <TileCard key={`${idPrefix}-${t.src}`} tile={t} />
      ))}
    </div>
  );
}

function VerticalMarqueeColumn({
  items,
  direction,
  duration = 60,
  className = "",
}: {
  items: Tile[];
  direction: "up" | "down";
  duration?: number;
  className?: string;
}) {
  const { ref, height } = useMeasure<HTMLDivElement>();
  const prefersReducedMotion = useReducedMotion();

  const fromY = direction === "up" ? 0 : -height - GAP_PX;
  const toY = direction === "up" ? -height - GAP_PX : 0;

  return (
    <div className={["relative overflow-hidden", className].join(" ")}>
      <motion.div
        style={{ y: fromY }}
        animate={height && !prefersReducedMotion ? { y: toY } : undefined}
        transition={
          height && !prefersReducedMotion
            ? { duration, ease: "linear", repeat: Infinity }
            : undefined
        }
      >
        <TileSet items={items} measureRef={ref} idPrefix="a" />
        <div aria-hidden style={{ height: GAP_PX }} />
        <TileSet items={items} idPrefix="b" />
      </motion.div>
    </div>
  );
}

const tilesLeft: Tile[] = [
  { src: "/hero/tile-1.png", alt: "Closeup" },
  { src: "/hero/tile-2.png", alt: "Phone on rocks" },
  { src: "/hero/tile-3.png", alt: "Phone on couch" },
  { src: "/hero/tile-4.png", alt: "Dark portrait" },
];

const tilesRight: Tile[] = [
  { src: "/hero/tile-5.png", alt: "Office" },
  { src: "/hero/tile-6.png", alt: "Gallery" },
  { src: "/hero/tile-7.png", alt: "Laptop" },
];

function GoogleMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M44.5 24.5c0-1.6-.1-2.8-.4-4.1H24v7.8h11.7c-.2 1.9-1.5 4.8-4.3 6.7l-.1.5 6.4 5 .4.1c3.7-3.4 5.8-8.4 5.8-14Z"
        fill="#4285F4"
      />
      <path
        d="M24 45c5.8 0 10.7-1.9 14.3-5.2l-6.8-5.2c-1.8 1.3-4.3 2.2-7.5 2.2-5.7 0-10.6-3.8-12.3-9l-.5.1-6.6 5.2-.2.5C8 40.6 15.4 45 24 45Z"
        fill="#34A853"
      />
      <path
        d="M11.7 27.8c-.4-1.2-.7-2.5-.7-3.8 0-1.3.3-2.6.7-3.8l0-.5-6.8-5.3-.2.1A20.9 20.9 0 0 0 3 24c0 3.3.8 6.4 2.2 9.1l6.5-5.3Z"
        fill="#FBBC05"
      />
      <path
        d="M24 11.3c4 0 6.7 1.7 8.2 3.1l6-5.9C34.7 5.1 29.8 3 24 3 15.4 3 8 7.4 4.7 14.6l7 5.4c1.7-5.2 6.6-8.7 12.3-8.7Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative bg-black text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:py-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="mb-6 flex items-center gap-3 text-xs tracking-[0.2em] text-white/60">
              <span className="h-px w-12 bg-white/15" />
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full uppercase bg-emerald-400" />
                Now Creating
              </span>
            </div>

            <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.02em] sm:text-6xl">
              The space
              <br />
              between creativity
              <br />
              and code
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-sm leading-6 text-white/60">
              In the space between creativity and code, we create digital experiences built for
              the future—platforms that adapt, scale, and push your brand forward.
            </p>

            <div className="mt-6 flex items-center gap-3 text-white/70">
              <GoogleMark className="h-4 w-4" />
              <span className="text-xs">5.0</span>
              <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-white text-white" />
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button className="bg-violet-400 px-6 py-3 text-black text-sm font-medium transition hover:bg-violet-500">
                BOOK A CALL
              </button>
              <button className="bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90">
                EXPLORE OUR WORK
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-6">
              <VerticalMarqueeColumn
                items={tilesLeft}
                direction="up"
                duration={60}
                className="h-[520px] sm:h-[620px] lg:h-[680px]"
              />
              <VerticalMarqueeColumn
                items={tilesRight}
                direction="down"
                duration={48}
                className="h-[520px] sm:h-[620px] lg:h-[680px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-black to-transparent" />
    </section>
  );
}
