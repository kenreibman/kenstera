import type { Metadata } from "next";
import Link from "next/link";
import { Anatomy } from "@/components/home/Anatomy";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { Method } from "@/components/home/Method";
import { Arrow, Leaf } from "@/components/brand/Leaf";
import { BOOKING_HREF, SYSTEMS } from "@/content/site";
import { OG_IMAGE } from "@/lib/seo";

const DESCRIPTION =
  "Websites and local SEO, instant lead response, workflow automation, and reputation systems. Built, connected, and managed by Kenstera.";

export const metadata: Metadata = {
  title: "Services",
  description: DESCRIPTION,
  openGraph: { title: "Services | Kenstera", description: DESCRIPTION, images: [...OG_IMAGE] },
};

export default function ServicesPage() {
  return (
    <main id="main" className="relative z-[1]">
      <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-48">
        <Leaf veins className="pointer-events-none absolute -right-24 top-10 w-[520px] max-w-[70vw] rotate-[18deg] text-moss/70" />
        <div className="wrap relative">
          <p className="label fade-up mb-6 flex items-center gap-3 text-lime">
            <span className="inline-block h-px w-8 bg-lime" />
            Services
          </p>
          <h1 className="display max-w-[12ch] text-[clamp(3rem,10vw,8.5rem)]">
            <span className="line-mask"><span>Everything a business</span></span>
            <span className="line-mask"><span style={{ ["--d" as string]: "0.12s" }}>needs to <em className="text-lime">grow.</em></span></span>
          </h1>
          <p className="fade-up mt-8 max-w-xl text-lg leading-relaxed text-paper/85" style={{ ["--d" as string]: "0.4s" }}>
            Four systems, designed to work as one. Take the whole plant or start
            with the part that&apos;s hurting most.
          </p>
          <nav aria-label="Systems" className="fade-up mt-10 flex flex-wrap gap-2.5" style={{ ["--d" as string]: "0.55s" }}>
            {SYSTEMS.map((s, i) => (
              <a key={s.id} href={`#${s.id}`} className="chip">
                <span className="font-mono text-xs text-lime">0{i + 1}</span>
                {s.part}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="on-paper rounded-t-[28px] md:rounded-t-[48px]">
        {SYSTEMS.map((s, i) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <div className="wrap">
              <div className={`grid gap-10 py-20 md:grid-cols-12 md:gap-16 md:py-28 ${i > 0 ? "rule" : ""}`}>
                <div className="reveal md:col-span-4">
                  <Anatomy active={s.id} className="mx-auto h-auto w-[70%] max-w-[300px] md:w-full" />
                </div>
                <div className="md:col-span-8">
                  <p className="label reveal mb-5 flex items-center gap-3 text-clay">
                    <span>0{i + 1}</span>
                    <span className="h-px w-6 bg-clay" />
                    <span>{s.part} <span className="normal-case tracking-normal text-stone">({s.latin})</span></span>
                  </p>
                  <h2 className="display reveal text-[clamp(2.2rem,5.4vw,4.6rem)]">{s.title}</h2>
                  <p className="reveal mt-5 max-w-2xl text-lg leading-relaxed text-stone">{s.summary}</p>
                  <dl className="mt-10">
                    {s.items.map((it) => (
                      <div key={it.name} className="reveal rule grid gap-2 py-6 sm:grid-cols-3 sm:gap-8">
                        <dt className="display text-2xl">{it.name}</dt>
                        <dd className="text-[17px] leading-relaxed text-stone sm:col-span-2">{it.detail}</dd>
                      </div>
                    ))}
                  </dl>
                  <Link href={BOOKING_HREF} className="btn btn-ink reveal mt-6">
                    Talk about {s.part.toLowerCase()} <Arrow />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
        <Method />
        <Faq />
      </div>

      <FinalCta scene={false} />
    </main>
  );
}
