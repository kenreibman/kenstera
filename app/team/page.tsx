import type { Metadata } from "next";
import { Button } from "@/components/el/ui";
import { BlockSection, CtaBand } from "@/components/exact";
import { JsonLd } from "@/components/seo/JsonLd";
import { OG_IMAGE } from "@/lib/seo";
import { ORG_ID, breadcrumbSchema } from "@/lib/schema";
import { TEAM } from "@/content/team";

const DESCRIPTION =
  "Meet the Kenstera team: Ken Reibman, founder, and software engineers Francisco Banda and Kousay Jebir.";

export const metadata: Metadata = {
  title: "Team",
  description: DESCRIPTION,
  alternates: { canonical: "https://kenstera.com/team" },
  openGraph: {
    title: "Team | Kenstera",
    description: DESCRIPTION,
    url: "https://kenstera.com/team",
    type: "website",
    images: [...OG_IMAGE],
  },
};

export default function TeamPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Team", path: "/team" }]),
          ...TEAM.map((m) => ({
            "@context": "https://schema.org",
            "@type": "Person",
            name: m.name,
            jobTitle: m.role,
            worksFor: { "@id": ORG_ID },
          })),
        ]}
      />
      <main className="bg-page">
        <BlockSection bare className="pb-10 pt-16 lg:pb-14 lg:pt-24">
          <div className="grid grid-cols-12 gap-x-3">
            <h1 className="el-trim col-span-12 text-[36px] leading-[42px] tracking-[-0.72px] text-black lg:col-span-6 lg:text-[48px] lg:leading-[52px] lg:tracking-[-0.96px]">
              Meet the team
            </h1>
            <div className="col-span-12 mt-8 flex flex-col lg:col-span-6 lg:mt-0 lg:pl-5">
              <p className="el-trim mt-auto text-balance text-[16px] leading-6 tracking-[0.16px] text-black lg:text-pretty">
                The people behind Kenstera, who design, build, and manage the websites and automations we deliver.
              </p>
            </div>
          </div>
        </BlockSection>

        <BlockSection className="px-6 pb-20 pt-10 lg:px-8 lg:pb-[120px]">
          <ul className="grid gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m) => (
              <li key={m.name} className="flex flex-col">
                <div
                  className={`grad g-${m.palette} relative flex aspect-square items-center justify-center overflow-hidden rounded-[20px] border border-[#e5e5e5]`}
                  aria-hidden="true"
                >
                  <span className="font-display text-[88px] font-light leading-none tracking-[-0.04em] text-white/95">
                    {m.initials}
                  </span>
                </div>
                <div className="mt-5 px-3">
                  <h2 className="text-[18px] font-normal leading-[25.2px] tracking-normal text-black">{m.name}</h2>
                  <p className="text-[14px] leading-[19.6px] text-[#6e6e6e]">{m.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </BlockSection>

        <CtaBand title="Want to talk with the team?">
          <Button href="/contact">Contact us</Button>
          <a
            href="mailto:contact@kenstera.com"
            className="inline-flex h-11 items-center rounded-full bg-white px-5 text-[16px] text-black shadow-[0_0_0_0.5px_rgba(0,0,0,0.125)] transition-[background-color] duration-150 hover:bg-surface"
          >
            contact@kenstera.com
          </a>
        </CtaBand>
      </main>
    </>
  );
}
