"use client";

import { useEffect, useState } from "react";
import ScrollVideo from "./ScrollVideo";
import HeroImage from "./HeroImage";

// Chooses the hero background per device: the scrubbing HLS video on desktop,
// a static (fading) image on mobile. Defaults to the image so the server render
// and first paint are the lightweight image (good LCP, and correct for mobile);
// desktop upgrades to the video after mount. On mobile the video/hls.js never
// load at all.
export default function HeroBackground({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const [mode, setMode] = useState<"image" | "video">("image");

  useEffect(() => {
    if (window.matchMedia("(min-width: 769px)").matches) {
      setMode("video");
    }
  }, []);

  return mode === "video" ? (
    <ScrollVideo src={src} poster={poster} />
  ) : (
    <HeroImage poster={poster} />
  );
}
