'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReCaptcha } from 'next-recaptcha-v3'
import { AsYouType } from 'libphonenumber-js'
import Link from 'next/link'
import { Loader2, CheckCircle } from 'lucide-react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function DemoForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [name, setName] = useState('')
  const [phoneDisplay, setPhoneDisplay] = useState('')
  const [email, setEmail] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [globalError, setGlobalError] = useState<string | null>(null)
  const isSubmitting = useRef(false)
  const { executeRecaptcha } = useReCaptcha()

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const digits = raw.replace(/\D/g, '').slice(0, 10)
    const formatted = new AsYouType('US').input(digits)
    setPhoneDisplay(formatted)
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isSubmitting.current) return
    isSubmitting.current = true
    setFormState('submitting')
    setFieldErrors({})
    setGlobalError(null)

    // Client-side validation
    const errors: Record<string, string> = {}
    if (!name.trim()) {
      errors.name = 'Please enter your name.'
    }
    const digitCount = phoneDisplay.replace(/\D/g, '').length
    if (digitCount < 10) {
      errors.phone = 'Please enter a valid 10-digit US phone number.'
    }
    if (!email.includes('@')) {
      errors.email = 'Please enter a valid email address.'
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setFormState('error')
      isSubmitting.current = false
      return
    }

    // Get reCAPTCHA token at submit time (not on mount — tokens expire after 2 minutes)
    let recaptchaToken = ''
    try {
      recaptchaToken = await executeRecaptcha('demo_call')
    } catch {
      setGlobalError('Verification check failed. Please try again.')
      setFormState('error')
      isSubmitting.current = false
      return
    }

    try {
      const res = await fetch('/api/demo-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phoneDisplay, email: email.trim(), recaptchaToken }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 429) {
          setGlobalError('You have already requested a demo call recently. Please try again in 10 minutes.')
        } else if (res.status === 400) {
          setFieldErrors({ phone: data.error ?? 'Invalid phone number.' })
        } else {
          setGlobalError(data.error ?? 'Something went wrong. Please try again.')
        }
        setFormState('error')
        isSubmitting.current = false
        return
      }

      setFormState('success')
    } catch {
      setGlobalError('Network error. Please check your connection and try again.')
      setFormState('error')
      isSubmitting.current = false
    }
  }, [name, phoneDisplay, email, executeRecaptcha])

  return (
    <section style={{ backgroundColor: '#00122e' }} className="py-20 md:py-28">
      <div className="w-full max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left column: Headline + explainer */}
          <div>
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] tracking-tight text-white mb-5">
              Hear it yourself
            </h2>
            <p className="text-white/70 text-[17px] leading-relaxed max-w-md">
              Receive a live call from our agent and discover how it transforms your firm&apos;s intake.
            </p>
          </div>

          {/* Right column: Form or success state */}
          <div>
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <CheckCircle className="w-12 h-12 text-emerald-400 mb-4" aria-hidden="true" />
                  <p className="text-white text-2xl font-semibold mb-2">Your call is on its way</p>
                  <p className="text-white/60 mb-6">
                    You&apos;ll receive a call shortly from our AI intake specialist.
                  </p>
                  <Link
                    href="/contact-sales"
                    className="inline-block px-6 py-3 rounded-lg bg-white text-[#00122e] font-semibold hover:bg-white/90 transition"
                  >
                    Book a sales call
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <form
                    role="form"
                    aria-label="Demo call request"
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-4"
                  >
                    {/* Name field */}
                    <div>
                      <input
                        type="text"
                        aria-label="Your name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
                        autoComplete="name"
                      />
                      {fieldErrors.name && (
                        <p role="alert" className="text-red-400 text-sm mt-1">{fieldErrors.name}</p>
                      )}
                    </div>

                    {/* Phone field */}
                    <div>
                      <input
                        type="tel"
                        aria-label="Phone number"
                        placeholder="(555) 123-4567"
                        value={phoneDisplay}
                        onChange={handlePhoneChange}
                        className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
                        autoComplete="tel"
                      />
                      {fieldErrors.phone && (
                        <p role="alert" className="text-red-400 text-sm mt-1">{fieldErrors.phone}</p>
                      )}
                    </div>

                    {/* Email field */}
                    <div>
                      <input
                        type="email"
                        aria-label="Email address"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
                        autoComplete="email"
                      />
                      {fieldErrors.email && (
                        <p role="alert" className="text-red-400 text-sm mt-1">{fieldErrors.email}</p>
                      )}
                    </div>

                    {/* Global error (rate limit / server error) */}
                    {globalError && (
                      <p role="alert" className="text-red-400 text-sm">{globalError}</p>
                    )}

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      aria-busy={formState === 'submitting'}
                      className="w-full py-3 rounded-lg font-semibold text-lg transition bg-white text-[#00122e] hover:bg-white/90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {formState === 'submitting' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                          <span>Getting your call...</span>
                        </>
                      ) : (
                        'Get a call'
                      )}
                    </button>

                    {/* Consent */}
                    <p className="text-white/40 text-xs mt-3">
                      By submitting, you agree to receive an AI-powered phone call
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
