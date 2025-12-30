import { Video } from "@/components/Video";

export function Hero() {
  return (
    <section className="bg-white text-black">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 py-12 lg:py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-balance font-semibold leading-[1.05] tracking-[-0.02em] text-6xl sm:text-7xl text-left sm:text-center">
            The design agency your brand has been looking for
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-left sm:text-center text-balance sm:text-pretty text-sm leading-6 text-black/70 sm:text-2xl sm:leading-7">
            Kenstera builds experiences that grow with your ambitions. Driven by thoughtful design, smart technology, and a future-ready mindset.
          </p>
        </div>

        <div className="mt-10 sm:mt-14">
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/10">
            <div className="relative aspect-video w-full bg-neutral-950">
              <Video
                mp4Src="/video/short.mp4"
                webmSrc="/video/hero.webm"
                posterSrc="/video/hero-poster.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
