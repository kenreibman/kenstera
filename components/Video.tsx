"use client";

import { useEffect, useRef, useState } from "react";

type VideoProps = {
  mp4Src: string;
  webmSrc?: string;
  posterSrc: string;
  className?: string;
};

export function Video({
  mp4Src,
  webmSrc,
  posterSrc,
  className,
}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    // Try to autoplay immediately
    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        // Autoplay blocked — leave poster showing (or you could show a play button)
      }
    };

    tryPlay();

    // Pause when off-screen to save resources
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
  }, [reducedMotion]);

  return (
    <div className={className} style={{ position: "relative", overflow: "hidden" }}>
      {!reducedMotion && (
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          preload="metadata"
          poster={posterSrc}
          controls={false}
          disablePictureInPicture
          aria-hidden="true"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          {webmSrc ? <source src={webmSrc} type="video/webm" /> : null}
          <source src={mp4Src} type="video/mp4" />
        </video>
      )}

      {/* If reduced motion, you can render a static image instead */}
      {reducedMotion && (
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
    </div>
  );
}