import { Video } from "@/components/Video";

function Sparkles() {
  return (
    <svg
      className="absolute -top-3 -left-2 w-8 h-8"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      {/* Main sparkle */}
      <path
        d="M16 4L17.5 12.5L26 14L17.5 15.5L16 24L14.5 15.5L6 14L14.5 12.5L16 4Z"
        fill="url(#sparkle-gradient)"
      />
      {/* Small sparkle top-right */}
      <path
        d="M26 2L26.75 5.25L30 6L26.75 6.75L26 10L25.25 6.75L22 6L25.25 5.25L26 2Z"
        fill="url(#sparkle-gradient)"
      />
      {/* Tiny sparkle */}
      <circle cx="8" cy="6" r="1.5" fill="url(#sparkle-gradient)" />
      <defs>
        <linearGradient id="sparkle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-gray-50/80 to-white text-black overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-12 lg:pt-28 lg:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance font-semibold leading-[1.1] tracking-[-0.02em] text-4xl sm:text-5xl lg:text-6xl text-center text-gray-900">
            <span className="relative inline-block">
              <Sparkles />
              <span className="text-indigo-500">AI</span>
            </span>{" "}
            lead engagement software that helps you scale.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-center text-balance text-lg leading-relaxed text-gray-600 sm:text-lg sm:leading-8">
            Respond instantly, follow up automatically, and book more appointments with automation designed for how modern service teams work.
          </p>

          <div className="flex flex-row items-center justify-center gap-3 mt-10">
            <a
              href="/contact-sales"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/10 hover:shadow-xl hover:shadow-gray-900/20"
            >
              Get Started
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/contact-sales"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-50 transition-colors border border-gray-200"
            >
              Contact Sales
            </a>
          </div>
        </div>

        {/* <div className="mt-16 sm:mt-20">
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-2xl shadow-gray-900/10">
            <div className="relative aspect-square sm:aspect-video w-full bg-neutral-950">
              <Video
                mp4Src="/video/short.mp4"
                webmSrc="/video/short.webm"
                posterSrc="/video/short.webp"
                className="w-full h-full"
                priorityPoster
                sizes="(min-width: 1024px) 1104px, (min-width: 640px) 960px, 600px"
                preload="none"
              />
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
