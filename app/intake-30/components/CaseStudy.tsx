'use client'

// PLACEHOLDER: Replace these with real case study data when available
const CASE_STUDY = {
  industry: 'Personal Injury Firm',
  challenge: 'Mid-size PI firm losing 30%+ of after-hours leads. Intake staff overwhelmed during peak hours. No system for qualifying leads before attorney review.',
  solution: 'Deployed 24/7 intake system with PI-specific qualification. Integrated with existing Clio setup. Custom routing rules for case types.',
  metrics: {
    metric1: '47%',
    metric2: '< 45s',
    metric3: '94%',
  },
  quote: 'We could\'ve never imaged the impact this would have on our intake process. The intelligent system not only captured more leads but ensured they were qualified before reaching our attorneys.',
  name: 'Sterling Law',
  title: 'Founder & Managing Partner',
}

export default function CaseStudy() {
  return (
    <section className="relative py-20 bg-gray-50">
      <div className="w-full max-w-[1120px] mx-auto px-5">
        <p className="text-[13px] font-semibold tracking-wide uppercase text-sky-600 mb-3">
          Results
        </p>
        <h2 className="text-[clamp(28px,5vw,42px)] font-bold leading-[1.15] mb-5 text-gray-900">
          What This Looks Like in Practice
        </h2>
        <p className="text-lg text-gray-500 max-w-[600px] leading-relaxed mb-12">
          Real outcomes from firms using intelligent intake systems.
        </p>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-6">
          <div className="flex items-center gap-4 px-7 py-5 border-b border-gray-200">
            <div className="px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-md uppercase tracking-wide">
              Case Study
            </div>
            <span className="text-[15px] text-gray-500">{CASE_STUDY.industry}</span>
          </div>

          <div className="p-7">
            <div className="mb-7">
              <h4 className="text-[13px] font-semibold text-sky-600 uppercase tracking-wide mb-2.5">
                The Challenge
              </h4>
              <p className="text-base leading-relaxed text-gray-500">
                {CASE_STUDY.challenge}
              </p>
            </div>

            <div className="mb-7">
              <h4 className="text-[13px] font-semibold text-sky-600 uppercase tracking-wide mb-2.5">
                The Solution
              </h4>
              <p className="text-base leading-relaxed text-gray-500">
                {CASE_STUDY.solution}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 p-6 bg-gray-50 rounded-[10px] mb-7">
              <div className="flex flex-col gap-1.5">
                <span className="text-[24px] font-bold text-sky-600 leading-none">{CASE_STUDY.metrics.metric1}</span>
                <span className="text-sm text-gray-500">Increase in qualified consultations</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[24px] font-bold text-sky-600 leading-none">{CASE_STUDY.metrics.metric2}</span>
                <span className="text-sm text-gray-500">Average response time</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[24px] font-bold text-sky-600 leading-none">{CASE_STUDY.metrics.metric3}</span>
                <span className="text-sm text-gray-500">After-hours leads captured</span>
              </div>
            </div>

            <blockquote className="p-6 bg-gray-50 rounded-[10px] border-l-4 border-sky-600">
              <p className="text-base leading-relaxed text-gray-900 italic mb-3">
                &ldquo;{CASE_STUDY.quote}&rdquo;
              </p>
              <cite className="text-sm text-gray-500 not-italic">
                — {CASE_STUDY.name}, {CASE_STUDY.title}
              </cite>
            </blockquote>
          </div>
        </div>

        <p className="text-[13px] text-gray-500 text-center">
          Results vary based on firm size, case volume, and implementation. Book a call to discuss realistic expectations for your firm.
        </p>
      </div>
    </section>
  )
}
