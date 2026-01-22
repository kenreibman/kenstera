'use client'

import { motion } from 'framer-motion'

// Fake law firm logo components
function LogoMorgan() {
  return (
    <div className="flex items-center gap-2">
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <rect x="3" y="14" width="14" height="3" />
        <rect x="4" y="6" width="2" height="8" />
        <rect x="9" y="6" width="2" height="8" />
        <rect x="14" y="6" width="2" height="8" />
        <polygon points="10,2 2,6 18,6" />
      </svg>
      <span className="text-[14px] font-semibold tracking-wide">MORGAN & ASSOCIATES</span>
    </div>
  )
}

function LogoCrestview() {
  return (
    <div className="flex items-center gap-1.5">
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2L3 6v8l7 4 7-4V6l-7-4zm0 2.5L14.5 7 10 9.5 5.5 7 10 4.5z" />
      </svg>
      <span className="text-[14px] font-medium">Crestview Law Group</span>
    </div>
  )
}

function LogoSterling() {
  return (
    <div className="flex items-center gap-1.5">
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <circle cx="10" cy="10" r="8" fillOpacity="0.15" />
        <path d="M6 10l3 3 5-6" strokeWidth="2" stroke="currentColor" fill="none" />
      </svg>
      <span className="text-[14px] font-semibold">Sterling Law</span>
    </div>
  )
}

function LogoHarrison() {
  return (
    <div className="flex items-center gap-2">
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <rect x="2" y="8" width="7" height="10" rx="1" />
        <rect x="11" y="8" width="7" height="10" rx="1" />
        <rect x="8" y="4" width="4" height="4" />
        <circle cx="10" cy="12" r="2" fillOpacity="0.3" />
      </svg>
      <span className="text-[14px] font-bold tracking-tight">HARRISON BELL LLP</span>
    </div>
  )
}

function LogoPacific() {
  return (
    <div className="flex items-center gap-1.5">
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 14c2-2 4-3 6-3s4 1 6 3 4 3 6 3v2H2v-2z" fillOpacity="0.3" />
        <path d="M2 10c2-2 4-3 6-3s4 1 6 3 4 3 6 3v2c-2 0-4-1-6-3s-4-3-6-3-4 1-6 3v-2z" />
      </svg>
      <span className="text-[14px] font-medium italic">Pacific Injury Law</span>
    </div>
  )
}

// Logo strip component
function LogoStrip() {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-gray-400"
    >
      <LogoMorgan />
      <LogoCrestview />
      <LogoSterling />
      <LogoHarrison />
      <LogoPacific />
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/70 via-sky-50/50 to-white" />
      <div className="absolute inset-0 bg-gradient-to-r from-sky-100/30 via-transparent to-sky-100/30" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1120px] mx-auto px-5 pt-12 pb-12">
        {/* Headline and CTAs */}
        <div className="text-center max-w-3xl mx-auto">
          <h1
            className="text-3xl md:text-5xl font-semibold leading-[1.1] tracking-tight text-gray-900 mb-6"
          >
            Capture, Qualify, Book, and Follow Up Automatically.
          </h1>

          <p
            className="text-sm md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Implement AI with your firm to answer calls and messages instantly, qualify leads, and book appointments 24/7. Never lose a high-value lead again..
          </p>

          <div className="flex justify-center">
            <a
              href="/contact-sales"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
            >
              Schedule a Call
            </a>
          </div>
        </div>

        {/* Logo strip */}
        <div className="mt-20">
          <LogoStrip />
        </div>
      </div>
    </section>
  )
}
