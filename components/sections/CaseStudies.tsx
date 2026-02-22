'use client'

import Image from 'next/image'
import Link from 'next/link'


const caseStudies = [
  {
    bg: 'border border-[#1a3a5c]',
    bgStyle: { backgroundColor: '#00122e' },
    textColor: 'text-white',
    mutedColor: 'text-blue-300',
    borderColor: 'border-[#1a3a5c]',
    btnText: 'text-white',
    btnBorder: 'border-white/30 hover:border-white/60',
    image: '/images/case-studies-card-1.webp',
    quote:
      "Kenstera cut our missed-call rate by 83% in the first month. Every after-hours lead now gets a live conversation instead of a voicemail box. Our signed-case volume is up and our front desk finally has breathing room.",
    name: 'David W.',
    title: 'Managing Partner',
    slug: 'david-w-personal-injury',
    topValue: '80px',
  },
  {
    bg: 'border border-[#e5a56a]',
    bgStyle: { backgroundColor: '#ffbb7e' },
    textColor: 'text-gray-900',
    mutedColor: 'text-gray-700',
    borderColor: 'border-[#e5a56a]',
    btnText: 'text-gray-900',
    btnBorder: 'border-gray-900/30 hover:border-gray-900/60',
    image: '/images/case-studies-card-2.webp',
    quote:
      "We were losing leads on nights and weekends, the busiest time for accident calls. Since switching to Kenstera, we receive qualified bookings while we sleep. Our cost-per-signed-case dropped by 40%.",
    name: 'Maria T.',
    title: 'Director of Operations',
    slug: 'maria-t-operations',
    topValue: '80px',
  },
  {
    bg: 'bg-sky-950 border border-sky-800',
    bgStyle: undefined as React.CSSProperties | undefined,
    textColor: 'text-sky-50',
    mutedColor: 'text-sky-400',
    borderColor: 'border-sky-800',
    btnText: 'text-sky-50',
    btnBorder: 'border-sky-50/30 hover:border-sky-50/60',
    image: '/images/case-studies-card-3.webp',
    quote:
      "The intake system handles bilingual calls seamlessly and routes high-value cases to the right attorney immediately. We stopped paying for a call center and got better results. That never happens.",
    name: 'Lily N.',
    title: 'Founding Attorney',
    slug: 'lily-n-bilingual-intake',
    topValue: '80px',
  },
]

export function CaseStudies() {
  return (
    <section className="relative py-10 md:py-28">
      {/* Dotted line separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#e5e7eb_4px,#e5e7eb_8px)]" />

      <div className="w-full max-w-7xl mx-auto px-5">
        {/* Section label */}
        <p className="text-sm font-medium text-gray-900 mb-4">Case Studies</p>
        <h2 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] tracking-tight text-gray-900 mb-14">
          Trusted by firms like yours
        </h2>

        {/* Cards container — horizontal scroll on mobile, sticky stack on desktop */}
        <div className="flex overflow-x-auto gap-4 -mx-5 px-5 pb-4 lg:pb-0 lg:block lg:overflow-visible lg:mx-0 lg:px-0 scrollbar-hide">
          {caseStudies.map((study, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[85vw] lg:w-auto lg:mb-0 lg:sticky"
              style={{ top: study.topValue, zIndex: 10 + i }}
            >
              {/* Animated card — transform lives here, inside the sticky wrapper */}
              <div
                className={`${study.bg} rounded-2xl overflow-hidden lg:mb-6`}
                style={study.bgStyle}
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 lg:h-[440px]">
                  {/* Left: quote + attribution */}
                  <div className="lg:col-span-3 p-8 md:p-12 flex flex-col justify-between min-h-[340px]">
                    {/* Decorative quote mark */}
                    <div>
                      <span
                        className={`block text-7xl md:text-8xl leading-none font-serif ${study.textColor} select-none -mb-4`}
                      >
                        &ldquo;
                      </span>
                      <blockquote
                        className={`text-sm md:text-xl leading-relaxed font-medium ${study.textColor} mt-2`}
                      >
                        {study.quote}
                      </blockquote>
                    </div>

                    <div className="mt-8 flex flex-col gap-6">
                      {/* Read Case Study button */}
                      <div>
                        <Link
                          href={`/case-studies/${study.slug}`}
                          className={`inline-flex items-center px-5 py-2.5 rounded-full border ${study.btnBorder} ${study.btnText} text-sm font-medium transition-colors`}
                        >
                          Read Case Study
                        </Link>
                      </div>

                      {/* Attribution row */}
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 lg:hidden">
                          <Image
                            src={study.image}
                            alt={`Portrait of ${study.name}`}
                            fill
                            className="object-cover object-top"
                            sizes="40px"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={`text-sm font-semibold ${study.textColor}`}
                          >
                            {study.name}
                          </span>
                          <span className={`text-sm ${study.textColor}`}>
                            {study.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: person photo — desktop only */}
                  <div className="hidden lg:block lg:col-span-2 relative lg:min-h-0 p-4 md:p-6">
                    <div className="relative w-full h-full overflow-hidden rounded-xl">
                      <Image
                        src={study.image}
                        alt={`Portrait of ${study.name}`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
