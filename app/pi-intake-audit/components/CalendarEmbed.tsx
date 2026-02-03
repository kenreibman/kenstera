'use client'

import { useEffect, useCallback } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { ArrowLeft } from 'lucide-react'
import { FormData } from './IntakeWizard'

interface CalendarEmbedProps {
  formData: FormData
  leadId?: string | null
  onBack: () => void
  onComplete?: () => void
}

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

export function CalendarEmbed({ formData, leadId, onBack, onComplete }: CalendarEmbedProps) {
  const markAsBooked = useCallback(async () => {
    if (!leadId) return

    try {
      await fetch('/api/pi-intake-audit/booked', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId }),
      })
    } catch (error) {
      console.error('Failed to mark lead as booked:', error)
    }
  }, [leadId])

  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: 'pi-intake-audit' })
      cal('on', {
        action: '__iframeReady',
        callback: () => {
          cal('ui', {
            hideEventTypeDetails: true,
            theme: 'light',
            layout: 'month_view',
          })
        },
      })
      cal('on', {
        action: 'bookingSuccessful',
        callback: () => {
          markAsBooked()
          onComplete?.()
        },
      })
    })()
  }, [onComplete, markAsBooked])

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
          Pick a Time
        </h2>
        <p className="text-sm text-gray-500 text-center">
          Choose a time for your free intake audit call.
        </p>
      </div>

      {/* Calendar embed */}
      <div className="overflow-auto mb-6 bg-gray-50 rounded-xl p-2 min-h-[400px]">
        <Cal
          key={`${formData.fullName}-${formData.email}`}
          namespace="pi-intake-audit"
          calLink="kenstera/intake-15-minutes"
          config={{
            name: formData.fullName,
            email: formData.email,
            notes: `Website: ${formData.website}\nRole: ${formData.role}\nLeads/mo: ${formData.inboundLeads}`,
          }}
          style={{ width: '100%', height: '100%', overflow: 'hidden' }}
        />
      </div>

      {/* Back button and progress indicator row */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="p-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <ProgressIndicator currentStep={3} totalSteps={3} />
      </div>

      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          No commitment required on the call.
        </p>
      </div>
    </>
  )
}
