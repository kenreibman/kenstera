'use client'

import { useEffect, useCallback, useMemo, useRef } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { ArrowLeft } from 'lucide-react'
import { FormData } from './IntakeWizard'

interface CalendarEmbedProps {
  formData: FormData
  leadId?: string | null
  /** Resolves once the in-flight lead capture settles; null if capture failed. */
  waitForLeadId?: () => Promise<string | null>
  onBack: () => void
  onComplete?: () => void
  isVisible?: boolean
}

function ProgressIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`h-1 w-12 rounded-full transition-colors ${
            i < currentStep ? 'bg-black' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

export function CalendarEmbed({ formData, leadId, waitForLeadId, onBack, onComplete, isVisible = true }: CalendarEmbedProps) {
  const CAL_NAMESPACE = 'pi-intake-audit'
  const CAL_LINK = 'kenstera/intake-15-minutes'
  const latestLeadId = useRef<string | null | undefined>(leadId)
  const latestWaitForLeadId = useRef<CalendarEmbedProps['waitForLeadId']>(waitForLeadId)
  const latestOnComplete = useRef<CalendarEmbedProps['onComplete']>(onComplete)

  useEffect(() => {
    latestLeadId.current = leadId
  }, [leadId])

  useEffect(() => {
    latestWaitForLeadId.current = waitForLeadId
  }, [waitForLeadId])

  useEffect(() => {
    latestOnComplete.current = onComplete
  }, [onComplete])

  const markAsBooked = useCallback(async (id: string | null | undefined) => {
    // A fast booker can confirm before the capture response lands — wait for
    // the in-flight capture instead of silently leaving the lead 'pending'
    // (which would trigger the abandonment email despite the booking).
    if (!id && latestWaitForLeadId.current) {
      try {
        id = await latestWaitForLeadId.current()
      } catch {
        id = null
      }
    }
    if (!id) return

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const res = await fetch('/api/pi-intake-audit/booked', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ leadId: id }),
        })
        if (res.ok) return
      } catch {
        // Network error — fall through to retry
      }
      if (attempt < 3) await new Promise((r) => setTimeout(r, 1000 * attempt))
    }
    console.error('Failed to mark lead as booked after 3 attempts:', id)
  }, [])

  // Initial setup - configure UI and event listeners on mount
  useEffect(() => {
    let isActive = true
    ;(async function () {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE })
      if (!isActive) return
      cal('preload', { calLink: CAL_LINK })
      cal('on', {
        action: '__iframeReady',
        callback: () => {
          cal('ui', {
            hideEventTypeDetails: true,
            layout: 'month_view',
          })
        },
      })
      cal('on', {
        action: 'bookingSuccessful',
        callback: () => {
          markAsBooked(latestLeadId.current)
          latestOnComplete.current?.()
        },
      })
    })()
    return () => {
      isActive = false
    }
  }, [markAsBooked])

  // Memoize config to prevent unnecessary re-renders
  // Only include user data if we have it (when form is filled)
  const calConfig = useMemo<Record<string, string>>(() => {
    const config: Record<string, string> = {
      theme: 'light',
    }
    if (formData.fullName && formData.email) {
      config.name = formData.fullName
      config.email = formData.email
      config.notes = `Website: ${formData.website}\nRole: ${formData.role}\nLeads/mo: ${formData.inboundLeads}`
    }
    return config
  }, [formData.fullName, formData.email, formData.website, formData.role, formData.inboundLeads])

  // Generate a key based on whether we have user data
  // Empty key for preload, data-based key for prefilled version
  // When key changes, React remounts Cal with the new prefilled config
  // Single Cal component - always rendered, visibility controlled by CSS wrapper in parent
  return (
    // `inert` removes the off-screen Cal iframe from the tab order as well as
    // the accessibility tree — aria-hidden alone left it keyboard-focusable,
    // which both traps focus off-screen and violates the aria-hidden contract.
    <div
      className={isVisible ? '' : 'fixed -left-[9999px] opacity-0 pointer-events-none'}
      inert={!isVisible}
    >
      {/* Header - only shown when visible */}
      {isVisible && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
            Pick a Time
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Choose a time for your free intake audit call.
          </p>
        </div>
      )}

      {/* Calendar embed - always rendered for preloading */}
      <div className={isVisible ? 'overflow-auto mb-6 bg-gray-50 rounded-xl p-2 min-h-[400px]' : ''}>
        <Cal
          namespace={CAL_NAMESPACE}
          calLink={CAL_LINK}
          config={calConfig}
          style={{ width: '100%', height: '100%', overflow: 'hidden' }}
        />
      </div>

      {/* Back button and progress indicator row - only shown when visible */}
      {isVisible && (
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
      )}

      {/* Footer - only shown when visible */}
      {isVisible && (
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            No commitment required on the call.
          </p>
        </div>
      )}
    </div>
  )
}
