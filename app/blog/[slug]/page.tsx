import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllSlugs, formatDate } from "@/lib/blog";
import {
  TableOfContents,
  AuthorCard,
  NewsletterCTA,
  mdxComponents,
} from "@/components/blog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Kenstera",
    };
  }

  return {
    title: `${post.title} | Kenstera Blog`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author],
      images: post.heroImage ? [post.heroImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.heroImage ? [post.heroImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    datePublished: post.date,
    dateModified: post.updated || post.date,
    image: post.heroImage,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-background min-h-screen">
        {/* Header */}
        <header className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <div className="max-w-3xl">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance">
                {post.title}
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6">
                {post.description}
              </p>

              {/* Author */}
              <AuthorCard
                author={post.author}
                date={post.date}
                updated={post.updated}
                readingTime={post.readingTime}
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_250px] gap-12">
            {/* Article */}
            <article className="max-w-3xl prose-lg">
              <Suspense fallback={<div className="animate-pulse space-y-4"><div className="h-4 bg-muted rounded w-3/4" /><div className="h-4 bg-muted rounded w-full" /><div className="h-4 bg-muted rounded w-5/6" /></div>}>
                <MDXRemote source={post.content} components={mdxComponents} />
              </Suspense>

              {/* Last Updated */}
              {post.updated && (
                <p className="mt-12 pt-6 border-t border-border text-sm text-muted-foreground">
                  Last updated on {formatDate(post.updated)}
                </p>
              )}
            </article>

            {/* Sidebar - TOC */}
            <aside className="hidden xl:block">
              <TableOfContents />
            </aside>
          </div>

          {/* Newsletter CTA */}
          <div className="max-w-3xl mt-8">
            <NewsletterCTA />
          </div>
        </div>
      </main>
    </>
  );
}
