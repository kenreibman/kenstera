'use client'

import { useState, useEffect, useCallback } from 'react'
import Script from 'next/script'
import { getCalApi } from '@calcom/embed-react'
import {
  QualifierForm,
  CalendarEmbed,
  NotAFit,
  StickyNav,
  TrustSections,
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

  // Preload Cal.com embed while user fills the form
  useEffect(() => {
    getCalApi({ namespace: 'intake-audit' })
  }, [])

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

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40 relative overflow-hidden">
        {/* Animated gradient blobs for liquid glass effect */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Hero section - side by side layout */}
        <div className="min-h-screen flex flex-col lg:flex-row relative z-10">
          {/* Left side - Value props (hidden on mobile after form step) */}
          <div className={`lg:w-1/2 lg:sticky lg:top-0 lg:h-screen ${step !== 'form' ? 'hidden lg:block' : ''}`}>
            <LeftSidebar />
          </div>

          {/* Right side - Form */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="flex-1 flex items-start lg:items-center justify-center px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
              <div className="w-full">
                {step === 'form' && (
                  <QualifierForm onSubmit={handleFormSubmit} initialData={formData} />
                )}

                {/* Calendar - always mounted once formData exists, hidden when not active */}
                <div
                  className={step === 'calendar' ? '' : 'hidden'}
                  aria-hidden={step !== 'calendar'}
                >
                  {formData && (
                    <CalendarEmbed
                      formData={formData}
                      onBack={handleBack}
                      onComplete={handleComplete}
                    />
                  )}
                </div>

                {step === 'not-fit' && formData && (
                  <NotAFit formData={formData} onBack={handleBack} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trust sections - only show on form step */}
        {step === 'form' && <TrustSections />}
      </main>
    </>
  )
}
