"use client";

import { useState } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import VideoLightbox from "./VideoLightbox";

// PLACEHOLDER videos — all point at the demo stream so the interaction is
// demonstrable. Replace each `video` with the real "me explaining this service"
// clip (an .m3u8 HLS URL, or a plain .mp4).
const PLACEHOLDER_VIDEO =
  "https://stream.mux.com/43NlHXsaMrmyzWamMk87m01fNyxSTekAD669BBAPBNm00.m3u8";

const SERVICES = [
  {
    title: "Custom Websites",
    description: "Conversion-optimized, high-performance websites.",
    video: PLACEHOLDER_VIDEO,
  },
  {
    title: "Review Funnel",
    description:
      "Automatic 5-star review funnels that acquire genuine social proof for your business.",
    video: PLACEHOLDER_VIDEO,
  },
  {
    title: "Missed Call Text Back",
    description:
      "24/7 intake that instantly texts back missed calls, so no lead is ever lost.",
    video: PLACEHOLDER_VIDEO,
  },
  {
    title: "Marketing Campaigns",
    description:
      "Targeted paid and email campaigns that drive qualified demand.",
    video: PLACEHOLDER_VIDEO,
  },
  {
    title: "Local SEO",
    description: "Organic lead acquisition through local search visibility.",
    video: PLACEHOLDER_VIDEO,
  },
];

export function HomeServices() {
  const [openVideo, setOpenVideo] = useState<{
    src: string;
    title: string;
  } | null>(null);

  return (
    <section id="services" className="relative scroll-mt-14 py-20 md:py-28">
      {/* Dotted line separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#e5e7eb_4px,#e5e7eb_8px)]" />

      <div className="w-full max-w-7xl mx-auto px-5">
        {/* Label */}
        <p className="text-sm font-medium text-gray-900 mb-16">What We Do</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — sticky heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] tracking-tight text-gray-900 mb-6">
              Services
            </h2>
            <p className="text-[15px] leading-relaxed text-gray-600 mb-8">
              Five systems that work together. Press play on any of them and
              I&apos;ll walk you through exactly how it works.
            </p>
            <Link
              href="/contact-sales"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-200 text-gray-900 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors"
            >
              Contact us
            </Link>
          </div>

          {/* Right — numbered service list */}
          <ul className="lg:col-span-8">
            {SERVICES.map((service, index) => (
              <li
                key={service.title}
                className="border-t border-gray-200 last:border-b"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenVideo({ src: service.video, title: service.title })
                  }
                  aria-label={`Play video: ${service.title}`}
                  className="group w-full text-left py-7 flex items-start gap-5 sm:gap-8"
                >
                  <span className="text-sm font-medium text-gray-300 tabular-nums pt-1 group-hover:text-gray-900 transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="flex-1">
                    <span className="block text-lg sm:text-xl font-semibold text-gray-900 mb-1.5">
                      {service.title}
                    </span>
                    <span className="block text-[15px] leading-relaxed text-gray-600 max-w-xl">
                      {service.description}
                    </span>
                  </span>

                  <span className="shrink-0 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-900 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition-colors">
                    <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {openVideo && (
        <VideoLightbox
          src={openVideo.src}
          title={openVideo.title}
          onClose={() => setOpenVideo(null)}
        />
      )}
    </section>
  );
}

export default HomeServices;
