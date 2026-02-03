'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { getCalApi } from '@calcom/embed-react'
import { ContactForm } from './ContactForm'
import { CalendarEmbed } from './CalendarEmbed'

export interface FormData {
  fullName: string
  email: string
  website: string
  role: string
  inboundLeads: string
}

const leadOptions = [
  { value: '0-50', label: '0–50 Leads' },
  { value: '50-150', label: '50–150 Leads' },
  { value: '150-300', label: '150–300 Leads' },
  { value: '300+', label: '300+ Leads' },
]

function ProgressIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`h-1 w-12 rounded-full transition-colors ${
            i < currentStep ? 'bg-blue-950' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

export function IntakeWizard() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    website: '',
    role: '',
    inboundLeads: '',
  })

  // Pre-fetch Cal.com embed on page load
  useEffect(() => {
    getCalApi({ namespace: 'pi-intake-audit' })
  }, [])

  const handleLeadSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, inboundLeads: value }))
    setStep(2)
  }

  const handleContactSubmit = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setStep(3)
  }

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1))
  }

  // Step 1 renders inline; steps 2+ render as fullscreen overlay
  if (step === 1) {
    return (
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
          <div className="flex flex-col gap-2 mb-6">
            {leadOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleLeadSelect(option.value)}
                className="w-full px-6 py-4 text-left font-medium rounded-xl transition-all bg-blue-950 text-white hover:bg-blue-900"
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Progress */}
          <div className="flex justify-center">
            <ProgressIndicator currentStep={1} totalSteps={3} />
          </div>
        </div>
      </section>
    )
  }

  // Fullscreen focus mode for steps 2+
  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="min-h-full flex items-center justify-center py-8 px-5">
        <div className="max-w-md w-full">
          {/* Step 2: Contact Form */}
          {step === 2 && (
            <ContactForm
              initialData={formData}
              onSubmit={handleContactSubmit}
              onBack={handleBack}
            />
          )}

          {/* Step 3: Calendar */}
          {step === 3 && (
            <CalendarEmbed
              formData={formData}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  )
}
