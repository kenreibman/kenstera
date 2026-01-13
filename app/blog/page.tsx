import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog";

export const metadata: Metadata = {
  title: "Blog | Kenstera",
  description:
    "Insights on AI, automation, and digital transformation for modern businesses. Learn how to grow faster and smarter.",
  openGraph: {
    title: "Blog | Kenstera",
    description:
      "Insights on AI, automation, and digital transformation for modern businesses.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Insights & Resources
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Practical guides on AI, automation, and building digital products
              that actually work. No fluff, just actionable insights.
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-x-8 gap-y-12 sm:gap-x-12 sm:gap-y-16 grid-cols-1 sm:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
