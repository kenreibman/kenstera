"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type Hls from "hls.js";

interface VideoLightboxProps {
  src: string;
  title: string;
  onClose: () => void;
}

// Full-screen modal that lazily loads and plays a service video. hls.js is
// dynamically imported only when the lightbox opens, so it never touches the
// initial page load. Works for both HLS (.m3u8) and plain files.
export default function VideoLightbox({
  src,
  title,
  onClose,
}: VideoLightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    let disposed = false;
    const isHls = src.endsWith(".m3u8");

    const setup = async () => {
      if (!isHls || video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      } else {
        const { default: HlsLib } = await import("hls.js");
        if (disposed) return;
        if (HlsLib.isSupported()) {
          hls = new HlsLib();
          hls.loadSource(src);
          hls.attachMedia(video);
        } else {
          video.src = src;
        }
      }
      video.play().catch(() => {
        /* autoplay may be blocked; controls are visible so the user can start it */
      });
    };
    setup();

    // Lock background scroll while watching, and support Esc-to-close.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      disposed = true;
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      hls?.destroy();
    };
  }, [src, onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — video`}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close video"
        className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <X size={22} />
      </button>
      <div
        className="w-full max-w-[1100px] aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          className="w-full h-full rounded-2xl bg-black"
          controls
          playsInline
          muted
          crossOrigin="anonymous"
          preload="none"
        />
      </div>
    </div>
  );
}
