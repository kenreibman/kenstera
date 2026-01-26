'use client'

import { useState, useEffect, useCallback } from 'react'
import Script from 'next/script'
import {
  QualifierForm,
  CalendarEmbed,
  NotAFit,
  StickyNav,
  FormData,
} from './components'
import LeftSidebar from './components/LeftSidebar'

type Step = 'form' | 'calendar' | 'not-fit'

const STEP_STORAGE_KEY = 'intake-audit-step'
const DATA_STORAGE_KEY = 'intake-audit-data'

export default function IntakeAuditPage() {
  const [step, setStep] = useState<Step>('form')
  const [formData, setFormData] = useState<FormData | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Restore state from localStorage on mount
  useEffect(() => {
    const savedStep = localStorage.getItem(STEP_STORAGE_KEY) as Step | null
    const savedData = localStorage.getItem(DATA_STORAGE_KEY)

    if (savedStep && savedData) {
      try {
        const parsedData = JSON.parse(savedData) as FormData
        setFormData(parsedData)
        setStep(savedStep)
      } catch {
        // Invalid data, start fresh
        localStorage.removeItem(STEP_STORAGE_KEY)
        localStorage.removeItem(DATA_STORAGE_KEY)
      }
    }
    setIsInitialized(true)
  }, [])

  // Save step to localStorage when it changes
  useEffect(() => {
    if (isInitialized && step !== 'form') {
      localStorage.setItem(STEP_STORAGE_KEY, step)
    }
  }, [step, isInitialized])

  // Save form data to localStorage when it changes
  useEffect(() => {
    if (isInitialized && formData) {
      localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(formData))
    }
  }, [formData, isInitialized])

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (step !== 'form') {
        setStep('form')
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [step])

  // Push history state when moving to step 2
  const pushHistoryState = useCallback(() => {
    window.history.pushState({ step: 'step2' }, '')
  }, [])

  // Capture lead data to API
  const captureLeadData = async (data: FormData, isQualified: boolean) => {
    try {
      await fetch('/api/intake-audit/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          isQualified,
          capturedAt: new Date().toISOString(),
        }),
      })
    } catch (error) {
      // Silent fail - don't block user flow
      console.error('Failed to capture lead:', error)
    }
  }

  const handleFormSubmit = async (data: FormData, isQualified: boolean) => {
    setFormData(data)

    // Capture lead data (fire and forget)
    captureLeadData(data, isQualified)

    // Push browser history so back button works
    pushHistoryState()

    if (isQualified) {
      setStep('calendar')
    } else {
      setStep('not-fit')
    }
  }

  const handleBack = () => {
    setStep('form')
    // Clear step storage but keep form data
    localStorage.removeItem(STEP_STORAGE_KEY)
  }

  // Clear all storage when flow is complete (calendar booking)
  const handleComplete = () => {
    localStorage.removeItem(STEP_STORAGE_KEY)
    localStorage.removeItem(DATA_STORAGE_KEY)
    localStorage.removeItem('intake-audit-form') // QualifierForm's storage
  }

  return (
    <>
      <Script
        id="meta-pixel-pageview"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `fbq('track', 'PageView');`,
        }}
      />

      <StickyNav />

      <main className="min-h-screen bg-white flex flex-col">
        {/* Top section - dark section with value props */}
        <div>
          <LeftSidebar />
        </div>

        {/* Bottom section - form section */}
        <div className="flex items-start justify-center">
          <div className="w-full max-w-4xl px-8 py-12">
            {step === 'form' && (
              <QualifierForm onSubmit={handleFormSubmit} initialData={formData} />
            )}

            {step === 'calendar' && formData && (
              <CalendarEmbed
                formData={formData}
                onBack={handleBack}
                onComplete={handleComplete}
              />
            )}

            {step === 'not-fit' && formData && (
              <NotAFit formData={formData} onBack={handleBack} />
            )}
          </div>
        </div>
      </main>
    </>
  )
}
