'use client'

import { motion } from 'framer-motion'
import { Check, Shield, Headphones } from 'lucide-react'

const bullets = [
  {
    icon: Check,
    text: 'After-hours + overflow capture (calls + web)',
  },
  {
    icon: Shield,
    text: 'PI auto-accident qualification → booked consults',
  },
  {
    icon: Headphones,
    text: 'Follow-up + show-rate system (no-show rescue)',
  },
]

export default function LeftSidebar() {
  return (
    <div className="relative bg-gray-950 text-white flex flex-col">
      {/* Content */}
      <div className="max-w-4xl mx-auto flex-1 px-8 lg:px-12 py-12 flex flex-col">
        {/* Logo */}
        <div className="mb-12">
          <span className="text-xl font-semibold tracking-tight">Kenstera</span>
        </div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl lg:text-4xl font-semibold leading-tight mb-4"
        >
          Free 15-Minute Intake Leak Audit <br></br> for <span className="text-cyan-400">PI Auto Accident Firms</span>
          <br />
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-md text-white/80 leading-relaxed mb-8"
        >
          If you're paying for leads, but missing calls after-hours, responding late to web leads, or losing people to no-shows, I'll map the leaks and give you a fix plan you can implement immediately.
        </motion.p>

        {/* Bullets */}
        {/* <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-4 mb-auto"
        >
          {bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-3">
              <bullet.icon className="w-5 h-5 text-white/70 mt-0.5 flex-shrink-0" />
              <span className="text-[15px] text-white/90">{bullet.text}</span>
            </li>
          ))}
        </motion.ul> */}

        {/* What you'll get */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-white/10 rounded-xl border border-white/20 p-6"
        >
          <p className="text-sm font-semibold text-white mb-4">
            In 15 minutes you&apos;ll leave with:
          </p>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-white/90">Your #1 intake leak (after-hours, speed-to-lead, follow-up, or no-shows)</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-white/90">A conservative estimate of cases you&apos;re losing</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-white/90">A 7-day fix plan you can implement immediately</span>
            </li>
          </ul>
        </motion.div>

        {/* CTA text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-center text-white text-sm font-medium"
        >
          👇 See if you qualify below 👇
        </motion.p>
      </div>
    </div>
  )
}
