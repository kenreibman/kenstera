'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Cal, { getCalApi } from '@calcom/embed-react'
import { Check, ArrowLeft } from 'lucide-react'
import { FormData } from './QualifierForm'

interface CalendarEmbedProps {
  formData: FormData
  onBack: () => void
  onComplete?: () => void
}

function ProgressIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="hidden md:flex items-center gap-1.5">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`h-1 w-16 rounded-full transition-colors ${
            i < currentStep ? 'bg-gray-900' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

export default function CalendarEmbed({ formData, onBack, onComplete }: CalendarEmbedProps) {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: 'intake-audit' })
      cal('on', {
        action: '__iframeReady',
        callback: () => {
          cal('ui', {
            hideEventTypeDetails: true,
            theme: 'light',
            layout: 'month_view',
          })
          // Scroll calendar into view after load
          document.getElementById('calendar-container')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        },
      })
      // Listen for booking confirmation
      cal('on', {
        action: 'bookingSuccessful',
        callback: () => {
          // Clear storage when booking is complete
          onComplete?.()
        },
      })
    })()
  }, [onComplete])

  const whatYouGet = [
    'A full "leak map" of where cases are slipping through',
    'Specific recommendations you can implement immediately',
    'Honest assessment of whether automation is right for your firm',
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="mb-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
          Almost there!
        </h2>
        <p className="text-gray-500 mb-3">
          Pick a time for your free 15-minute intake leak audit.
        </p>
        <p className="text-sm text-gray-400">
          No commitment. No pitch deck.
        </p>
      </div>

      {/* Calendar embed */}
      <div id="calendar-container" className="p-4 overflow-auto mb-6">
        <Cal
          namespace="intake-audit"
          calLink="kenstera/intake-15-minutes"
          config={{
            email: formData.email,
            notes: `Website: ${formData.website}\nRole: ${formData.role}\nLeads/mo: ${formData.inboundLeads}`,
          }}
          style={{ width: '100%', height: '100%', overflow: 'hidden' }}
        />
      </div>

      {/* What you'll get */}
      {/* <div className="bg-emerald-50/50 border border-emerald-200/50 rounded-xl p-5 mb-6">
        <p className="text-sm font-semibold text-emerald-800 mb-3">
          What you&apos;ll get on the call:
        </p>
        <ul className="flex flex-col gap-2">
          {whatYouGet.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm text-emerald-700"
            >
              <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div> */}

      {/* Back button and progress indicator row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <ProgressIndicator currentStep={2} totalSteps={3} />
      </div>
    </motion.div>
  )
}
