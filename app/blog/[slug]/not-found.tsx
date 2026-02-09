import Link from "next/link";

export default function BlogNotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Post not found
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
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
