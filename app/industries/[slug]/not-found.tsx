import Link from "next/link";

export default function IndustryNotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Industry not found
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        The industry page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/industries"
        className="mt-8 inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
      >
        View all industries
      </Link>
    </main>
  );
}
