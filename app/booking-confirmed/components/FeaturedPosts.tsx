import Link from "next/link";
import Image from "next/image";
import { getAllPosts, formatDate } from "@/lib/blog";

export default function FeaturedPosts() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section className="relative py-16 bg-gray-50 border-t border-gray-200">
      <div className="w-full max-w-7xl mx-auto px-5">
        <div className="text-center mb-10">
          <p className="text-[13px] font-semibold tracking-wide uppercase text-red-600 mb-3">
            While you wait
          </p>
          <h2 className="text-[clamp(24px,4vw,32px)] font-bold leading-[1.2] text-gray-900">
            Read up on PI intake best practices
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <article>
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                  {post.heroImage ? (
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Tag */}
                  {post.tags[0] && (
                    <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 mb-3 uppercase tracking-wide">
                      {post.tags[0]}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Date */}
                  <time
                    dateTime={post.date}
                    className="text-sm text-gray-400"
                  >
                    {formatDate(post.date)}
                  </time>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            View all articles
          </Link>
        </div>
      </div>
    </section>
  );
}
