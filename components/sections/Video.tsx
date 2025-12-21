"use client";

export function Video() {

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-[1000px] px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-6xl">
            The agency your brand has been looking for.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-pretty text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
            In a fast-moving digital world, we build experiences that grow with your ambitions. Driven by thoughtful design, smart technology, and a future-ready mindset.
          </p>
        </div>

        <div className="mt-10 sm:mt-14">
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
            <div className="relative aspect-video w-full bg-neutral-950">
              <video
                src="/"
                className="absolute inset-0 h-full w-full object-cover"
                playsInline
                controls
                preload="metadata"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
