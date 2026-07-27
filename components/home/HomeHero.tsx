"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useSyncExternalStore } from "react";

const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.MeshGradient),
  { ssr: false }
);

// WebGL detection, probed once and cached so the snapshot stays referentially
// stable across renders. The server snapshot is `false`, so the CSS fallback
// renders first and the shader swaps in after hydration.
let webglSupported: boolean | null = null;

function getWebGLSnapshot() {
  if (webglSupported === null) {
    try {
      const canvas = document.createElement("canvas");
      webglSupported = !!(
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      );
    } catch {
      webglSupported = false;
    }
  }
  return webglSupported;
}

const subscribe = () => () => {};

function useWebGLSupported() {
  return useSyncExternalStore(subscribe, getWebGLSnapshot, () => false);
}

export function HomeHero() {
  const webgl = useWebGLSupported();

  return (
    <section className="relative overflow-hidden">
      {webgl ? (
        <>
          {/* Primary shader layer */}
          <div className="absolute inset-0">
            <MeshGradient
              style={{ width: "100%", height: "100%" }}
              speed={0.3}
              colors={["#f8f8f8", "#e8e4e0", "#ffffff", "#f0ebe6", "#d6d0ca"]}
            />
          </div>

          {/* Secondary overlay layer for depth */}
          <div className="absolute inset-0 opacity-50 mix-blend-soft-light">
            <MeshGradient
              style={{ width: "100%", height: "100%" }}
              speed={0.2}
              distortion={0.6}
              swirl={0.3}
              colors={["#ffffff", "#eae6e2", "#f5f3f0", "#ffffff"]}
            />
          </div>
        </>
      ) : (
        /* CSS fallback when WebGL is unavailable */
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #f8f8f8 0%, #e8e4e0 25%, #ffffff 50%, #f0ebe6 75%, #d6d0ca 100%)",
          }}
        />
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 pt-24 pb-28 lg:pt-32 lg:pb-36">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-balance font-bold leading-[1.05] tracking-[-0.02em] text-[clamp(40px,7vw,72px)] text-gray-900"
          >
            Rapid Growth
            <br />
            For Business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-gray-600"
          >
            Kenstera builds high-converting websites, workflow automations, and
            marketing systems that drive rapid, predictable growth for your
            business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-10 flex flex-row items-center justify-center gap-3"
          >
            <Link
              href="/contact-sales"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/10 hover:shadow-xl hover:shadow-gray-900/20"
            >
              Contact us
            </Link>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-50 transition-colors border border-gray-200"
            >
              What we do
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}

export default HomeHero;
