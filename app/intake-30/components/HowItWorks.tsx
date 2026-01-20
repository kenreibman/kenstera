'use client'

import { Play } from 'lucide-react'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 bg-gray-50">
      <div className="w-full max-w-[1120px] mx-auto px-5">
        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left: Headline + CTA */}
          <div>
            <p className="text-sm font-medium text-sky-600 mb-4">
              How it works
            </p>

            <h2 className="text-[clamp(36px,6vw,56px)] font-bold leading-[1.05] tracking-tight text-gray-900 mb-8">
              AI Intake<br />
              Answering<br />
              System
            </h2>

            {/* <a
              href="#demo"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-900 font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Play className="w-4 h-4 fill-current" />
              Watch demo
            </a> */}
          </div>

          {/* Right: Description + testimonial */}
          <div className="flex flex-col justify-center">
            <p className="text-xl md:text-2xl leading-relaxed text-gray-900 mb-10">
              Our system handles every step of intake—instantly, consistently, and around the clock. The moment a lead calls, submits a form, or sends a message, they get an immediate response. Smart qualification filters out non-cases. Qualified leads book directly into your calendar before they call another firm.
            </p>

            {/* Testimonial */}
            <div className="border-l-2 border-gray-300 pl-6">
              <p className="text-base leading-relaxed text-gray-600 mb-4">
                &ldquo;We went from losing 40% of after-hours leads to capturing nearly all of them. The system paid for itself in the first week with cases we would have missed.&rdquo;
              </p>
              <div>
                <p className="font-semibold text-gray-900">Crestview Law Group</p>
                <p className="text-sm text-gray-500">
                  Personal Injury Firm
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Steps grid below */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-5xl font-bold text-gray-200 mb-4">01</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Engagement</h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              The moment a lead reaches out—day or night—our system responds immediately. No hold music. No voicemail. No delay.
            </p>
          </div>

          <div>
            <div className="text-5xl font-bold text-gray-200 mb-4">02</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Qualification</h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              The system asks the right questions: accident type, injury severity, timeline. It filters out non-cases so your team only talks to real opportunities.
            </p>
          </div>

          <div>
            <div className="text-5xl font-bold text-gray-200 mb-4">03</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Intelligent Routing</h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              Qualified cases get routed based on your rules: high-value cases to senior attorneys, specific types to specialists. You define the logic.
            </p>
          </div>

          <div>
            <div className="text-5xl font-bold text-gray-200 mb-4">04</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Consultation Booked</h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              The lead books a consultation directly into your calendar—before they have a chance to call another firm. You wake up to cases on your schedule.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
