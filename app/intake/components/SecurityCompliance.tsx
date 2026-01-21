'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Lock, FileCheck, Server, Eye } from 'lucide-react'

export default function SecurityCompliance() {
  const [activeIndex, setActiveIndex] = useState(0)

  const features = [
    {
      title: "Attorney-client privilege protected",
      description: "All conversations are encrypted end-to-end. Your client communications remain confidential and protected under attorney-client privilege standards."
    },
    {
      title: "SOC 2 Type II certified",
      description: "Our infrastructure meets the highest security standards. Annual audits verify our controls for security, availability, and confidentiality."
    },
    {
      title: "HIPAA compliant",
      description: "For firms handling medical records and injury documentation, we maintain full HIPAA compliance with signed BAAs available."
    }
  ]

  const certifications = [
    { icon: ShieldCheck, label: 'SOC 2 Type II', color: 'text-emerald-500' },
    { icon: Lock, label: 'End-to-End Encrypted', color: 'text-sky-500' },
    { icon: FileCheck, label: 'HIPAA Compliant', color: 'text-violet-500' },
    { icon: Server, label: 'US Data Centers', color: 'text-amber-500' },
    { icon: Eye, label: 'Zero Data Retention', color: 'text-rose-500' },
  ]

  return (
    <section className="relative py-20 md:py-28">
      {/* Dotted line separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#e5e7eb_4px,#e5e7eb_8px)]" />

      <div className="w-full max-w-[1120px] mx-auto px-5">
        {/* Label */}
        <p className="text-sm font-medium text-gray-900 mb-16">
          Enterprise-grade security
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Headline + Accordion */}
          <div>
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] tracking-tight text-gray-900 mb-12">
              Your client data stays protected
            </h2>

            {/* Accordion */}
            <div className="space-y-0">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="border-t border-gray-200 first:border-t-0"
                >
                  <button
                    onClick={() => setActiveIndex(index)}
                    className="w-full text-left py-5 group"
                  >
                    <h3
                      className={`text-lg font-semibold transition-colors ${
                        activeIndex === index ? 'text-gray-900' : 'text-gray-400'
                      } group-hover:text-gray-900`}
                    >
                      {feature.title}
                    </h3>
                  </button>
                  <AnimatePresence initial={false}>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="text-[15px] leading-relaxed text-gray-600 pb-6 pr-8">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Security visual */}
          <div className="relative flex justify-center">
            {/* Gradient background */}
            <div className="relative rounded-3xl overflow-hidden w-full max-w-[480px]">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />

              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Glow effects */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-sky-500/20 rounded-full blur-3xl" />

              <div className="relative p-8 md:p-10">
                {/* Central shield */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <ShieldCheck className="w-12 h-12 text-white" />
                    </div>
                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400/50 animate-ping" style={{ animationDuration: '2s' }} />
                  </div>
                </div>

                {/* Status text */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 py-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-sm font-medium">All systems secure</span>
                  </div>
                </div>

                {/* Certification badges */}
                <div className="space-y-3">
                  {certifications.map((cert, i) => {
                    const Icon = cert.icon
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center ${cert.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-white/90 text-sm font-medium">{cert.label}</span>
                        <div className="ml-auto">
                          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-white/40 mt-6">
                  Audit reports available upon request
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
