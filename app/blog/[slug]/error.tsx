"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function BlogError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blog post error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Error loading post
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        There was an error loading this blog post. Please try again later.
      </p>
      <Link
        href="/blog"
        className="mt-8 inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
      >
        Browse all posts
      </Link>
    </main>
  );
}
