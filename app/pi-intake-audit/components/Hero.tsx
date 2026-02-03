export function Hero() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white pt-6 pb-8 px-5">
      {/* Company Name */}
      <div className="text-center mb-4">
        <span className="text-xl font-bold text-gray-900">
          Kenstera
        </span>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-[clamp(32px,6vw,48px)] font-bold text-blue-950 leading-tight mb-4">
          Free 15-min Intake Leak Audit
        </h1>

        {/* Subheadline */}
        <p className="text-md text-gray-600 mb-4 leading-relaxed">
          For Personal Injury auto accident firms paying for leads but losing cases to missed calls, slow follow-up, or no-shows.
        </p>

        {/* What You Leave With - Bullet Separated */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-[#1e3a5f] font-medium">
          <span>Intake Leak Analysis</span>
          <span className="text-gray-400">•</span>
          <span>Boosted Revenue Projection</span>
          <span className="text-gray-400">•</span>
          <span>7-Day Fix Plan</span>
        </div>
      </div>
    </section>
  )
}
