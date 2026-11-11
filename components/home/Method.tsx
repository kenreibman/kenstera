import { Leaf } from "@/components/brand/Leaf";
import { METHOD } from "@/content/site";

export function Method() {
  return (
    <section id="method" className="on-paper scroll-mt-0 pb-24 md:pb-36">
      <div className="wrap">
        <div className="rule pt-20 md:pt-28">
          <header className="reveal mb-14 grid gap-6 md:mb-24 md:grid-cols-12">
            <p className="label text-stone md:col-span-3">Method</p>
            <div className="md:col-span-9">
              <h2 className="display text-[clamp(2.4rem,6.6vw,5.6rem)]">
                From seed to <em className="text-clay">standing on its own.</em>
              </h2>
            </div>
          </header>

          <div className="relative md:grid md:grid-cols-12">
            {/* A vine that draws itself as you scroll */}
            <svg
              className="pointer-events-none absolute left-[9px] top-0 h-full w-10 md:left-[calc(25%-20px)]"
              viewBox="0 0 40 1000"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <path
                className="vine-path"
                pathLength={1}
                d="M20 0C2 90 38 160 20 250S2 410 20 500 38 660 20 750 2 910 20 1000"
                stroke="var(--color-leaf)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <ol className="md:col-span-9 md:col-start-4">
              {METHOD.map((m) => (
                <li key={m.step} className="reveal relative grid gap-3 pb-16 pl-12 last:pb-0 md:grid-cols-9 md:gap-8 md:pb-24 md:pl-16">
                  <Leaf className="absolute left-0 top-1 h-7 w-7 -rotate-[60deg] text-leaf md:left-[-14px]" />
                  <div className="md:col-span-3">
                    <p className="label text-clay">{m.step}</p>
                    <p className="display mt-1 text-5xl md:text-6xl">
                      <em>{m.name}</em>
                    </p>
                  </div>
                  <div className="md:col-span-6">
                    <h3 className="text-xl font-semibold tracking-[-0.01em] md:text-2xl">{m.title}</h3>
                    <p className="mt-3 max-w-lg text-[17px] leading-relaxed text-stone">{m.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
