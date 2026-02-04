'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
  }),
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

function ProgressIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: totalSteps }, (_, i) => (
        <motion.div
          key={i}
          className={`h-1 w-12 rounded-full ${
            i < currentStep ? 'bg-blue-950' : 'bg-gray-200'
          }`}
          initial={false}
          animate={{
            backgroundColor: i < currentStep ? '#172554' : '#e5e7eb',
            scale: i === currentStep - 1 ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  )
}

export function IntakeWizard() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [leadId, setLeadId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    website: '',
    role: '',
    inboundLeads: '',
  })

  const handleLeadSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, inboundLeads: value }))
    setDirection(1)
    setStep(2)
  }

  const handleContactSubmit = (data: Partial<FormData>) => {
    const updatedFormData = { ...formData, ...data }
    setFormData(updatedFormData)

    // Navigate IMMEDIATELY for responsive UX
    setDirection(1)
    setStep(3)

    // Capture lead data in background (fire and forget)
    fetch('/api/pi-intake-audit/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFormData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success && result.leadId) {
          setLeadId(result.leadId)
        }
      })
      .catch((error) => console.error('Failed to capture lead:', error))
  }

  const handleBack = () => {
    setDirection(-1)
    setStep((prev) => Math.max(1, prev - 1))
  }

  // Single unified return - CalendarEmbed is ALWAYS mounted, hidden until step 3
  return (
    <>
      {/* SINGLE Cal.com embed - always mounted from page load, hidden until step 3 */}
      {/* This ensures the iframe loads immediately and persists across all step transitions */}
      <div className={step === 3 ? 'fixed inset-0 z-50 bg-white overflow-y-auto' : ''}>
        <div className={step === 3 ? 'min-h-full flex items-center justify-center py-8 px-5' : ''}>
          <div className={step === 3 ? 'max-w-md w-full' : ''}>
            <CalendarEmbed formData={formData} leadId={leadId} onBack={handleBack} isVisible={step === 3} />
          </div>
        </div>
      </div>

      {/* Step 1: Inline section */}
      {step === 1 && (
        <section className="bg-white py-8 px-5">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <motion.div
              className="text-center mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-sm font-medium text-blue-950 mb-1">
                See if you qualify - takes 30 seconds
              </h2>
              <p className="text-xs text-gray-500">
                🔒 No commitment • No pitch deck
              </p>
            </motion.div>

            {/* Question */}
            <motion.h3
              className="text-2xl font-bold text-gray-900 text-center mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              How many leads do you get per month?
            </motion.h3>

            {/* Options */}
            <div className="flex flex-col gap-2 mb-6">
              {leadOptions.map((option, index) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleLeadSelect(option.value)}
                  className="w-full px-6 py-4 text-left font-medium rounded-xl bg-blue-950 text-white hover:bg-blue-900"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>

            {/* Progress */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <ProgressIndicator currentStep={1} totalSteps={3} />
            </motion.div>
          </div>
        </section>
      )}

      {/* Step 2: Fullscreen overlay for contact form */}
      {step === 2 && (
        <motion.div
          className="fixed inset-0 z-50 bg-white overflow-y-auto"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <div className="min-h-full flex items-center justify-center py-8 px-5">
            <div className="max-w-md w-full">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key="contact-form"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    duration: 0.3
                  }}
                >
                  <ContactForm
                    initialData={formData}
                    onSubmit={handleContactSubmit}
                    onBack={handleBack}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}
