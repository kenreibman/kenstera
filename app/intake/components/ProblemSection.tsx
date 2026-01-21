'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, ArrowUp, Mic } from 'lucide-react'

// Mini chat mockup for this section
function MiniChatMockup() {
  return (
    <div className="relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 rounded-3xl" />

      <div className="relative p-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 space-y-3 max-w-[320px] ml-auto">
          {/* Status indicator */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Speaking...</span>
          </div>

          {/* User message */}
          <div className="flex justify-end">
            <div className="bg-gray-100 text-gray-900 px-3 py-2 rounded-xl rounded-br-sm text-sm max-w-[200px]">
              What are the next steps?
            </div>
          </div>

          {/* AI message */}
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex-shrink-0" />
            <div className="bg-gray-900 text-white px-3 py-2 rounded-xl rounded-bl-sm text-sm max-w-[220px]">
              Based on what you shared, I can connect you to one of our attorneys who will further assist you.
            </div>
          </div>

          {/* Action indicator */}
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2">
            <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" />
            <span>Qualifying case details...</span>
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-2">
            <span className="text-gray-400 text-sm flex-1">Or send a message...</span>
            <button className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <ArrowUp className="w-3 h-3" />
            </button>
            <button className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <Mic className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Accordion item
function AccordionItem({
  title,
  description,
  isOpen,
  onClick
}: {
  title: string
  description: string
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className={`text-lg font-semibold transition-colors ${isOpen ? 'text-gray-900' : 'text-gray-500'}`}>
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-[15px] leading-relaxed text-gray-500 pb-5">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProblemSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const problems = [
    {
      title: "After-hours leads go cold",
      description: "Accidents don't happen 9-to-5. A lead that calls at 9pm and gets voicemail will call your competitor at 9:01pm. Our system responds instantly, any time of day."
    },
    {
      title: "Slow response costs you cases",
      description: "The average PI firm takes 47 minutes to respond to a web lead. By then, the prospect has already talked to 2-3 other firms. We respond in under 60 seconds."
    },
    {
      title: "Intake staff can't scale",
      description: "Hiring 24/7 intake coverage costs $15-20k/month. And humans get tired, make mistakes, and can only handle one call at a time. Our system handles unlimited concurrent conversations."
    },
    {
      title: "Good cases slip through",
      description: "Without consistent qualification, your attorneys waste time on calls that go nowhere—while valuable cases get stuck in a queue. We qualify every lead the same way, every time."
    }
  ]

  return (
    <section className="relative py-24">
      {/* Dotted line separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#e5e7eb_4px,#e5e7eb_8px)]" />

      <div className="w-full max-w-[1120px] mx-auto px-5">
        {/* Category label */}
        <p className="text-sm font-medium text-sky-600 mb-8">
          Turn every lead into a consultation
        </p>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Headline + accordion */}
          <div>
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] tracking-tight text-gray-900 mb-12">
              Never miss a case because you didn&apos;t answer in time
            </h2>

            {/* Accordion */}
            <div>
              {problems.map((problem, index) => (
                <AccordionItem
                  key={index}
                  title={problem.title}
                  description={problem.description}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
              ))}
            </div>
          </div>

          {/* Right: Chat mockup */}
          <div className="lg:sticky lg:top-24">
            <MiniChatMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
