import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LandingActive from "@/components/landing/LandingActive";
import { WORK, getWorkBySlug } from "@/content/work";

// PLACEHOLDER detail page. Intentionally minimal — the real case-study page
// isn't built yet. It exists so the Latest Work cards link somewhere instead
// of 404ing. Flesh this out (or wire to a CMS) when ready.

// Only the four real project slugs render; everything else 404s. Without this
// the route returned a styled 200 for any URL — an unbounded soft-404 surface
// with attacker-chosen headings.
export const dynamicParams = false;

export function generateStaticParams() {
  return WORK.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) return { title: "Not Found" };

  return {
    title: project.title,
    // Thin placeholder content — keep out of the index until the real page ships.
    robots: { index: false, follow: true },
  };
}

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getWorkBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="landing-root min-h-svh flex flex-col items-center justify-center text-center px-6 bg-black">
      <LandingActive />
      <p className="font-serif italic text-white/60 text-base md:text-lg mb-4">
        Case Study
      </p>
      <h1 className="font-serif text-white text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6">
        {project.title}
      </h1>
      <p className="font-sans text-white/50 mb-10">Detailed case study coming soon.</p>
      <Link
        href="/"
        className="inline-block font-sans font-semibold uppercase tracking-widest text-sm text-black bg-white rounded-full px-8 py-4 hover:bg-white/80 transition-colors"
      >
        Back to home
      </Link>
    </main>
  );
}
