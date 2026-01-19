'use client'

import { Check } from 'lucide-react'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 bg-gray-50">
      <div className="w-full max-w-[1120px] mx-auto px-5">
        <p className="text-[13px] font-semibold tracking-wide uppercase text-red-600 mb-3">
          How It Works
        </p>
        <h2 className="text-[clamp(28px,5vw,42px)] font-bold leading-[1.15] mb-5 text-gray-900">
          From Lead to Booked Consultation in Under 60 Seconds
        </h2>
        <p className="text-lg text-gray-500 max-w-[600px] leading-relaxed mb-14">
          Our system handles every step of intake—instantly, consistently, and around the clock.
        </p>

        <div className="flex flex-col max-w-[680px]">
          <div className="flex gap-6 p-7 bg-white border border-gray-200 rounded-xl">
            <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-gray-900 text-white font-bold text-base rounded-[10px]">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2.5">Instant Engagement</h3>
              <p className="text-[15px] leading-relaxed text-gray-500 mb-3.5">
                The moment a lead calls, submits a form, or sends a message—day or night—our system responds immediately. No hold music. No voicemail. No delay.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Voice, text, web form, and live chat—all covered</span>
              </div>
            </div>
          </div>

          <div className="w-0.5 h-7 bg-gray-200 ml-12" />

          <div className="flex gap-6 p-7 bg-white border border-gray-200 rounded-xl">
            <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-gray-900 text-white font-bold text-base rounded-[10px]">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2.5">Smart Qualification</h3>
              <p className="text-[15px] leading-relaxed text-gray-500 mb-3.5">
                Our system asks the right questions to qualify each case: accident type, injury severity, timeline, liability indicators. It filters out non-cases so your team only talks to real opportunities.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Custom criteria based on your firm&apos;s case preferences</span>
              </div>
            </div>
          </div>

          <div className="w-0.5 h-7 bg-gray-200 ml-12" />

          <div className="flex gap-6 p-7 bg-white border border-gray-200 rounded-xl">
            <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-gray-900 text-white font-bold text-base rounded-[10px]">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2.5">Intelligent Routing</h3>
              <p className="text-[15px] leading-relaxed text-gray-500 mb-3.5">
                Qualified cases get routed based on your rules: high-value cases to senior attorneys, specific case types to specialists, overflow to your answering service. You define the logic.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Integrates with your CRM, calendar, and phone system</span>
              </div>
            </div>
          </div>

          <div className="w-0.5 h-7 bg-gray-200 ml-12" />

          <div className="flex gap-6 p-7 bg-white border border-gray-200 rounded-xl">
            <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-red-600 text-white font-bold text-base rounded-[10px]">
              4
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2.5">Consultation Booked</h3>
              <p className="text-[15px] leading-relaxed text-gray-500 mb-3.5">
                The lead books a consultation directly into your calendar—before they have a chance to call another firm. You wake up to signed cases on your schedule.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Automated reminders reduce no-shows by 40%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
