import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ============================================
   FLOWING WAVE SVG HEADER
============================================ */
function WaveHeader() {
  return (
    <div className="absolute top-0 left-0 right-0 h-[400px] overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 1440 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1800px] min-w-full"
        preserveAspectRatio="xMidYMin slice"
      >
        {/* Base gradient background */}
        <defs>
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#c4b5fd" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.6" />
            <stop offset="30%" stopColor="#a78bfa" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#67e8f9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="wave-gradient-3" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#fbcfe8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Wave layers */}
        <path
          d="M0 150 Q 200 80 400 150 T 800 120 T 1200 160 T 1440 100 L 1440 0 L 0 0 Z"
          fill="url(#wave-gradient-1)"
        />
        <path
          d="M0 180 Q 300 100 500 180 T 900 140 T 1200 190 T 1440 130 L 1440 0 L 0 0 Z"
          fill="url(#wave-gradient-2)"
          opacity="0.7"
        />
        <path
          d="M0 200 Q 250 140 450 200 T 850 160 T 1150 210 T 1440 150 L 1440 0 L 0 0 Z"
          fill="url(#wave-gradient-3)"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

/* ============================================
   HERO SECTION
============================================ */
function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
      <WaveHeader />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-medium tracking-[-0.02em] text-gray-900 leading-[1.1] mb-6">
            AI lead engagement built for your industry
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            From law firms to healthcare to real estate, Kenstera adapts to your
            unique workflow and helps you capture, qualify, and convert more leads.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/contact-sales"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Get started
            </Link>
            <Link
              href="#industries"
              className="inline-flex items-center justify-center px-5 py-2.5 text-gray-600 text-sm font-medium hover:text-gray-900 transition-colors"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   INDUSTRY CARDS SECTION
============================================ */
function IndustryCards() {
  const industries = [
    {
      name: "Law Firms",
      slug: "law",
      description: "Capture every lead, respond instantly, and never miss a potential client—even after hours.",
      gradient: "from-indigo-600 via-purple-600 to-indigo-500",
      features: ["24/7 lead capture", "Instant qualification", "Consultation booking"],
    },
    {
      name: "Healthcare",
      slug: "healthcare",
      description: "Streamline patient intake, reduce no-shows, and deliver a modern scheduling experience.",
      gradient: "from-cyan-500 via-blue-500 to-cyan-400",
      features: ["Patient scheduling", "Automated reminders", "HIPAA compliant"],
    },
    {
      name: "Real Estate",
      slug: "real-estate",
      description: "Respond to buyer and seller inquiries instantly and book more showings automatically.",
      gradient: "from-orange-500 via-rose-500 to-orange-400",
      features: ["Instant lead response", "Smart qualification", "Showing scheduling"],
    },
  ];

  return (
    <section id="industries" className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-5">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group relative rounded-2xl overflow-hidden"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient}`} />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

              {/* Content */}
              <div className="relative z-10 p-8 min-h-[320px] flex flex-col">
                <h2 className="text-2xl font-semibold text-white mb-3">
                  {industry.name}
                </h2>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  {industry.description}
                </p>

                {/* Feature list */}
                <ul className="space-y-2 mb-8">
                  {industry.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/90 text-sm">
                      <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-lg group-hover:bg-white/20 transition-colors">
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FEATURES SECTION
============================================ */
function Features() {
  const features = [
    {
      title: "Instant response",
      description: "Respond to leads in seconds, not hours. Our AI engages prospects the moment they reach out.",
    },
    {
      title: "Smart qualification",
      description: "Automatically qualify leads based on your criteria before routing them to your team.",
    },
    {
      title: "Automated booking",
      description: "Let qualified leads book appointments directly on your calendar—no back and forth.",
    },
    {
      title: "CRM integration",
      description: "Sync seamlessly with your existing tools. Leads and data flow automatically.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Platform features
          </p>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 mb-4">
            Everything you need to capture<br />and convert more leads
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div key={i}>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   ENTERPRISE SECTION
============================================ */
function Enterprise() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Enterprise
            </p>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 mb-6">
              Scale your lead engagement across locations
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Multi-location businesses trust Kenstera to maintain consistent,
              high-quality lead engagement across every office. Centralized
              management with local customization.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Centralized dashboard for all locations",
                "Location-specific routing and scheduling",
                "Enterprise-grade security and compliance",
                "Dedicated account management",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/contact-sales"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
            >
              Contact sales
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <p className="text-sm text-gray-400">Enterprise dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FINAL CTA SECTION
============================================ */
function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-900 mb-4">
            Ready to capture more leads?
          </h2>
          <p className="text-gray-500 mb-8">
            See how Kenstera can help your business respond faster,
            qualify smarter, and convert more.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/contact-sales"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Get started
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-5 py-2.5 text-gray-600 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              View pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   MAIN PAGE
============================================ */
export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <IndustryCards />
      <Features />
      <Enterprise />
      <FinalCTA />
    </main>
  );
}
