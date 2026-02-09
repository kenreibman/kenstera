'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function IntakeSetup() {
  const [activeIndex, setActiveIndex] = useState(0)

  const features = [
    {
      title: "Quick setup, zero hassle",
      description: "Connect your phone line and calendar, and your AI intake specialist is live in minutes. No complex integrations or IT support required."
    },
    {
      title: "Affordable growth",
      description: "Pay a fraction of what you'd spend on additional intake staff. Scale your capacity without scaling your overhead."
    },
    {
      title: "Proven ROI",
      description: "Firms typically see 3-5x return within the first month from recovered leads that would have otherwise been lost to missed calls."
    }
  ]

  return (
    <section className="relative py-20 md:py-28">
      {/* Dotted line separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#e5e7eb_4px,#e5e7eb_8px)]" />

      <div className="w-full max-w-7xl mx-auto px-5">
        {/* Label */}
        <p className="text-sm font-medium text-gray-900 mb-16">
          Immediate impact for your firm
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Headline + Accordion */}
          <div>
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] tracking-tight text-gray-900 mb-12">
              Easy to launch, pays for itself fast
            </h2>

            {/* Accordion */}
            <div className="space-y-0">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="border-t border-gray-200 first:border-t-0"
                >
                  <button
                    type="button"
                    aria-expanded={activeIndex === index}
                    onClick={() => setActiveIndex(index)}
                    className="w-full text-left py-5 group"
                  >
                    <h3
                      className={`text-lg font-semibold transition-colors ${
                        activeIndex === index ? 'text-gray-900' : 'text-gray-400'
                      } group-hover:text-gray-900`}
                    >
                      {feature.title}
                    </h3>
                  </button>
                  <AnimatePresence initial={false}>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="text-[15px] leading-relaxed text-gray-600 pb-6 pr-8">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Metrics dashboard */}
          <div className="relative flex justify-center">
            {/* Gradient background */}
            <div className="relative rounded-3xl overflow-hidden w-full max-w-[480px]">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-300 via-sky-200 to-orange-200" />

              {/* Abstract shapes */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-sky-400/40 to-transparent rounded-full blur-2xl" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-orange-300/40 to-transparent rounded-full blur-2xl" />

              <div className="relative p-6 md:p-8 space-y-4">
                {/* Case Conversion Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">Case Conversion</span>
                    <span className="text-emerald-500 text-sm font-semibold">+285% with AI</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">78%</span>
                      <span className="text-sm text-gray-400">rate</span>
                    </div>
                    {/* Sparkline */}
                    <svg className="w-24 h-10" viewBox="0 0 96 40">
                      <path
                        d="M0,35 L12,32 L24,28 L36,30 L48,22 L60,18 L72,12 L84,8 L96,5"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx="96" cy="5" r="3" fill="#10b981" />
                    </svg>
                  </div>
                </div>

                {/* Intake Metrics Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-lg">
                  <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">Intake Metrics</span>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">After Hours Calls</span>
                      <span className="text-emerald-500 font-semibold">+127%</span>
                    </div>

                    {/* Bar chart */}
                    <div className="flex items-end gap-1.5 h-12 pt-2">
                      {[35, 42, 38, 55, 48, 62, 58, 72, 68, 85, 78, 92].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-sm transition-all"
                          style={{
                            height: `${height}%`,
                            backgroundColor: i < 6 ? '#d1d5db' : '#10b981'
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>Before</span>
                      <span>With AI</span>
                    </div>
                  </div>
                </div>

                {/* Bookings Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-lg">
                  <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">Consultations</span>

                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-emerald-500 text-xl font-bold">+340%</div>
                      <div className="text-[11px] text-gray-400">Booked</div>
                    </div>
                    <div>
                      <div className="text-emerald-500 text-xl font-bold">-82%</div>
                      <div className="text-[11px] text-gray-400">No-shows</div>
                    </div>
                    <div>
                      <div className="text-emerald-500 text-xl font-bold">+$47K</div>
                      <div className="text-[11px] text-gray-400">Monthly</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
