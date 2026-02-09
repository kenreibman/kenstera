'use client'

import { useState } from 'react'
import { ChevronDown, Check, X } from 'lucide-react'

const steps = [
  {
    number: '1',
    title: 'Fill out the form',
    description: 'Answer 4 quick questions so we know your firm and lead volume.',
  },
  {
    number: '2',
    title: 'Pick a time',
    description: 'If you qualify, you\'ll immediately see our calendar to book a 15-minute slot.',
  },
  {
    number: '3',
    title: 'Get your fix map',
    description: 'We\'ll screen-share, walk through your intake, and leave you with a specific action plan.',
  },
]

const goodFit = [
  'PI auto accident firms',
  '20+ inbound leads per month',
  'Running paid ads or SEO',
  'Owners, partners, or marketing leads',
]

const notFit = [
  'Firms with fewer than 20 leads/month',
  'Practice areas outside PI auto',
  'Looking for a generic demo or sales pitch',
]

const faqs = [
  {
    question: 'Do I need to share PHI or client data?',
    answer: 'No. We look at your intake process and systems, not individual case data. No PHI needed.',
  },
  {
    question: 'How long does the audit take?',
    answer: '15 minutes. We keep it tight and focused on finding your biggest leak.',
  },
  {
    question: 'What do I need to prepare?',
    answer: 'Nothing. Just show up. We\'ll pull up your website and walk through your current flow together.',
  },
  {
    question: 'What happens after the audit?',
    answer: 'You\'ll have a clear picture of where you\'re losing cases and a 7-day fix plan. If we can help, we\'ll explain how. If not, you still leave with actionable insights.',
  },
  {
    question: 'Is this a sales call?',
    answer: 'No pitch deck, no pressure. We\'ll tell you honestly whether automation makes sense for your firm right now.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-white/40 last:border-b-0">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="text-[15px] font-medium text-gray-900">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function TrustSections() {
  return (
    <div className="w-full relative z-10">
      {/* What this is / isn't - first section */}
      <section className="py-16 border-t border-white/30">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            What this is / isn&apos;t
          </h2>
          <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-8 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* What it is */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-[15px] text-gray-700">
                  A 15-minute diagnostic + Fix Map you can use immediately
                </p>
              </div>
              {/* What it isn't */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-200/50 flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-[15px] text-gray-500">
                  Not a software demo
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-200/50 flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-[15px] text-gray-500">
                  Not a &quot;tell me about your firm&quot; discovery call
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-200/50 flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-[15px] text-gray-500">
                  No pitch deck, no pressure
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How the audit works */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            How the audit works
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-white/50 backdrop-blur-xl rounded-2xl p-6 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:bg-white/70 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-sm font-semibold mb-4 shadow-lg shadow-blue-500/20">
                  {step.number}
                </div>
                <h3 className="text-[15px] font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who this is for / not for */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Is this for you?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Good fit */}
            <div className="bg-gradient-to-br from-emerald-50/80 to-green-50/60 backdrop-blur-xl rounded-2xl p-6 border border-emerald-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
              <h3 className="text-[15px] font-semibold text-emerald-900 mb-4">
                Good fit
              </h3>
              <ul className="space-y-3">
                {goodFit.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-emerald-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not a fit */}
            <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
              <h3 className="text-[15px] font-semibold text-gray-600 mb-4">
                Not a fit (yet)
              </h3>
              <ul className="space-y-3">
                {notFit.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-500">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Common questions
          </h2>
          <div className="bg-white/50 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] px-6">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* If you want help implementing */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-8 text-center">
          <div className="bg-gradient-to-br from-blue-50/60 to-purple-50/60 backdrop-blur-xl rounded-2xl p-8 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              If you want help implementing
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              If the Fix Map makes sense and you want it installed for you, we can discuss a short pilot after the audit. If not, you&apos;ll still leave with a plan you can execute yourself.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
