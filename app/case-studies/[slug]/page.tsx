import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getCaseStudyBySlug,
  getAllCaseStudySlugs,
} from "@/lib/case-studies";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { CaseStudySidebar } from "@/components/case-studies/CaseStudySidebar";
import { HomeCta } from "@/components/home";
import { OG_IMAGE, OG_IMAGE_URL, OG_IMAGE_ABSOLUTE_URL, SITE_URL, jsonLdString } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlockSection, TITLE_CLASS, TitleBlock } from "@/components/exact";
import { TheTickSuitWork } from "@/components/case-studies/TheTickSuitWork";
import { MassimiLawWork } from "@/components/case-studies/MassimiLawWork";
import { TheDavidImageWork } from "@/components/case-studies/TheDavidImageWork";
import { breadcrumbSchema } from "@/lib/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    // The root layout's title.template appends "| Kenstera".
    title: study.seoTitle || study.title,
    description: study.description,
    keywords: study.keywords,
    authors: [{ name: study.author }],
    alternates: {
      canonical: study.canonical || `/case-studies/${slug}`,
    },
    openGraph: {
      title: study.title,
      description: study.description,
      type: "article",
      publishedTime: study.date,
      modifiedTime: study.updated,
      authors: [study.author],
      images: study.heroImage ? [study.heroImage] : [...OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.description,
      images: study.heroImage ? [study.heroImage] : [OG_IMAGE_URL],
    },
  };
}

const WORK: Record<string, { title: string; note: string; node: React.ReactNode }> = {
  theticksuit: {
    title: "Five workstreams, one goal: more orders with less work",
    note: "Each piece below is illustrated to show how it works. The illustrations are examples of the work, not screenshots of TheTickSuit's tools or data.",
    node: <TheTickSuitWork />,
  },
  thedavidimage: {
    title: "A portfolio and a CMS built around the work",
    note: "Every image below is a screenshot of the live site at thedavidimage.com.",
    node: <TheDavidImageWork />,
  },
  massimilaw: {
    title: "Built around three questions every visitor has",
    note: "Every image below is a screenshot of the live site at massimilaw.com.",
    node: <MassimiLawWork />,
  },
};

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/case-studies/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.description,
    author: {
      "@type": "Organization",
      name: study.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Kenstera",
      url: SITE_URL,
    },
    datePublished: study.date,
    dateModified: study.updated || study.date,
    image: study.heroImage || OG_IMAGE_ABSOLUTE_URL,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />
      <JsonLd
        data={breadcrumbSchema([{ name: "Case studies", path: "/case-studies" }, { name: study.clientName || study.title, path: `/case-studies/${slug}` }])}
      />
      <main className="bg-page">
        {/* Hero: borderless block, headline left, summary from column 8 */}
        <BlockSection bare className="pb-10 pt-16 lg:pb-14 lg:pt-24">
          <div className="grid grid-cols-12 gap-x-3">
            <div className="col-span-12 lg:col-span-7 lg:pr-5">
              {study.category && (
                <p className="el-trim mb-5 text-[14px] leading-[21px] tracking-[0.14px] text-subtle">{study.category}</p>
              )}
              <h1 className="el-trim text-[32px] leading-[38px] tracking-[-0.64px] text-black lg:text-[48px] lg:leading-[52px] lg:tracking-[-0.96px]">
                {study.title}
              </h1>
            </div>
            <div className="col-span-12 mt-8 flex flex-col lg:col-span-5 lg:mt-0 lg:pl-5">
              <p className="el-trim mt-auto text-balance text-[16px] leading-6 tracking-[0.16px] text-black lg:text-pretty">
                {study.description}
              </p>
            </div>
          </div>
        </BlockSection>

        {study.heroImage && (
          <BlockSection className="p-0" containerClassName="mt-[52px]">
            <div className="px-4 py-4">
              <div className="overflow-hidden rounded-3xl bg-[#f7f4f2]">
                <Image
                  src={study.heroImage}
                  alt={study.title}
                  width={1440}
                  height={900}
                  priority
                  sizes="(min-width: 1184px) 1144px, 100vw"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </BlockSection>
        )}

        {(study.stats.length > 0 || study.pullQuote) && (
          <BlockSection className="px-6 py-14 lg:px-8 lg:py-20">
            {study.stats.length > 0 && (
              <div className="mb-10 flex flex-wrap gap-6 sm:gap-16">
                {study.stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl font-light tracking-tight text-black sm:text-4xl">{stat.value}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
            {study.pullQuote && (
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end sm:gap-10">
                <p className="max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg">{study.pullQuote}</p>
                <div className="flex flex-shrink-0 items-center gap-3">
                  {study.clientPhoto && (
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-border">
                      <Image src={study.clientPhoto} alt={study.clientName} fill className="object-cover object-top" sizes="48px" />
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-semibold text-foreground">{study.clientName}</div>
                    <div className="text-sm text-muted-foreground">{study.clientTitle}</div>
                  </div>
                </div>
              </div>
            )}
          </BlockSection>
        )}

        {/* Two-column Content Section */}
        <BlockSection className="px-6 py-14 lg:px-8 lg:py-20">
          {/* Mobile back link */}
          <div className="lg:hidden mb-8">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Case Studies
            </Link>
          </div>

          <div className="lg:flex lg:items-start lg:gap-12 xl:gap-16">
            {/* Left Sidebar — desktop only */}
            <div className="hidden lg:block w-56 flex-shrink-0 self-stretch">
              <CaseStudySidebar
                sidebarMeta={study.sidebarMeta}
                toc={study.toc}
                url={pageUrl}
              />
            </div>

            {/* Right Content */}
            <div className="min-w-0 flex-1 max-w-3xl">
              {/* Optional Video Embed */}
              {study.videoUrl && (
                <div className="aspect-video mb-12 rounded-xl overflow-hidden border border-border">
                  <iframe
                    src={study.videoUrl}
                    title={`${study.title} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )}

              {/* MDX Content */}
              <article className="prose-lg">
                <Suspense
                  fallback={
                    <div className="animate-pulse space-y-4">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-5/6" />
                    </div>
                  }
                >
                  <MDXRemote source={study.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
                </Suspense>
              </article>
            </div>
          </div>
        </BlockSection>

        {WORK[slug] && (
          <>
            <BlockSection className="px-6 pb-16 pt-20 lg:px-8 lg:pb-20 lg:pt-[120px]">
              <TitleBlock eyebrow="Inside the work">
                <h2 className={TITLE_CLASS}>{WORK[slug].title}</h2>
              </TitleBlock>
              <p className="el-trim mx-auto mt-5 max-w-[560px] px-5 text-center text-[16px] leading-6 tracking-[0.16px] text-subtle">
                {WORK[slug].note}
              </p>
            </BlockSection>
            <BlockSection className="p-0">{WORK[slug].node}</BlockSection>
          </>
        )}

        <HomeCta />
      </main>
    </>
  );
}
