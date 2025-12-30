"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type VideoProps = {
  mp4Src: string;
  webmSrc?: string;
  posterSrc: string;

  /** Optional: controls how the poster is loaded for LCP (Hero should set true) */
  priorityPoster?: boolean;

  /** next/image sizes attribute (important for performance) */
  sizes?: string;

  /** Tailwind/class styling */
  className?: string;

  /** If true, don't attempt to autoplay until the element is near viewport */
  lazyStart?: boolean;

  /** Optional: override preload behavior */
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(!lazyStart);

  // Reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // If we're lazy-starting, only "load" the video when near viewport
  useEffect(() => {
    if (!lazyStart) return;
    const el = videoRef.current;
    // We observe the wrapper via the video ref once it exists; until then we just don't load.
    // We'll create a tiny sentinel observer by setting shouldLoadVideo in the wrapper below.
  }, [lazyStart]);

  // Autoplay + pause offscreen
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        // Autoplay blocked — keep poster visible (muted+playsInline usually works)
      }
    };

    // Only attempt play when video is actually mounted
    tryPlay();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!video) return;
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
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
      ref={(node) => {
        // Lazy-load trigger: start loading video shortly before it enters viewport
        if (!lazyStart || !node || reducedMotion) return;

        const io = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setShouldLoadVideo(true);
              io.disconnect();
            }
          },
          { rootMargin: "300px 0px", threshold: 0.01 }
        );

        io.observe(node);
      }}
    >
      {/* Poster / fallback is ALWAYS there (fast LCP) */}
      <Image
        src={posterSrc}
        alt=""
        aria-hidden="true"
        fill
        priority={priorityPoster}
        sizes={sizes}
        style={{ objectFit: "cover" }}
      />

      {/* Video overlays poster only when allowed */}
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
          // key forces remount when sources change (useful if reused with dynamic src)
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
