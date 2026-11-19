import Image from "next/image";
import Link from "next/link";
import { Button, GradientCard, Section } from "@/components/el/ui";
import { THETICKSUIT } from "@/content/clients";

/** Selected work, in the "Showcasing the global impact" layout: centered title, story cards. */
export function HomeWork() {
  return (
    <Section id="work">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-[16px] text-subtle">Selected work</p>
        <h2 className="text-[32px] leading-[1.15] text-black sm:text-[40px]">
          A modern website that converts, and a business that runs itself
        </h2>
      </div>

      <div className="mt-14 grid gap-3 lg:grid-cols-3">
        <GradientCard palette="moss" className="min-h-[420px] lg:min-h-[520px]" label="Client" caption={THETICKSUIT.about}>
          <span className="text-[34px] font-semibold tracking-[-0.03em] text-white">{THETICKSUIT.name}</span>
        </GradientCard>

        <Link
          href={THETICKSUIT.caseStudyHref}
          className="group flex flex-col overflow-hidden rounded-2xl bg-surface lg:col-span-2"
          aria-label={`${THETICKSUIT.name} case study`}
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={THETICKSUIT.image}
              alt="TheTickSuit homepage, redesigned by Kenstera"
              fill
              sizes="(min-width: 1024px) 760px, 100vw"
              className="object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
          <div className="flex flex-1 items-end justify-between gap-4 px-6 py-5 sm:px-8">
            <div>
              <p className="text-[15px] text-subtle">Redesign · A/B testing · 24/7 chat · Reviews · SEO</p>
              <p className="mt-1 text-[16px] text-black">See how we rebuilt theticksuit.com</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Button href={THETICKSUIT.caseStudyHref}>Read the case study</Button>
        <Button href={THETICKSUIT.url} variant="secondary" external>
          Visit theticksuit.com
        </Button>
      </div>
    </Section>
  );
}

export default HomeWork;
