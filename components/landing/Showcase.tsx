"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Plus } from "lucide-react";
import VideoLightbox from "./VideoLightbox";

gsap.registerPlugin(ScrollTrigger);

const BRANDS = ["VOICEFLOW", "ZENDESK", "PENDO", "GLIDE", "CANVA"];

const TESTIMONIALS = [
  {
    quote:
      "Kenstera rebuilt our website and booking requests tripled in two months. It finally feels like us.",
    name: "Maya R.",
    role: "Boutique Studio Owner",
  },
  {
    quote:
      "The automations they set up quietly handle the busywork that used to eat my evenings. I got my time back.",
    name: "Devin K.",
    role: "Agency Founder",
  },
  {
    quote:
      "Their marketing systems gave us a pipeline we can actually predict. Leads stopped being luck.",
    name: "Priya S.",
    role: "SaaS Co-founder",
  },
  {
    quote:
      "We went from a dead landing page to a system that compounds. Revenue is up 40% since launch.",
    name: "Marcus L.",
    role: "E-commerce Director",
  },
];

// PLACEHOLDER videos — all point at the demo stream so the card interaction is
// demonstrable. Replace each `video` with the real "me explaining this service"
// clip (an .m3u8 HLS URL, or a plain .mp4). Titles/descriptions are placeholder too.
const PLACEHOLDER_VIDEO =
  "https://stream.mux.com/43NlHXsaMrmyzWamMk87m01fNyxSTekAD669BBAPBNm00.m3u8";

const SERVICES = [
  {
    title: "Custom Websites",
    description: "Conversion-optimized, high-performance websites.",
    video: PLACEHOLDER_VIDEO,
  },
  {
    title: "Review Funnel",
    description:
      "Automatic 5-star review funnels that acquire genuine social proof for your business.",
    video: PLACEHOLDER_VIDEO,
  },
  {
    title: "Missed Call Text Back",
    description:
      "24/7 intake that instantly texts back missed calls, so no lead is ever lost.",
    video: PLACEHOLDER_VIDEO,
  },
  {
    title: "Marketing Campaigns",
    description:
      "Targeted paid and email campaigns that drive qualified demand.",
    video: PLACEHOLDER_VIDEO,
  },
  {
    title: "Local SEO",
    description: "Organic lead acquisition through local search visibility.",
    video: PLACEHOLDER_VIDEO,
  },
];

// PLACEHOLDER work — image cards. Swap the gradient for a real project image,
// and the detail page at /work/[slug] is a stub for now (see app/work/[slug]).
const WORK = [
  { title: "Bloom Studio", slug: "bloom-studio" },
  { title: "Northwind Ops", slug: "northwind-ops" },
  { title: "Cadence", slug: "cadence" },
  { title: "Harvest & Co.", slug: "harvest-co" },
];

// Placeholder "image" backgrounds until real project images are supplied.
const WORK_GRADIENTS = [
  "from-emerald-900/50 to-black",
  "from-amber-900/50 to-black",
  "from-sky-900/50 to-black",
  "from-rose-900/50 to-black",
];

const FAQS = [
  {
    q: "How fast can you launch a new website or system?",
    a: "Most website builds go live in 2–4 weeks, depending on page count and how ready your content is. Automations and lead-capture systems are usually running within a week — we start with the highest-impact piece, like missed-call text-back, so you see results before the whole system is finished.",
  },
  {
    q: "Do I need to be technical to work with you?",
    a: "Not at all. We handle the build, the integrations, and the ongoing maintenance. You get a system that runs quietly in the background and a simple dashboard to see what's happening. If you can check email, you can run what we set up.",
  },
  {
    q: "What does this actually cost?",
    a: "It depends on scope, but we price in clear plans rather than surprise invoices — see the Pricing page for the tiers. Most clients start with one system, prove the ROI, then expand. There's no long lock-in contract.",
  },
  {
    q: "Will this work with the tools I already use?",
    a: "Almost certainly. We integrate with the CRMs, calendars, and phone systems most businesses already run. If you're on something custom, we'll build the connection rather than force you to switch platforms.",
  },
  {
    q: "How do you measure whether it's working?",
    a: "Every system ships with tracking tied to outcomes you care about — leads captured, calls recovered, appointments booked, revenue attributed. We review the numbers with you and adjust. If a channel isn't paying off, we cut it.",
  },
  {
    q: "What if I already have a website?",
    a: "We can work with what you have or rebuild it. Often the fastest win is layering automation and lead capture onto your current site first, then redesigning once the pipeline is proven — so you never lose your existing traffic or SEO along the way.",
  },
];

