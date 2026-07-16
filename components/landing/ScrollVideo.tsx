"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Hls from "hls.js";

gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function ScrollVideo({
  src,
  poster,
  className = "",
}: ScrollVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    let hls: Hls | null = null;
    let disposed = false;

    ScrollTrigger.config({ ignoreMobileResize: true });
    // NOTE: we deliberately do NOT use ScrollTrigger.normalizeScroll here. It
    // hijacks touch globally, which broke horizontal swiping of the Services /
    // Latest Work card rows on mobile. The "one flick flies past everything"
    // problem is solved natively instead via CSS scroll-snap + scroll-snap-stop
    // (see globals.css `.snap-target` and the markers in app/page.tsx).

    const setupSource = async () => {
      // Safari plays HLS natively (iOS picks the rendition itself via ABR).
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        return;
      }
      // hls.js is ~200 KB — load it only in the browser, only when needed.
      const { default: HlsLib } = await import("hls.js");
      if (disposed) return;
      if (!HlsLib.isSupported()) {
        video.src = src;
        return;
      }
      hls = new HlsLib({
        maxBufferLength: 120,
        maxMaxBufferLength: 600,
        maxBufferSize: 200 * 1024 * 1024,
        startPosition: 0,
        // Force full quality on ALL devices. The clip is only ~6s, so even the
        // 1080p rendition is a few MB — capping quality on mobile just made it
        // grainy (a low rendition magnified by the 1.35 scale on a retina
        // screen). No player-size cap; force the top level on manifest parse.
        capLevelToPlayerSize: false,
        startLevel: -1,
        autoStartLoad: true,
      });
      hls.on(HlsLib.Events.MANIFEST_PARSED, () => {
        if (!hls) return;
        const maxLevel = hls.levels.length - 1;
        hls.currentLevel = maxLevel;
        hls.startLevel = maxLevel;
      });
      hls.loadSource(src);
      hls.attachMedia(video);
    };

    setupSource();

    // Gentle fade-in of the first frame so it doesn't hard-pop from black —
    // no blocking loading screen, so the page never feels like it's waiting.
    gsap.set(video, { opacity: 0 });
    const onCanPlay = () =>
      gsap.to(video, { opacity: 1, duration: 0.6, ease: "power2.out" });
    video.addEventListener("canplay", onCanPlay);

    // Scroll-to-seek, throttled: never issue a new seek while the decoder
    // is still working on the previous one. The `seeked` event drains the
    // latest pending target so we always land on the freshest frame.
    let currentTarget = 0;
    let seekPending = false;
    const doSeek = () => {
      if (!video.duration) return;
      if (!video.seeking) {
        video.currentTime = currentTarget;
      } else {
        seekPending = true;
      }
    };
    const onSeeked = () => {
      if (seekPending) {
        seekPending = false;
        doSeek();
      }
    };
    video.addEventListener("seeked", onSeeked);

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        if (!video.duration) return;
        currentTarget = self.progress * video.duration;
        doSeek();
      },
    });

    // Mouse parallax — desktop with a real pointer only.
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 769px) and (hover: hover) and (prefers-reduced-motion: no-preference)",
      () => {
        const xTo = gsap.quickTo(wrapper, "x", {
          duration: 1.5,
          ease: "power2.out",
        });
        const yTo = gsap.quickTo(wrapper, "y", {
          duration: 1.5,
          ease: "power2.out",
        });
        const onMove = (e: MouseEvent) => {
          const moveX = (e.clientX / window.innerWidth) * 2 - 1;
          const moveY = (e.clientY / window.innerHeight) * 2 - 1;
          xTo(moveX * -30);
          yTo(moveY * -30);
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
      }
    );

    return () => {
      disposed = true;
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("seeked", onSeeked);
      trigger.kill();
      mm.revert();
      hls?.destroy();
    };
  }, [src]);

  return (
    <div
      ref={wrapperRef}
      className={`fixed top-0 left-0 w-full h-full z-0 scale-[1.05] origin-center will-change-transform ${className}`}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover scale-[1.35]"
        poster={poster}
        muted
        playsInline
        crossOrigin="anonymous"
        preload="auto"
      />
    </div>
  );
}
