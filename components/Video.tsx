"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type VideoProps = {
  mp4Src: string;
  webmSrc?: string;
  posterSrc: string;
  priorityPoster?: boolean;
  sizes?: string;
  className?: string;
  lazyStart?: boolean;
  preload?: "none" | "metadata" | "auto";
};

export function Video({
  mp4Src,
  webmSrc,
  posterSrc,
  className,
  priorityPoster = false,
  sizes = "100vw",
  lazyStart = true,
  preload = "metadata",
}: VideoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(!lazyStart);

  // Reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();

    // Safari < 14 fallback
    if (mq.addEventListener) {
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    } else {
      mq.addListener(apply);
      return () => mq.removeListener(apply);
    }
  }, []);

  // Lazy-start: only mount <video> when near viewport
  useEffect(() => {
    if (!lazyStart || reducedMotion) return;
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px", threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [lazyStart, reducedMotion]);

  // Autoplay + pause offscreen (only when video is mounted)
  useEffect(() => {
    if (reducedMotion || !shouldLoadVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        // Autoplay blocked; leave poster visible underneath
      }
    };

    tryPlay();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryPlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(video);
    return () => io.disconnect();
  }, [reducedMotion, shouldLoadVideo]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Poster is always present (good for LCP) */}
      <Image
        src={posterSrc}
        alt=""
        aria-hidden="true"
        fill
        priority={priorityPoster}
        sizes={sizes}
        style={{ objectFit: "cover" }}
      />

      {!reducedMotion && shouldLoadVideo && (
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          preload={preload}
          controls={false}
          disablePictureInPicture
          aria-hidden="true"
          key={`${mp4Src}|${webmSrc ?? ""}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          {webmSrc ? <source src={webmSrc} type="video/webm" /> : null}
          <source src={mp4Src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
