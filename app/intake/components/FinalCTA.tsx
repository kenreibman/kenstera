'use client'

import { Check } from 'lucide-react'

// PLACEHOLDER: Replace with your actual booking URL
const CTA_URL = '/contact-sales'

export default function FinalCTA() {
  return (
    <section className="relative py-20">
      <div className="w-full max-w-7xl mx-auto px-5">
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center">
          <div className="max-w-[560px] mx-auto">
            <h2 className="text-[clamp(28px,5vw,40px)] font-bold leading-[1.15] mb-5 text-gray-900">
              Stop Losing Cases Tonight
            </h2>
            <p className="text-[17px] leading-relaxed text-gray-500 mb-8">
              Every hour you wait, leads are calling your competitors. Book a 15-minute call to see exactly how this works for PI firms—no pitch deck, no pressure.
            </p>

            <div className="bg-white border border-gray-200 rounded-[10px] p-6 mb-8 text-left">
              <p className="text-sm font-semibold text-gray-900 mb-4">On the call, we&apos;ll:</p>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-3 text-[15px] text-gray-500">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Review your current intake process
                </li>
                <li className="flex items-center gap-3 text-[15px] text-gray-500">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Show you a live demo with PI-specific scenarios
                </li>
                <li className="flex items-center gap-3 text-[15px] text-gray-500">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Give you an honest assessment of fit
                </li>
              </ul>
            </div>

            <div className="flex justify-center mb-4">
              <a
                href={CTA_URL}
                className="inline-flex items-center justify-center px-9 py-4 text-base font-semibold text-white bg-gray-900 rounded-lg no-underline transition-all hover:bg-sky-700"
              >
                Schedule a Call
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="ml-1">
                  <path d="M6 10H14M14 10L10 6M14 10L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            <p className="text-sm text-gray-500">
              15 minutes. No commitment. No pitch deck.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
