import { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/case-studies";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Case Studies | Kenstera",
  description:
    "See how law firms use Kenstera's AI intake to capture more leads, reduce missed calls, and sign more cases — with real results and real numbers.",
  openGraph: {
    title: "Case Studies | Kenstera",
    description:
      "See how law firms use Kenstera's AI intake to capture more leads, reduce missed calls, and sign more cases.",
    type: "website",
  },
};

const testimonials = [
  {
    quote:
      "Kenstera cut our missed-call rate by 83% in the first month. Every after-hours lead now gets a live conversation instead of a voicemail box. Our signed-case volume is up and our front desk finally has breathing room.",
    name: "David W.",
    title: "Managing Partner",
  },
  {
    quote:
      "We were losing leads on nights and weekends, the busiest time for accident calls. Since switching to Kenstera, we receive qualified bookings while we sleep. Our cost-per-signed-case dropped by 40%.",
    name: "Maria T.",
    title: "Director of Operations",
  },
  {
    quote:
      "The intake system handles bilingual calls seamlessly and routes high-value cases to the right attorney immediately. We stopped paying for a call center and got better results. That never happens.",
    name: "Lily N.",
    title: "Founding Attorney",
  },
];

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();

  return (
    <main className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 text-center">
          <p className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            Case Studies
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-5">
            Trusted by firms like yours
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Real results from real firms. See how Kenstera&apos;s AI intake
            agents help law firms capture more leads, reduce costs, and sign
            more cases.
          </p>
        </div>
      </section>

      {/* Studies Grid */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        {studies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No case studies yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-x-8 gap-y-12 sm:gap-x-10 sm:gap-y-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {studies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        )}
      </section>

      {/* Testimonials Quotes Section */}
      <section className="border-t border-border bg-neutral-50 dark:bg-neutral-900/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-sm font-bold tracking-wide uppercase text-foreground text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-border bg-background p-8 flex flex-col justify-between"
              >
                <blockquote className="text-sm leading-relaxed text-foreground/90 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <Testimonials />

      <FinalCTA />
    </main>
  );
}
