import Link from "next/link";
import Image from "next/image";
import { getAllPosts, formatDate } from "@/lib/blog";

export function BlogSection() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="bg-neutral-950 text-white py-20 sm:py-28" id="blog">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-12 sm:mb-16">
          Blog
        </h2>

        {/* Posts */}
        <div className="space-y-8 sm:space-y-10">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 items-center">
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden rounded-xl bg-neutral-800">
                  {post.heroImage ? (
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      width={600}
                      height={375}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
                  )}
                </div>

                {/* Content */}
                <div>
                  {/* Tag */}
                  {post.tags[0] && (
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white text-neutral-950 mb-4 uppercase tracking-wide">
                      {post.tags[0]}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 leading-tight group-hover:text-white/70 transition-colors">
                    {post.title}
                  </h3>

                  {/* Date */}
                  <time
                    dateTime={post.date}
                    className="text-sm text-white/50"
                  >
                    {formatDate(post.date)}
                  </time>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-14 sm:mt-20">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium rounded-full border border-white text-white hover:bg-white hover:text-neutral-950 transition-colors"
          >
            Visit our blog
          </Link>
        </div>
      </div>
    </section>
  );
}
