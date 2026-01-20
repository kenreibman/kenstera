'use client'

import { Check } from 'lucide-react'

export default function Deliverables() {
  const features = [
    {
      title: "24/7 Voice Response",
      description: "Intelligent voice system that answers calls instantly, gathers case details, and handles conversations naturally—no robotic menus."
    },
    {
      title: "Multi-Channel Coverage",
      description: "Text messages, web forms, live chat—all funneled into one system. Every channel gets the same instant, qualified response."
    },
    {
      title: "PI-Specific Qualification",
      description: "Custom intake scripts for auto accidents, slip-and-fall, medical malpractice, and more. Captures the details your attorneys need."
    },
    {
      title: "Intelligent Routing",
      description: "High-value cases to senior partners, specific case types to specialists. Your rules, automatically enforced 24/7."
    },
    {
      title: "Automated Booking",
      description: "Qualified leads book directly into your calendar. Automated confirmations and reminders reduce no-shows significantly."
    },
    {
      title: "CRM Integration",
      description: "Syncs with Clio, Litify, Filevine, Salesforce, and more. New leads and case data flow directly into your existing systems."
    }
  ]

  const included = [
    "Setup & configuration",
    "Custom intake scripts",
    "Performance dashboard",
    "Ongoing optimization",
    "Dedicated support",
    "No long-term contract"
  ]

  return (
    <section className="relative py-24">
      {/* Dotted line separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#e5e7eb_4px,#e5e7eb_8px)]" />

      <div className="w-full max-w-[1120px] mx-auto px-5">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
          <div>
            <p className="text-sm font-medium text-sky-600 mb-4">
              What you get
            </p>
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] tracking-tight text-gray-900">
              A complete intake system, not just another tool
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-xl leading-relaxed text-gray-600">
              Everything you need to capture, qualify, and convert every lead—built specifically for Personal Injury firms.
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Also included */}
        {/* <div className="border-t border-gray-200 pt-10">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
            Also included
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {included.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-[15px] text-gray-900">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  )
}
