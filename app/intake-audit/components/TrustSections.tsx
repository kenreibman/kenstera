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
    <div className="border-b border-gray-200 last:border-b-0">
      <button
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
    <div className="w-full max-w-4xl mx-auto px-8 pb-16 space-y-16">
      {/* How the audit works */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          How the audit works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100"
            >
              <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold mb-4">
                {step.number}
              </div>
              <h3 className="text-[15px] font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Who this is for / not for */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          Is this for you?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Good fit */}
          <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
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
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-[15px] font-semibold text-gray-700 mb-4">
              Not a fit (yet)
            </h3>
            <ul className="space-y-3">
              {notFit.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          Common questions
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 px-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>
    </div>
  )
}
