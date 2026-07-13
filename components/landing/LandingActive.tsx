"use client";

import { useEffect } from "react";

// Toggles the `landing-active` class on <html> only while the immersive landing
// page is mounted. That class scopes the dark background and vertical
// scroll-snap (see globals.css) to the landing route, so the rest of the site
// keeps its normal light theme and free scrolling. Renders nothing.
export default function LandingActive() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("landing-active");
    return () => root.classList.remove("landing-active");
  }, []);

  return null;
}
