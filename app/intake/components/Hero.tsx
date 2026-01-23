'use client'

import { Check } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/70 via-sky-50/50 to-white" />
      <div className="absolute inset-0 bg-gradient-to-r from-sky-100/30 via-transparent to-sky-100/30" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1120px] mx-auto px-5 pt-12 pb-16">
        {/* Headline and CTAs */}
        <div className="text-center max-w-3xl mx-auto">
          <h1
            className="text-3xl md:text-5xl font-semibold leading-[1.1] tracking-tight text-gray-900 mb-6"
          >
            Stop Losing Cases Because No One Answered the Phone
          </h1>

          <p
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            We install a 24/7 intake system that captures, qualifies, and books leads automatically—so cases don&apos;t leak after hours, on weekends, or when your team is busy.
          </p>

          {/* CTA with reassurance */}
          <div className="flex flex-col items-center gap-3 mb-12">
            <a
              href="/contact-sales"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
            >
              Schedule a Call
            </a>
            <p className="text-sm text-gray-500">
              15 minutes. No pitch deck. No commitment.
            </p>
          </div>

          {/* What happens on the call */}
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 max-w-md mx-auto text-left">
            <p className="text-sm font-semibold text-gray-900 mb-3">On the call, we&apos;ll:</p>
            <ul className="flex flex-col gap-2">
              <li className="flex items-start gap-2.5 text-[15px] text-gray-600">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                Show you how your intake would work after hours
              </li>
              <li className="flex items-start gap-2.5 text-[15px] text-gray-600">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                Identify where cases are currently leaking
              </li>
              <li className="flex items-start gap-2.5 text-[15px] text-gray-600">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                Give you an honest assessment of fit
              </li>
            </ul>
          </div>
        </div>

        {/* Qualifier block */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* This is for */}
            <div className="bg-emerald-50/50 border border-emerald-200/50 rounded-xl p-5">
              <p className="text-sm font-semibold text-emerald-800 mb-3">This is for firms that:</p>
              <ul className="flex flex-col gap-2 text-[14px] text-emerald-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  Get inbound calls or form leads
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  Want 24/7 coverage without hiring more staff
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  Care about case quality, not just volume
                </li>
              </ul>
            </div>

            {/* This is not */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <p className="text-sm font-semibold text-gray-700 mb-3">This is not:</p>
              <ul className="flex flex-col gap-2 text-[14px] text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  A call center or answering service
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  A replacement for your intake team
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400">•</span>
                  A chatbot that frustrates callers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
