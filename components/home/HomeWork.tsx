import Image from "next/image";
import { Button } from "@/components/el/ui";
import { BlockSection, BentoGrid, TITLE_CLASS, TitleBlock, type BentoCard } from "@/components/exact";
import { Reveal } from "@/components/el/motion";
import { THETICKSUIT, MASSIMILAW, THEDAVIDIMAGE } from "@/content/clients";

function Shot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 363px, 100vw"
        className="object-cover object-left-top transition-transform duration-700 ease-[cubic-bezier(0.31,0.325,0,0.92)] group-hover:scale-[1.02]"
      />
    </div>
  );
}

const CARDS: BentoCard[] = [
  {
    title: THETICKSUIT.name,
    meta: "Redesign, A/B testing, 24/7 chat, reviews, SEO",
    description: THETICKSUIT.about,
    href: THETICKSUIT.caseStudyHref,
    media: <Shot src={THETICKSUIT.image} alt="TheTickSuit homepage, redesigned by Kenstera" />,
  },
  {
    title: THEDAVIDIMAGE.name,
    meta: "Custom CMS, Squarespace to Payload migration, photography",
    description: THEDAVIDIMAGE.about,
    href: THEDAVIDIMAGE.caseStudyHref,
    media: <Shot src={THEDAVIDIMAGE.image} alt="TheDavidImage gallery overview, migrated to a custom Payload CMS site by Kenstera" />,
  },
  {
    title: MASSIMILAW.name,
    meta: "WordPress migration, accessibility, law firm",
    description: MASSIMILAW.about,
    href: MASSIMILAW.caseStudyHref,
    media: <Shot src={MASSIMILAW.image} alt="MassimiLaw homepage, migrated to WordPress by Kenstera" />,
  },
];

/** Selected work: the card-grid block with a real screenshot at the bottom of each card. */
export function HomeWork() {
  return (
    <>
      <BlockSection id="work" className="px-6 pb-10 pt-20 lg:px-8 lg:pb-10 lg:pt-[120px]">
        <TitleBlock eyebrow="Selected work">
          <h2 className={TITLE_CLASS}>Real clients, real websites</h2>
        </TitleBlock>
      </BlockSection>
      <BlockSection className="px-6 pb-20 pt-10 lg:px-8 lg:pb-[120px]">
        <Reveal>
          <BentoGrid cards={CARDS} columns={3} />
          <div className="mt-10 flex justify-center">
            <Button href="/case-studies">See all case studies</Button>
          </div>
        </Reveal>
      </BlockSection>
    </>
  );
}

export default HomeWork;
