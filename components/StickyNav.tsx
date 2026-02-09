'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function StickyNav() {
  const [isVisible, setIsVisible] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Only show after scrolling past 400px
      if (currentScrollY < 400) {
        setIsVisible(false)
      } else {
        // Show when scrolling down, hide when scrolling up
        if (currentScrollY > lastScrollY.current) {
          setIsVisible(true) // scrolling down
        } else {
          setIsVisible(false) // scrolling up
        }
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50"
        >
          <div className="w-full max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
            {/* Left: Tagline */}
            <span className="text-[12px] text-gray-900">
              Scale Your Firm
            </span>

            {/* Right: CTAs */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact-sales"
                className="px-5 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors"
              >
                Schedule a Call
              </Link>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
