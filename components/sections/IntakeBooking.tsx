'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Phone } from 'lucide-react'

export function IntakeBooking() {
  const [activeIndex, setActiveIndex] = useState(0)

  const features = [
    {
      title: "Instant consultation booking",
      description: "Calls convert directly into confirmed appointments with seamless calendar and booking system integration. No manual follow-up required."
    },
    {
      title: "Higher show rates",
      description: "Automated confirmations and reminders via text and email reduce no-shows significantly, so your attorneys spend less time waiting."
    },
    {
      title: "Scale without extra headcount",
      description: "Handle 10x the call volume without hiring additional intake staff. Your AI works nights, weekends, and holidays."
    }
  ]

  return (
    <section className="relative py-20 md:py-28">
      {/* Dotted line separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#e5e7eb_4px,#e5e7eb_8px)]" />

      <div className="w-full max-w-7xl mx-auto px-5">
        {/* Label */}
        <p className="text-sm font-medium text-gray-900 mb-16">
          Appointments locked in on the first try
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Headline + Accordion */}
          <div>
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] tracking-tight text-gray-900 mb-12">
              No back-and-forth, no no-shows
            </h2>

            {/* Accordion */}
            <div className="space-y-0">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="border-t border-gray-200 first:border-t-0"
                >
                  <button
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

          {/* Right side - Chat mockup */}
          <div className="relative flex justify-center">
            {/* Gradient background card with wave pattern */}
            <div className="relative rounded-3xl overflow-hidden w-full max-w-[480px]">
              {/* Blue gradient background */}
              <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-500 to-blue-600" />

              {/* Wave pattern overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
                <defs>
                  <pattern id="wave-pattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                    <path d="M0 10 Q25 0 50 10 T100 10" fill="none" stroke="white" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#wave-pattern)" />
              </svg>

              <div className="relative p-8 md:p-12">
                {/* Chat container */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-5">
                  {/* Speaking indicator */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 via-purple-400 to-sky-400" />
                    <div className="bg-gray-200/80 rounded-full px-4 py-2">
                      <span className="text-sm text-gray-700">Speaking...</span>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="space-y-3">
                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl rounded-br-sm max-w-[240px]">
                        <p className="text-[14px] leading-relaxed">I'd like to schedule a consultation about my case.</p>
                      </div>
                    </div>

                    {/* AI message */}
                    <div className="flex justify-start">
                      <div className="bg-gray-200/80 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-sm max-w-[220px]">
                        <p className="text-[14px] leading-relaxed">I can help with that. Would you prefer a morning or afternoon appointment?</p>
                      </div>
                    </div>

                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl rounded-br-sm max-w-[240px]">
                        <p className="text-[14px] leading-relaxed">Tomorrow morning works for me.</p>
                      </div>
                    </div>

                    {/* AI message */}
                    <div className="flex justify-start">
                      <div className="bg-gray-200/80 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-sm max-w-[220px]">
                        <p className="text-[14px] leading-relaxed">Perfect. I've scheduled your free consultation for 10 AM tomorrow.</p>
                      </div>
                    </div>

                    {/* Status indicator */}
                    <div className="flex items-center gap-2 pt-1">
                      <div className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">K</span>
                      </div>
                      <span className="text-[13px] text-gray-500">Creating an event...</span>
                    </div>
                  </div>

                  {/* Input bar */}
                  <div className="flex items-center gap-2 mt-6 bg-gray-100 rounded-full px-4 py-3">
                    <span className="text-gray-400 text-[14px] flex-1">Or send a message...</span>
                    <button className="w-9 h-9 rounded-full bg-gray-300/80 flex items-center justify-center text-gray-600">
                      <Mic className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-gray-300/80 flex items-center justify-center text-gray-600">
                      <Phone className="w-4 h-4" />
                    </button>
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
