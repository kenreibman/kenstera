import type { Metadata } from "next";
import Link from "next/link";
import { Anatomy } from "@/components/home/Anatomy";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { Method } from "@/components/home/Method";
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
      <section className="wrap pb-24 pt-[clamp(128px,20vh,210px)] text-center">
        <h1 className="display h1 fade-up mx-auto max-w-[13ch]">
          Everything a business needs to <em className="text-lime">grow.</em>
        </h1>
        <p className="lede fade-up mx-auto mt-6 max-w-[38ch] text-paper/80" style={{ ["--d" as string]: "0.12s" }}>
          Four systems, designed to work as one. Take them all, or start with
          the part that hurts most.
        </p>
      </section>

      <div className="on-paper">
        <div className="section">
          <div className="wrap space-y-4 md:space-y-5">
            {SYSTEMS.map((s) => (
              <section key={s.id} id={s.id} className="tile reveal scroll-mt-20 p-8 sm:p-12 lg:p-16">
                <div className="flex items-start justify-between gap-8">
                  <div>
                    <p className="text-[15px] font-medium text-leaf">{s.part}</p>
                    <h2 className="display h2 mt-2 max-w-[14ch]">{s.title}</h2>
                  </div>
                  <Anatomy active={s.id} className="h-28 w-auto flex-none text-bark max-sm:hidden lg:h-40" />
                </div>
                <p className="lede mt-5 max-w-[52ch] text-stone">{s.summary}</p>

                <dl className="mt-12 grid gap-x-10 gap-y-9 md:grid-cols-3">
                  {s.items.map((it) => (
                    <div key={it.name}>
                      <dt className="text-[21px] font-semibold leading-tight tracking-[-0.02em]">{it.name}</dt>
                      <dd className="mt-2.5 text-[16px] leading-relaxed text-stone">{it.detail}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
            <p className="pt-8 text-center">
              <Link href={BOOKING_HREF} className="btn btn-ink">
                Book a call
              </Link>
            </p>
          </div>
        </div>
        <Method />
        <Faq />
      </div>

      <FinalCta />
    </main>
  );
}
