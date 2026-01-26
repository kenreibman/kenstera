'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function Hero() {
  const bullets = [
    'After-hours + overflow capture (calls + web)',
    'PI auto-accident qualification → booked consults on your calendar',
    'Follow-up + show-rate system (confirmations + no-show rescue)',
  ]

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/70 via-sky-50/50 to-white" />
      <div className="absolute inset-0 bg-gradient-to-r from-sky-100/30 via-transparent to-sky-100/30" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 pt-16 pb-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-3xl md:text-5xl font-semibold leading-[1.1] tracking-tight text-gray-900 mb-6"
          >
            Free 15-Minute Intake Leak Audit for PI Auto Accident Firms
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            If you&apos;re paying for leads, but missing calls after-hours, responding late to web leads, or losing people to no-shows, I&apos;ll map the leaks and give you a fix plan you can implement immediately.
          </motion.p>

          {/* Bullets */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col gap-3 max-w-lg mx-auto text-left"
          >
            {bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-3 text-[15px] text-gray-700">
                <Check className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
