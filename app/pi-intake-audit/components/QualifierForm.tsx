'use client'

import { useState } from 'react'
import { ContactForm } from './ContactForm'

const leadOptions = [
  { value: '0-50', label: '0–50 Leads' },
  { value: '50-150', label: '50–150 Leads' },
  { value: '150-300', label: '150–300 Leads' },
  { value: '300+', label: '300+ Leads' },
]

export function QualifierForm() {
  const [selectedLeads, setSelectedLeads] = useState<string | null>(null)

  return (
    <>
      <section className="bg-white py-8 px-5">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-sm font-medium text-blue-950 mb-1">
              See if you qualify - takes 30 seconds
            </h2>
            <p className="text-xs text-gray-500">
              🔒 No commitment • No pitch deck
            </p>
          </div>

          {/* Question */}
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
            How many leads do you get per month?
          </h3>

          {/* Options */}
          <div className="flex flex-col gap-2">
            {leadOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedLeads(option.value)}
                className={`w-full px-6 py-4 text-left font-medium rounded-xl transition-all ${
                  selectedLeads === option.value
                    ? 'bg-blue-950 text-white ring-2 ring-blue-500'
                    : 'bg-blue-950 text-white hover:bg-blue-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Show ContactForm when a lead option is selected */}
      {selectedLeads && <ContactForm selectedLeads={selectedLeads} />}
    </>
  )
}
