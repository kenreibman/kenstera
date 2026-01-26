'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface StickyNavProps {
  onCtaClick?: () => void
}

export default function StickyNav({ onCtaClick }: StickyNavProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollThreshold = 100 // Only show after scrolling past this point

      if (currentScrollY < scrollThreshold) {
        // At top of page, hide the nav
        setIsVisible(false)
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down, show the nav
        setIsVisible(true)
      } else {
        // Scrolling up, hide the nav
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToForm = () => {
    if (onCtaClick) {
      onCtaClick()
    } else {
      // Scroll to the form section with offset for sticky nav
      const formSection = document.querySelector('form')
      if (formSection) {
        const offset = 200 // Account for sticky nav height + padding
        const elementPosition = formSection.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-4 left-4 right-4 z-50"
        >
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-4 sm:px-6 py-3">
              <div className="flex items-center justify-between gap-4">
                <span className="text-black font-medium text-sm sm:text-base truncate">
                  Free Intake Leak Audit
                </span>
                <button
                  onClick={scrollToForm}
                  className="flex-shrink-0 bg-black text-white px-5 sm:px-6 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:bg-gray-900 transition-all duration-200"
                >
                  Schedule Now
                </button>
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
