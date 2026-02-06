export function Hero() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white pt-6 pb-8 px-5">
      {/* Badge */}
      <div className="text-center mb-4">
        <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wide uppercase bg-black text-white">
          Free 15-Min Intake Leak Audit
        </span>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-[clamp(32px,6vw,48px)] font-bold text-black leading-tight mb-4">
          You're Paying for Leads. How Many Are You Actually Losing?
        </h1>

        {/* Subheadline */}
        <p className="text-md text-gray-600 mb-4 leading-relaxed">
          Missed calls. Slow follow-up. No-shows. If any of these sound familiar, you're leaving signed cases on the table.
        </p>

        {/* CTA */}
        <div className="mb-6">
          <a
            href="#intake-audit"
            className="inline-block px-8 py-3 bg-blue-950 rounded-sm text-white font-semibold hover:bg-blue-900 transition-colors"
          >
            Get Your Free Audit
          </a>
        </div>

        {/* What You Leave With - Bullet Separated */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-black font-medium">
          <span>See Where You're Losing Cases</span>
          <span className="text-gray-400">&bull;</span>
          <span>Get Your Revenue Recovery Estimate</span>
          <span className="text-gray-400">&bull;</span>
          <span>Walk Away With a Fix Plan for This Week</span>
        </div>
      </div>
    </section>
  )
}
