'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

    try {
      const res = await fetch('/api/demo-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phoneDisplay, email: email.trim() }),
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
  }, [name, phoneDisplay, email])

  return (
    <section style={{ backgroundColor: '#00122e' }} className="py-20 md:py-28">
      <div className="w-full max-w-7xl mx-auto px-5">

        {/* Top: Heading + Description */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <h2 className="text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-tight text-white">
            Try Our<br />Live Demo
          </h2>
          <p className="text-white/70 text-base md:text-[17px] leading-relaxed max-w-sm md:pb-2">
            Receive a live call from our agent and discover how it transforms your firm&apos;s intake.
          </p>
        </div>

        {/* Cards area */}
        <AnimatePresence mode="wait">
          {formState === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="bg-white rounded-2xl p-10 md:p-14 flex flex-col items-center justify-center text-center min-h-[340px]"
            >
              <CheckCircle className="w-14 h-14 text-emerald-500 mb-5" aria-hidden="true" />
              <p className="text-gray-900 text-2xl font-semibold mb-2">Your call is on its way</p>
              <p className="text-gray-500 mb-8">
                You&apos;ll receive a call shortly from our AI intake specialist.
              </p>
              <Link
                href="/contact-sales"
                className="inline-block px-6 py-3 rounded-full bg-[#00122e] text-white font-medium hover:bg-[#001a3f] transition"
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
              className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4"
            >
              {/* Left card: Animated orb (desktop only) */}
              <div className="hidden lg:flex bg-white rounded-2xl p-8 md:p-10 flex-col justify-between relative overflow-hidden min-h-[340px]">
                {/* Orb container */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Outer glow */}
                  <div
                    className="absolute w-[280px] h-[280px] rounded-full opacity-25 blur-3xl"
                    style={{
                      background: 'radial-gradient(circle, #7c6ef0, #06b6d4 50%, transparent 70%)',
                      animation: 'orbPulse 6s ease-in-out infinite',
                    }}
                  />
                  {/* Blob 1: Purple — spins clockwise */}
                  <div
                    className="absolute w-[140px] h-[140px] rounded-full blur-xl"
                    style={{
                      background: 'radial-gradient(circle, #a78bfa, #7c3aed 60%, transparent 80%)',
                      animation: 'orbSpin1 7s linear infinite',
                    }}
                  />
                  {/* Blob 2: Cyan — spins counter-clockwise */}
                  <div
                    className="absolute w-[120px] h-[120px] rounded-full blur-xl"
                    style={{
                      background: 'radial-gradient(circle, #67e8f9, #0891b2 60%, transparent 80%)',
                      animation: 'orbSpin2 9s linear infinite',
                    }}
                  />
                  {/* Blob 3: Rose — figure-eight drift */}
                  <div
                    className="absolute w-[110px] h-[110px] rounded-full blur-xl opacity-80"
                    style={{
                      background: 'radial-gradient(circle, #fda4af, #e11d48 60%, transparent 80%)',
                      animation: 'orbDrift 11s ease-in-out infinite',
                    }}
                  />
                  {/* Blob 4: Amber — slow opposite drift */}
                  <div
                    className="absolute w-[100px] h-[100px] rounded-full blur-xl opacity-70"
                    style={{
                      background: 'radial-gradient(circle, #fde68a, #f59e0b 60%, transparent 80%)',
                      animation: 'orbDrift2 13s ease-in-out infinite',
                    }}
                  />
                  {/* Blob 5: White core highlight */}
                  <div
                    className="absolute w-[80px] h-[80px] rounded-full blur-lg opacity-60"
                    style={{
                      background: 'radial-gradient(circle, #ffffff, #e0e7ff 50%, transparent 75%)',
                      animation: 'orbPulse 5s ease-in-out infinite',
                    }}
                  />
                </div>

                <p className="text-gray-900 text-xl md:text-2xl font-semibold leading-snug mt-auto relative z-10 max-w-[220px]">
                  Enter your information
                </p>

                {/* Keyframes */}
                <style>{`
                  @keyframes orbSpin1 {
                    0%   { transform: rotate(0deg) translateX(50px) rotate(0deg); }
                    100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
                  }
                  @keyframes orbSpin2 {
                    0%   { transform: rotate(0deg) translateX(40px) rotate(0deg); }
                    100% { transform: rotate(-360deg) translateX(40px) rotate(360deg); }
                  }
                  @keyframes orbDrift {
                    0%, 100% { transform: translate(0px, 0px) scale(1); }
                    25%  { transform: translate(45px, -30px) scale(1.1); }
                    50%  { transform: translate(-10px, -50px) scale(0.9); }
                    75%  { transform: translate(-45px, 20px) scale(1.05); }
                  }
                  @keyframes orbDrift2 {
                    0%, 100% { transform: translate(0px, 0px) scale(1); }
                    25%  { transform: translate(-40px, 35px) scale(0.95); }
                    50%  { transform: translate(30px, 45px) scale(1.1); }
                    75%  { transform: translate(50px, -25px) scale(0.9); }
                  }
                  @keyframes orbPulse {
                    0%, 100% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(1.2); opacity: 0.8; }
                  }
                `}</style>
              </div>

              {/* Right card: Form */}
              <div className="bg-white rounded-2xl p-8 md:p-10 flex flex-col">
                <p className="text-gray-900 text-xl md:text-2xl font-semibold leading-snug mb-6 lg:hidden">
                  Enter your information
                </p>
                <form
                  role="form"
                  aria-label="Demo call request"
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col justify-between flex-1"
                >
                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="demo-name" className="block text-xs text-gray-500 mb-1">
                        Name
                      </label>
                      <input
                        id="demo-name"
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pb-2 border-b border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-400 text-base focus:outline-none focus:border-gray-900 transition"
                        autoComplete="name"
                      />
                      {fieldErrors.name && (
                        <p role="alert" className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="demo-phone" className="block text-xs text-gray-500 mb-1">
                        Phone Number
                      </label>
                      <input
                        id="demo-phone"
                        type="tel"
                        placeholder="+15551234567"
                        value={phoneDisplay}
                        onChange={handlePhoneChange}
                        className="w-full pb-2 border-b border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-400 text-base focus:outline-none focus:border-gray-900 transition"
                        autoComplete="tel"
                      />
                      {fieldErrors.phone && (
                        <p role="alert" className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="demo-email" className="block text-xs text-gray-500 mb-1">
                        Email
                      </label>
                      <input
                        id="demo-email"
                        type="email"
                        placeholder="john@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pb-2 border-b border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-400 text-base focus:outline-none focus:border-gray-900 transition"
                        autoComplete="email"
                      />
                      {fieldErrors.email && (
                        <p role="alert" className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
                      )}
                    </div>

                    {/* Global error */}
                    {globalError && (
                      <p role="alert" className="text-red-500 text-sm">{globalError}</p>
                    )}
                  </div>

                  {/* Bottom bar: Submit */}
                  <div className="flex items-center justify-end mt-8 pt-4">
                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      aria-busy={formState === 'submitting'}
                      className="px-6 py-2.5 rounded-full font-medium text-sm transition bg-[#00122e] text-white hover:bg-[#001a3f] disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
                    >
                      {formState === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          <span>Calling...</span>
                        </>
                      ) : (
                        'Get a call'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Consent */}
        <p className="text-white/30 text-xs mt-4">
          By submitting, you agree to receive an AI-powered phone call
        </p>
      </div>
    </section>
  )
}
