// Shared source of truth for the Latest Work cards and the /work/[slug]
// placeholder pages — keeps the route allowlist in lockstep with the homepage.
export const WORK = [
  {
    title: "Bloom Studio",
    slug: "bloom-studio",
    gradient: "from-sky-400 via-sky-300 to-rose-300",
  },
  {
    title: "Northwind Ops",
    slug: "northwind-ops",
    gradient: "from-sky-300 via-sky-200 to-orange-200",
  },
  {
    title: "Cadence",
    slug: "cadence",
    gradient: "from-slate-300 via-gray-100 to-slate-200",
  },
  {
    title: "Harvest & Co.",
    slug: "harvest-co",
    gradient: "from-indigo-300 via-purple-200 to-sky-200",
  },
] as const;

export function getWorkBySlug(slug: string) {
  return WORK.find((w) => w.slug === slug) ?? null;
}
