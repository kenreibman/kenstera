"use client";

import dynamic from "next/dynamic";

// The WebGL scene is client-only and loads after first paint; the CSS
// fallback underneath covers the gap (and devices without WebGL2).
const LeafScene = dynamic(() => import("./LeafScene"), { ssr: false });

export function SceneMount() {
  return (
    <>
      <div className="scene-fallback" aria-hidden="true" />
      <LeafScene />
    </>
  );
}
