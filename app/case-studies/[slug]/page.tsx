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
import { FinalCTA } from "@/components/sections/FinalCTA";

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
      title: "Case Study Not Found | Kenstera",
    };
  }

  return {
    title: `${study.title} | Kenstera`,
    description: study.description,
    keywords: study.keywords,
    authors: [{ name: study.author }],
    openGraph: {
      title: study.title,
      description: study.description,
      type: "article",
      publishedTime: study.date,
      modifiedTime: study.updated,
      authors: [study.author],
      images: study.heroImage ? [study.heroImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.description,
      images: study.heroImage ? [study.heroImage] : [],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.description,
    author: {
      "@type": "Organization",
      name: study.author,
    },
    datePublished: study.date,
    dateModified: study.updated || study.date,
    image: study.heroImage,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-background min-h-screen">
        {/* Hero Section */}
        <section className="relative border-b border-border overflow-hidden">
          {/* Decorative bloom */}
          <div
            className="absolute top-0 right-0 w-full h-full pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 70% 100% at 80% 50%, rgba(232,160,130,0.55) 0%, rgba(232,160,130,0.3) 30%, rgba(232,160,130,0.1) 50%, rgba(232,160,130,0.03) 65%, transparent 80%)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-24">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-foreground mb-10 max-w-2xl leading-[1.15]">
              {study.title}
            </h1>

            {/* Stats Row */}
            {study.stats.length > 0 && (
              <div className="flex flex-wrap gap-6 sm:gap-16 mb-10">
                {study.stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
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

        <FinalCTA />
      </main>
    </>
  );
}
