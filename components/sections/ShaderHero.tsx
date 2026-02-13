"use client";

import Link from "next/link";
import { MeshGradient } from "@paper-design/shaders-react";

export function ShaderHero() {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center overflow-hidden">
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

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-12 lg:pt-28 lg:pb-16 w-full">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-gray-200/60 text-xs font-medium text-gray-700 mb-8">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gray-500"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M8 12l2.5 2.5L16 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Accepting Firms for our Pilot Program
          </div>

          <h1 className="text-balance font-semibold leading-[1.1] tracking-[-0.02em] text-4xl sm:text-5xl lg:text-6xl text-center text-gray-900">
            After-Hours Conversion System for Law Firms.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-center text-balance text-lg leading-relaxed text-gray-600 sm:text-lg sm:leading-8">
            Capture leads, book appointments, and acquire high-value cases. Save
            time and grow your law firm with our proven system.
          </p>

          <div className="flex flex-row items-center justify-center gap-3 mt-10">
            <Link
              href="/contact-sales"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/10 hover:shadow-xl hover:shadow-gray-900/20"
            >
              Get Started
            </Link>
            <Link
              href="/contact-sales"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-50 transition-colors border border-gray-200"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
