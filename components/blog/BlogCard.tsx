import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/blog";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPostMeta;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article>
        {/* Image */}
        <div className="aspect-[16/10] overflow-hidden rounded-xl bg-muted mb-4">
          {post.heroImage ? (
            <Image
              src={post.heroImage}
              alt={post.title}
              width={600}
              height={375}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900" />
          )}
        </div>

        {/* Tag */}
        {post.tags[0] && (
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full border border-foreground/80 text-foreground mb-3 uppercase tracking-wide">
            {post.tags[0]}
          </span>
        )}

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 leading-tight group-hover:opacity-70 transition-opacity">
          {post.title}
        </h2>

        {/* Date */}
        <time
          dateTime={post.date}
          className="text-sm text-muted-foreground"
        >
          {formatDate(post.date)}
        </time>
      </article>
    </Link>
  );
}
