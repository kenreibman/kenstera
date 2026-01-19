'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

const faqs = [
  {
    question: 'How long does setup take?',
    answer: 'Most firms are live within 1-2 weeks. That includes configuring your intake scripts, integrating with your CRM and calendar, setting up routing rules, and testing. We handle the technical work—your team just needs to provide input on qualification criteria and preferences.'
  },
  {
    question: 'What CRM and practice management systems do you integrate with?',
    answer: 'We integrate with Clio, Litify, Filevine, Salesforce, HubSpot, and most other legal CRMs. For calendar booking, we work with Calendly, Acuity, Microsoft Bookings, and Google Calendar. If you use something else, we can usually build a custom integration.'
  },
  {
    question: 'Can we customize the intake questions and qualification criteria?',
    answer: 'Yes, completely. We work with you to build intake scripts specific to your case types—auto accidents, slip-and-fall, medical malpractice, etc. Qualification criteria, routing rules, and escalation triggers are all configured based on your firm\'s specific requirements.'
  },
  {
    question: 'What happens if a caller wants to speak to a real person?',
    answer: 'They can. You define when calls get transferred to live staff—whether that\'s on request, for specific case types, or based on qualification score. The system can also take a message and have your team call back within whatever timeframe you set.'
  },
  {
    question: 'How do you handle after-hours calls?',
    answer: 'The same way we handle daytime calls—instantly. The system doesn\'t sleep. After-hours leads get qualified and can book consultations for the next business day, or get routed to on-call staff if that\'s how you\'re set up.'
  },
  {
    question: 'What kind of reporting do we get?',
    answer: 'Full visibility. You get a dashboard showing call volume, response times, qualification rates, booking rates, and lead source performance. Every interaction is logged and searchable. Most firms review weekly metrics with us during the first few months.'
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative py-20 bg-gray-50">
      <div className="w-full max-w-[1120px] mx-auto px-5">
        <p className="text-[13px] font-semibold tracking-wide uppercase text-red-600 mb-3">
          FAQ
        </p>
        <h2 className="text-[clamp(28px,5vw,42px)] font-bold leading-[1.15] mb-5 text-gray-900">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-500 max-w-[600px] leading-relaxed mb-12">
          Quick answers to common questions. Still have questions? Book a call.
        </p>

        <div className="flex flex-col gap-3 max-w-[720px]">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-[10px] overflow-hidden">
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer bg-transparent border-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-base font-semibold text-gray-900 leading-snug">{faq.question}</span>
                <span
                  className={`shrink-0 flex items-center justify-center w-7 h-7 text-red-600 transition-transform duration-200 ${openIndex === index ? 'rotate-45' : ''}`}
                >
                  <Plus className="w-5 h-5" />
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-[15px] leading-relaxed text-gray-500 px-6 pb-6">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
