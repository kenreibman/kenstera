"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { BOOKING_HREF } from "@/content/site";

/**
 * Hero + story as one scroll-driven shot.
 *
 * A Blender-rendered frame sequence (scripts/blender/monstera.py --seq) is
 * scrubbed by scroll: the camera starts wide on the plant, arcs around it and
 * ends close on a single backlit leaf while the brand statement plays.
 *
 * Without JavaScript, or when reduced motion is requested, it is a still
 * hero image followed by the statement as ordinary text.
 */

const SETS = {
  wide: { dir: "/plant/seq/d", count: 100, w: 1600, h: 1000 },
  tall: { dir: "/plant/seq/m", count: 70, w: 800, h: 1240 },
};
const url = (dir: string, i: number) => `${dir}/${String(i).padStart(3, "0")}.webp`;

const LINES = [
  { a: 0.3, b: 0.5, text: "A monstera leaf grows holes on purpose." },
  { a: 0.5, b: 0.7, text: "They let light reach every leaf below." },
  { a: 0.72, b: 1.5, text: "Kenstera builds the systems that do the same for your business." },
];

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const plantRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const plant = plantRef.current;
    if (!section || !canvas || !plant) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const set = window.innerWidth / window.innerHeight < 0.9 ? SETS.tall : SETS.wide;
    const frames: (HTMLImageElement | null)[] = new Array(set.count).fill(null);
    let disposed = false;
    let raf = 0;
    let drawn = -1;
    let current = 0; // smoothed frame position
    let p = 0;
    let px = 0, py = 0, tpx = 0, tpy = 0;

    // Load coarse-to-fine so scrubbing works long before every frame arrives.
    const order: number[] = [];
    const seen = new Set<number>();
    for (const stride of [16, 8, 4, 2, 1]) {
      for (let i = 0; i < set.count; i += stride) {
        if (!seen.has(i)) { seen.add(i); order.push(i); }
      }
    }
    let next = 0;
    const pump = () => {
      if (disposed || next >= order.length) return;
      const i = order[next++];
      const img = new Image();
      img.decoding = "async";
      img.src = url(set.dir, i);
      const done = () => {
        if (disposed) return;
        frames[i] = img;
        drawn = -1; // a closer frame may now exist
        schedule();
        pump();
      };
      img.decode().then(done, pump);
    };

    const nearest = (i: number) => {
      for (let d = 0; d < set.count; d++) {
        if (frames[i - d]) return i - d;
        if (frames[i + d]) return i + d;
      }
      return -1;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (w !== canvas.width || h !== canvas.height) {
        canvas.width = w;
        canvas.height = h;
        drawn = -1;
      }
    };

    const draw = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      section.style.setProperty("--p", p.toFixed(4));

      const target = Math.min(1, Math.max(0, (p - 0.03) / 0.85)) * (set.count - 1);
      current += (target - current) * 0.2;
      if (Math.abs(target - current) < 0.01) current = target;

      const idx = nearest(Math.round(current));
      if (idx >= 0 && idx !== drawn) {
        const img = frames[idx]!;
        const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
        const w = img.naturalWidth * scale;
        const h = img.naturalHeight * scale;
        ctx.fillStyle = "#06120c";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
        drawn = idx;
      }

      // The plant leans slightly toward the cursor, easing off as you scroll in.
      px += (tpx - px) * 0.08;
      py += (tpy - py) * 0.08;
      const k = 1 - p;
      plant.style.transform = `translate3d(${(-px * 18 * k).toFixed(2)}px, ${(-py * 10 * k).toFixed(2)}px, 0) scale(1.04)`;

      const settling = Math.abs(target - current) > 0.01 || Math.abs(tpx - px) > 0.002 || Math.abs(tpy - py) > 0.002;
      if (settling) schedule();
    };
    const schedule = () => { if (!raf && !disposed) raf = requestAnimationFrame(draw); };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tpx = (e.clientX / window.innerWidth) * 2 - 1;
      tpy = (e.clientY / window.innerHeight) * 2 - 1;
      schedule();
    };
    const onResize = () => { resize(); schedule(); };

    section.dataset.live = "true";
    resize();
    for (let c = 0; c < 6; c++) pump();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    schedule();

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      delete section.dataset.live;
    };
  }, []);

  return (
    <section ref={sectionRef} className="journey bg-ink" aria-label="Kenstera">
      <div className="journey-stage">
        <div ref={plantRef} className="journey-plant" aria-hidden="true">
          <picture>
            <source media="(max-aspect-ratio: 9/10)" srcSet={url(SETS.tall.dir, 0)} />
            <img src={url(SETS.wide.dir, 0)} alt="" width={SETS.wide.w} height={SETS.wide.h} fetchPriority="high" className="journey-poster" />
          </picture>
          <canvas ref={canvasRef} className="journey-canvas" />
        </div>
        <div className="journey-shade" aria-hidden="true" />

        <div className="journey-hero wrap text-center">
          <h1 className="display h1 fade-up mx-auto max-w-[12ch] text-paper">
            Make your business <em className="text-lime">thrive.</em>
          </h1>
          <p className="lede fade-up mx-auto mt-5 max-w-[34ch] text-paper/80" style={{ ["--d" as string]: "0.12s" }}>
            Websites, automations, and follow-up systems that catch every lead
            and take the busywork off your team.
          </p>
          <div className="fade-up mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-2" style={{ ["--d" as string]: "0.24s" }}>
            <Link href={BOOKING_HREF} className="btn btn-lime">
              Book a call
            </Link>
            <a href="#systems" className="link text-lime">
              See what we do
            </a>
          </div>
        </div>

        <div className="journey-lines wrap">
          {LINES.map((l) => (
            <p
              key={l.text}
              className="journey-line display mx-auto max-w-[16ch] text-center text-[clamp(2rem,5.4vw,4.5rem)] text-paper"
              style={{ ["--a" as string]: l.a, ["--b" as string]: l.b }}
            >
              {l.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
