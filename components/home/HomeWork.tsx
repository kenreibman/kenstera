import Image from "next/image";
import Link from "next/link";
import { Button, GradientCard, Section, type Palette } from "@/components/el/ui";
import { THETICKSUIT, MASSIMILAW } from "@/content/clients";

interface WorkItem {
  name: string;
  about: string;
  image: string;
  alt: string;
  href: string;
  tags: string;
  cta: string;
  palette: Palette;
  site: string;
}

const WORK: WorkItem[] = [
  {
    name: THETICKSUIT.name,
    about: THETICKSUIT.about,
    image: THETICKSUIT.image,
    alt: "TheTickSuit homepage, redesigned by Kenstera",
    href: THETICKSUIT.caseStudyHref,
    tags: "Redesign · A/B testing · 24/7 chat · Reviews · SEO",
    cta: "See how we rebuilt theticksuit.com",
    palette: "moss",
    site: THETICKSUIT.url,
  },
  {
    name: MASSIMILAW.name,
    about: MASSIMILAW.about,
    image: MASSIMILAW.image,
    alt: "MassimiLaw homepage, designed and built by Kenstera",
    href: MASSIMILAW.caseStudyHref,
    tags: "Website design and build · Law firm",
    cta: "See the website we built for MassimiLaw",
    palette: "dusk",
    site: MASSIMILAW.url,
  },
];

/** Selected work: story cards for each real client. */
export function HomeWork() {
  return (
    <Section id="work">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-[16px] text-subtle">Selected work</p>
        <h2 className="text-[32px] leading-[1.15] text-black sm:text-[40px]">Real clients, real websites</h2>
      </div>

      <div className="mt-14 space-y-3">
        {WORK.map((w, i) => (
          <div key={w.name} className="grid gap-3 lg:grid-cols-3">
            <GradientCard
              palette={w.palette}
              className={`min-h-[360px] lg:min-h-[460px] ${i % 2 === 1 ? "lg:order-2" : ""}`}
              label="Client"
              caption={w.about}
            >
              <span className="text-[34px] font-semibold tracking-[-0.03em] text-white">{w.name}</span>
            </GradientCard>

            <Link
              href={w.href}
              className={`group flex flex-col overflow-hidden rounded-2xl bg-surface lg:col-span-2 ${i % 2 === 1 ? "lg:order-1" : ""}`}
              aria-label={`${w.name} case study`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={w.image}
                  alt={w.alt}
                  fill
                  sizes="(min-width: 1024px) 760px, 100vw"
                  className="object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-1 items-end justify-between gap-4 px-6 py-5 sm:px-8">
                <div>
                  <p className="text-[15px] text-subtle">{w.tags}</p>
                  <p className="mt-1 text-[16px] text-black">{w.cta}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Button href="/case-studies">See all case studies</Button>
      </div>
    </Section>
  );
}

export default HomeWork;
