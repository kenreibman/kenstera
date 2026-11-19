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
import { Container, SectionHeader } from "@/components/el/ui";
import { Reveal } from "@/components/el/motion";
import { TheTickSuitWork } from "@/components/case-studies/TheTickSuitWork";
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
      <main className="bg-page min-h-screen">
        {/* Hero Section */}
        <section className="relative">
          <div className="relative mx-auto max-w-[1184px] px-5 sm:px-8 pt-14 sm:pt-20 pb-12">
            {study.category && <p className="mb-3 text-[15px] text-subtle">{study.category}</p>}
            {/* Title */}
            <h1 className="text-[36px] sm:text-[48px] text-black mb-6 max-w-3xl leading-[1.1]">
              {study.title}
            </h1>
            <p className="max-w-2xl text-[16px] leading-[1.5] text-black/80 mb-10">{study.description}</p>

            {study.heroImage && (
              <div className="mb-10 rounded-2xl bg-surface p-2 sm:p-3">
                <Image
                  src={study.heroImage}
                  alt={study.title}
                  width={1440}
                  height={900}
                  priority
                  sizes="(min-width: 1184px) 1120px, 100vw"
                  className="h-auto w-full rounded-xl ring-hairline"
                />
              </div>
            )}

            {/* Stats Row */}
            {study.stats.length > 0 && (
              <div className="flex flex-wrap gap-6 sm:gap-16 mb-10">
                {study.stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl sm:text-4xl font-light text-black tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pull Quote + Attribution */}
            {study.pullQuote && (
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-10">
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-2xl">
                  {study.pullQuote}
                </p>

                <div className="flex items-center gap-3 flex-shrink-0">
                  {study.clientPhoto && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-border">
                      <Image
                        src={study.clientPhoto}
                        alt={study.clientName}
                        fill
                        className="object-cover object-top"
                        sizes="48px"
                      />
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {study.clientName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {study.clientTitle}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Two-column Content Section */}
        <div className="mx-auto max-w-[1184px] px-5 sm:px-8 py-10 sm:py-14 border-t border-hairline">
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
        </div>

        {slug === "theticksuit" && (
          <section className="border-t border-hairline">
            <Container framed>
              <div className="py-16 sm:py-24">
                <Reveal>
                  <SectionHeader
                    label="Inside the work"
                    title="Five workstreams, one goal: more orders with less work"
                    description={<p>Each piece below is illustrated to show how it works. The illustrations are examples of the work, not screenshots of TheTickSuit's tools or data.</p>}
                  />
                </Reveal>
                <div className="mt-10 sm:mt-16">
                  <TheTickSuitWork />
                </div>
              </div>
            </Container>
          </section>
        )}

        <HomeCta />
      </main>
    </>
  );
}
