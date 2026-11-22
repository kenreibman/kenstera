import { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";
import Image from "next/image";
import { BentoGrid, BlockSection } from "@/components/exact";
import { HomeCta } from "@/components/home";
import { OG_IMAGE } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real work for real clients: TheTickSuit's tested redesign with 24/7 chat and reviews, TheDavidImage's custom CMS migration to Payload, and MassimiLaw's WordPress migration with an accessible front end.",
  openGraph: {
    title: "Case Studies | Kenstera",
    description: "Real work for real clients: TheTickSuit's tested redesign with 24/7 chat and reviews, TheDavidImage's custom CMS migration to Payload, and MassimiLaw's WordPress migration with an accessible front end.",
    type: "website",
    images: [...OG_IMAGE],
  },
};

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();

  return (
    <main className="bg-page">
      <JsonLd data={breadcrumbSchema([{ name: "Case studies", path: "/case-studies" }])} />

      <BlockSection bare className="pb-10 pt-16 lg:pb-14 lg:pt-24">
        <div className="grid grid-cols-12 gap-x-3">
          <h1 className="el-trim col-span-12 text-[36px] leading-[42px] tracking-[-0.72px] text-black lg:col-span-6 lg:text-[48px] lg:leading-[52px] lg:tracking-[-0.96px]">
            Real work for real clients
          </h1>
          <div className="col-span-12 mt-8 flex flex-col lg:col-span-6 lg:mt-0 lg:pl-5">
            <p className="el-trim mt-auto text-balance text-[16px] leading-6 tracking-[0.16px] text-black lg:text-pretty">
              Every project here is a real client, with the work live for you to see. Where a case study uses an
              illustration, it is labeled as one.
            </p>
          </div>
        </div>
      </BlockSection>

      <BlockSection className="px-6 pb-20 pt-10 lg:px-8 lg:pb-[120px]">
        {studies.length === 0 ? (
          <p className="py-16 text-center text-[16px] text-subtle">No case studies yet. Check back soon.</p>
        ) : (
          <BentoGrid
            columns={2}
            cards={studies.map((study) => ({
              title: study.title,
              meta: study.category,
              description: study.description,
              href: `/case-studies/${study.slug}`,
              media: study.heroImage ? (
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={study.heroImage}
                    alt={study.title}
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover object-left-top transition-transform duration-700 ease-[cubic-bezier(0.31,0.325,0,0.92)] group-hover:scale-[1.02]"
                  />
                </div>
              ) : (
                <div className="aspect-[16/10] w-full bg-surface-2" />
              ),
            }))}
          />
        )}
      </BlockSection>

      <HomeCta />
    </main>
  );
}
