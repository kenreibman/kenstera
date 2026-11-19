import { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { HomeCta } from "@/components/home";
import { Container, SectionHeader } from "@/components/el/ui";
import { OG_IMAGE } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real work for real clients: how Kenstera redesigned TheTickSuit's site, A/B tested it, added a 24/7 chat and reviews, and manages SEO.",
  openGraph: {
    title: "Case Studies | Kenstera",
    description: "Real work for real clients: how Kenstera redesigned TheTickSuit's site, A/B tested it, added a 24/7 chat and reviews, and manages SEO.",
    type: "website",
    images: [...OG_IMAGE],
  },
};

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();

  return (
    <main className="min-h-screen bg-page">
      <JsonLd data={breadcrumbSchema([{ name: "Case studies", path: "/case-studies" }])} />
      <section className="pb-12 pt-14 sm:pt-20">
        <Container framed>
          <SectionHeader
            as="h1"
            label="Case studies"
            title="Real work for real clients"
            description={
              <p>
                Every project here is real, published with the client&apos;s work live for you to
                see.
              </p>
            }
          />
        </Container>
      </section>

      <section className="pb-20">
        <Container framed>
          {studies.length === 0 ? (
            <p className="py-16 text-center text-[16px] text-subtle">No case studies yet. Check back soon.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {studies.map((study) => (
                <CaseStudyCard key={study.slug} study={study} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <HomeCta />
    </main>
  );
}
