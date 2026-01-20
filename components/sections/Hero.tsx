import { Video } from "@/components/Video";

export function Hero() {
  return (
    <section className="bg-white text-black">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 py-12 lg:py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-balance font-medium leading-[1.05] tracking-[-0.02em] text-3xl sm:text-5xl text-left sm:text-center">
            The agency that delivers results
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-left sm:text-center text-balance sm:text-pretty text-lg leading-6 text-black/70 sm:text-lg sm:leading-7">
            Kenstera accelerates your businesses with automated marketing, lead generation, customer support, and more.
          </p>

          <div className="flex flex-row items-center justify-center gap-3 mt-10">
            <a
              href="/contact-sales"
              className="inline-flex items-center justify-center px-6 py-3 bg-black text-white text-[13px] font-semibold tracking-wide uppercase rounded-full hover:bg-gray-800 transition-colors"
            >
              Get Started
            </a>
            <a
              href="/contact-sales"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-900 text-[13px] font-semibold tracking-wide uppercase rounded-full hover:bg-gray-200 transition-colors border border-gray-200"
            >
              Contact Sales
            </a>
          </div>
        </div>

        <div className="mt-10 sm:mt-14">
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/10">
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
        </div>
      </div>
    </section>
  );
}
