"use client";

import { Star } from "lucide-react";
import Link from "next/link";
import { Video } from "@/components/Video";

function GoogleMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M44.5 24.5c0-1.6-.1-2.8-.4-4.1H24v7.8h11.7c-.2 1.9-1.5 4.8-4.3 6.7l-.1.5 6.4 5 .4.1c3.7-3.4 5.8-8.4 5.8-14Z"
        fill="#4285F4"
      />
      <path
        d="M24 45c5.8 0 10.7-1.9 14.3-5.2l-6.8-5.2c-1.8 1.3-4.3 2.2-7.5 2.2-5.7 0-10.6-3.8-12.3-9l-.5.1-6.6 5.2-.2.5C8 40.6 15.4 45 24 45Z"
        fill="#34A853"
      />
      <path
        d="M11.7 27.8c-.4-1.2-.7-2.5-.7-3.8 0-1.3.3-2.6.7-3.8l0-.5-6.8-5.3-.2.1A20.9 20.9 0 0 0 3 24c0 3.3.8 6.4 2.2 9.1l6.5-5.3Z"
        fill="#FBBC05"
      />
      <path
        d="M24 11.3c4 0 6.7 1.7 8.2 3.1l6-5.9C34.7 5.1 29.8 3 24 3 15.4 3 8 7.4 4.7 14.6l7 5.4c1.7-5.2 6.6-8.7 12.3-8.7Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function About() {
  return (
    <section className="relative bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="hidden aspect-square lg:block lg:col-span-6">
            <Video
              mp4Src="/video/blob.mp4"
              webmSrc="/video/blob.webm"
              posterSrc="/video/blob.webp"
              className="w-full h-full"
              sizes="(min-width:1024px) 528px, 0px"
              />
          </div>

          <div className="lg:col-span-6">
            <div className="mb-6 flex items-center gap-3 text-xs tracking-[0.2em] text-black/60">
              <span className="h-px w-12 bg-black/15" />
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full uppercase bg-emerald-400" />
                Now Creating
              </span>
            </div>

            <h2 className="text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.02em] sm:text-6xl">
              Why Kenstera?
            </h2>

            <p className="mt-6 max-w-xl text-pretty text-lg leading-6 text-black">
              Since 2018, we've partnered with brands to craft standout digital experiences. We design and build websites and products that leave a lasting impression.<br /><br />
              At Kenstera, we don't believe in one-size-fits-all solutions. Every product is developed with precision and care, staying true to the original design vision—no shortcuts, no compromises.
            </p>

            <div className="mt-6 flex items-center gap-3 text-black/70">
              <GoogleMark className="h-4 w-4" />
              <span className="text-xs">5.0</span>
              <div className="flex items-center gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-black text-black" />
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="https://cal.com/kenstera/15min"
                target="_blank"
                className="bg-white border border-black rounded-full px-6 py-3 text-black text-sm font-medium transition hover:bg-black hover:text-white inline-block"
              >
                Book a call
              </Link>
              <button className="bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90">
                Explore Our Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