const PANEL_CLASS =
  "glass-panel w-full max-w-[1250px] h-[900px] max-h-[85svh] flex flex-col justify-between rounded-3xl relative overflow-hidden border border-white/10 bg-black/40 backdrop-blur-[24px] md:bg-black/[0.16] md:backdrop-blur-[160px] pointer-events-auto";

const WRAP_CLASS =
  "fixed inset-0 z-20 flex items-center justify-center p-3 md:p-6 pointer-events-none will-change-transform";

export default function Showcase() {
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [openVideo, setOpenVideo] = useState<{
    src: string;
    title: string;
  } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    // Global scroll config lives here because Showcase mounts on every device
    // (ScrollVideo, which used to set this, no longer mounts on mobile).
    ScrollTrigger.config({ ignoreMobileResize: true });

    const container = document.getElementById("scroll-root");
    const wraps = wrapRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!container || wraps.length !== 6) return;

    const ctx = gsap.context(() => {
      gsap.set(wraps, { yPercent: 100, opacity: 0 });

      // One master timeline scrubbed across the whole page. Position numbers
      // are timeline units (total duration 118); scroll-% maps across the whole
      // timeline. Panels overlap so each slides up as the previous slides out.
      // Order: About, Testimonials, Services, Work, FAQ, Contact. Contact holds
      // to the bottom. Keep the resting points in sync with SNAP_OFFSETS_VH in
      // app/page.tsx (offset = restingPos / 118 × scrollableRange).
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          // Section snapping is handled natively by CSS scroll-snap (see the
          // `.snap-target` markers in app/page.tsx), so we don't set GSAP snap
          // here — that avoids double-snapping and doesn't hijack touch.
        },
      });

      tl.to(wraps[0], { yPercent: 0, opacity: 1, ease: "power2.out", duration: 10 }, 8)
        .to(wraps[0], { yPercent: -100, opacity: 0, ease: "power2.in", duration: 10 }, 24)
        .to(wraps[1], { yPercent: 0, opacity: 1, ease: "power2.out", duration: 10 }, 27)
        .to(wraps[1], { yPercent: -100, opacity: 0, ease: "power2.in", duration: 10 }, 42)
        .to(wraps[2], { yPercent: 0, opacity: 1, ease: "power2.out", duration: 10 }, 45)
        .to(wraps[2], { yPercent: -100, opacity: 0, ease: "power2.in", duration: 10 }, 60)
        .to(wraps[3], { yPercent: 0, opacity: 1, ease: "power2.out", duration: 10 }, 63)
        .to(wraps[3], { yPercent: -100, opacity: 0, ease: "power2.in", duration: 10 }, 78)
        .to(wraps[4], { yPercent: 0, opacity: 1, ease: "power2.out", duration: 10 }, 81)
        .to(wraps[4], { yPercent: -100, opacity: 0, ease: "power2.in", duration: 10 }, 96)
        .to(wraps[5], { yPercent: 0, opacity: 1, ease: "power2.out", duration: 11 }, 99)
        .to({}, { duration: 8 }, 110);
    }, container);

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 769px) and (hover: hover) and (prefers-reduced-motion: no-preference)",
      () => {
        const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
        const xTo = panels.map((p) => gsap.quickTo(p, "x", { duration: 1, ease: "power3.out" }));
        const yTo = panels.map((p) => gsap.quickTo(p, "y", { duration: 1, ease: "power3.out" }));
        const rxTo = panels.map((p) => gsap.quickTo(p, "rotationX", { duration: 1, ease: "power3.out" }));
        const ryTo = panels.map((p) => gsap.quickTo(p, "rotationY", { duration: 1, ease: "power3.out" }));
        const onMove = (e: MouseEvent) => {
          const moveX = (e.clientX / window.innerWidth) * 2 - 1;
          const moveY = (e.clientY / window.innerHeight) * 2 - 1;
          panels.forEach((_, i) => {
            xTo[i](moveX * 20);
            yTo[i](moveY * 20);
            ryTo[i](moveX * 4);
            rxTo[i](-moveY * 4);
          });
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
      }
    );

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  const setWrap = (i: number) => (el: HTMLDivElement | null) => {
    wrapRefs.current[i] = el;
  };
  const setPanel = (i: number) => (el: HTMLDivElement | null) => {
    panelRefs.current[i] = el;
  };

  return (
    <>
      {/* Panel 1 — About / company */}
      <div ref={setWrap(0)} className={WRAP_CLASS} style={{ perspective: "1000px" }}>
        <div
          ref={setPanel(0)}
          className={PANEL_CLASS}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 text-center">
            <p className="font-serif italic text-white/70 text-base md:text-lg mb-4 md:mb-6">
              About Kenstera
            </p>
            <h2 className="font-serif text-white text-3xl sm:text-4xl md:text-6xl lg:text-[96px] leading-[1.15] lg:leading-[92.6px] tracking-tight w-full max-w-[1000px] mx-auto">
              We help businesses <span className="italic">grow</span> — websites,
              automations, and marketing systems that turn stagnant brands into{" "}
              <span className="italic">thriving</span> ones. Watch your business{" "}
              <span className="italic">bloom</span>
            </h2>
          </div>
          <div className="border-t border-white/10 py-6 overflow-hidden">
            <div className="flex w-max animate-marquee will-change-transform">
              {[0, 1, 2, 3].map((copy) => (
                <div
                  key={copy}
                  className="flex items-center gap-12 md:gap-16 pr-12 md:pr-16"
                  aria-hidden={copy > 0}
                >
                  {BRANDS.map((brand) => (
                    <span
                      key={brand}
                      className="text-white opacity-40 hover:opacity-100 transition-opacity duration-300 uppercase font-sans font-semibold text-sm tracking-widest whitespace-nowrap"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Panel 2 — Testimonials */}
      <div ref={setWrap(1)} className={WRAP_CLASS} style={{ perspective: "1000px" }}>
        <div
          ref={setPanel(1)}
          className={PANEL_CLASS}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 text-center w-full">
            <p className="font-serif italic text-white/70 text-base md:text-lg mb-4 md:mb-6">
              What Clients Say
            </p>
            <h2 className="font-serif text-white text-4xl md:text-6xl lg:text-[80px] leading-[1.1] tracking-tight mb-8 md:mb-12">
              Testimonials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full max-w-[960px] text-left">
              {TESTIMONIALS.map((t) => (
                <figure
                  key={t.name}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-7"
                >
                  <blockquote className="font-serif italic text-white text-lg md:text-2xl leading-snug mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="font-sans text-sm text-white/60">
                    <span className="font-semibold text-white/90">{t.name}</span>{" "}
                    — {t.role}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Panel 3 — Services (video cards) */}
      <div ref={setWrap(2)} className={WRAP_CLASS} style={{ perspective: "1000px" }}>
        <div
          ref={setPanel(2)}
          className={PANEL_CLASS}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          <div className="flex-1 flex flex-col items-center justify-center w-full min-h-0">
            <div className="text-center px-6 md:px-12">
              <p className="font-serif italic text-white/70 text-base md:text-lg mb-4 md:mb-6">
                What We Do
              </p>
              <h2 className="font-serif text-white text-4xl md:text-6xl lg:text-[80px] leading-[1.1] tracking-tight mb-8 md:mb-12">
                Services
              </h2>
            </div>
            {/* Horizontal scroll-snap row so 5 video cards fit any height. */}
            <div className="w-full overflow-x-auto overflow-y-hidden overscroll-x-contain pb-4">
              <ul className="flex items-stretch gap-4 md:gap-6 px-6 md:px-12 w-max mx-auto snap-x snap-mandatory">
                {SERVICES.map((s) => (
                  <li
                    key={s.title}
                    className="snap-start w-[260px] md:w-[300px] shrink-0 flex"
                  >
                    <button
                      onClick={() =>
                        setOpenVideo({ src: s.video, title: s.title })
                      }
                      className="group text-left w-full h-full flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-white/25 transition-colors"
                      aria-label={`Play video: ${s.title}`}
                    >
                      <div className="relative aspect-video shrink-0 bg-gradient-to-br from-white/10 to-white/[0.02] flex items-center justify-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black group-hover:scale-110 transition-transform">
                          <Play size={22} className="ml-1" fill="currentColor" />
                        </span>
                      </div>
                      <div className="p-4 md:p-5 flex-1">
                        <h3 className="font-sans font-semibold text-white text-base md:text-lg mb-1.5">
                          {s.title}
                        </h3>
                        <p className="font-sans text-white/55 text-sm leading-relaxed">
                          {s.description}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Panel 4 — Latest Work */}
      <div ref={setWrap(3)} className={WRAP_CLASS} style={{ perspective: "1000px" }}>
        <div
          ref={setPanel(3)}
          className={PANEL_CLASS}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          <div className="flex-1 flex flex-col items-center justify-center w-full min-h-0">
            <div className="text-center px-6 md:px-12">
              <p className="font-serif italic text-white/70 text-base md:text-lg mb-4 md:mb-6">
                Selected Projects
              </p>
              <h2 className="font-serif text-white text-4xl md:text-6xl lg:text-[80px] leading-[1.1] tracking-tight mb-8 md:mb-12">
                Latest Work
              </h2>
            </div>
            {/* Horizontal scroll-snap row so the case studies fit any height. */}
            <div className="w-full overflow-x-auto overflow-y-hidden overscroll-x-contain pb-4">
              <ul className="flex gap-4 md:gap-6 px-6 md:px-12 w-max mx-auto snap-x snap-mandatory">
                {WORK.map((w, i) => (
                  <li
                    key={w.slug}
                    className="snap-start w-[260px] md:w-[300px] shrink-0"
                  >
                    <Link
                      href={`/work/${w.slug}`}
                      aria-label={`View project: ${w.title}`}
                      className="group relative block aspect-[4/5] rounded-2xl overflow-hidden border border-white/10"
                    >
                      {/* Placeholder image — swap for a real <Image> when available. */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${
                          WORK_GRADIENTS[i % WORK_GRADIENTS.length]
                        }`}
                      />
                      {/* Overlay with just the project name. Shown always on
                          touch (no hover); revealed on hover from md up. */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-serif text-white text-2xl md:text-3xl px-4 text-center">
                          {w.title}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Panel 5 — FAQ (accordion keeps this text-heavy section compact) */}
      <div ref={setWrap(4)} className={WRAP_CLASS} style={{ perspective: "1000px" }}>
        <div
          ref={setPanel(4)}
          className={PANEL_CLASS}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          <div className="flex-1 flex flex-col w-full min-h-0 px-6 md:px-12 pt-10 md:pt-14 pb-8 md:pb-10">
            <div className="text-center shrink-0 mb-8 md:mb-10">
              <p className="font-serif italic text-white/70 text-base md:text-lg mb-4 md:mb-6">
                Questions, answered
              </p>
              <h2 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                Frequently <span className="italic">asked</span>
              </h2>
            </div>
            {/* Only the questions show by default; answers expand on demand, so
                the panel stays bounded regardless of answer length. The list
                scrolls internally as a safety net if content ever overflows. */}
            <div className="w-full max-w-[820px] mx-auto flex-1 min-h-0 overflow-y-auto overscroll-y-contain pr-1">
              <ul className="flex flex-col gap-3">
                {FAQS.map((f, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <li
                      key={f.q}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="group w-full flex items-center justify-between gap-4 text-left px-5 md:px-6 py-4 md:py-5"
                      >
                        <span className="font-serif text-white text-lg md:text-2xl leading-snug">
                          {f.q}
                        </span>
                        <Plus
                          size={20}
                          className={`shrink-0 text-white/60 group-hover:text-white transition-all duration-300 ${
                            isOpen ? "rotate-45 text-white" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="font-sans text-white/60 text-sm md:text-base leading-relaxed px-5 md:px-6 pb-5 md:pb-6">
                            {f.a}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Panel 6 — Contact */}
      <div ref={setWrap(5)} className={WRAP_CLASS} style={{ perspective: "1000px" }}>
        <div
          ref={setPanel(5)}
          className={PANEL_CLASS}
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 text-center">
            <p className="font-serif italic text-white/70 text-base md:text-lg mb-4 md:mb-6">
              Get in Touch
            </p>
            <h2 className="font-serif text-white text-3xl sm:text-4xl md:text-6xl lg:text-[88px] leading-[1.1] tracking-tight w-full max-w-[900px] mx-auto mb-8 md:mb-10">
              Let&rsquo;s grow your <span className="italic">business</span>
            </h2>
            <div className="flex flex-col items-center gap-5">
              <Link
                href="/contact-sales"
                className="inline-block font-sans font-semibold uppercase tracking-widest text-sm text-black bg-white rounded-full px-8 py-4 hover:bg-white/80 transition-colors"
              >
                Contact us
              </Link>
              <a
                href="mailto:info@kenstera.com"
                className="font-sans text-sm text-white/55 hover:text-white transition-colors"
              >
                or email info@kenstera.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {openVideo && (
        <VideoLightbox
          src={openVideo.src}
          title={openVideo.title}
          onClose={() => setOpenVideo(null)}
        />
      )}
    </>
  );
}
