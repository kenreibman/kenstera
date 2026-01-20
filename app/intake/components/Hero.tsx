'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowUp, Mic } from 'lucide-react'

// Typewriter hook
function useTypewriter(text: string, speed: number = 30, startDelay: number = 0) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setDisplayedText('')
    setIsComplete(false)

    const startTimeout = setTimeout(() => {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          setIsComplete(true)
          clearInterval(interval)
        }
      }, speed)

      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(startTimeout)
  }, [text, speed, startDelay])

  return { displayedText, isComplete }
}

// AI Avatar component
function AIAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
      <div className="w-4 h-4 rounded-full bg-white/30 backdrop-blur-sm" />
    </div>
  )
}

// Chat message components
function UserMessage({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="flex justify-end"
    >
      <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl rounded-br-md max-w-[260px] text-[15px] leading-relaxed shadow-sm">
        {children}
      </div>
    </motion.div>
  )
}

function AIMessage({ text, delay }: { text: string; delay: number }) {
  const { displayedText } = useTypewriter(text, 25, delay * 1000)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="flex items-start gap-3"
    >
      <AIAvatar />
      <div className="bg-gray-900 text-white px-4 py-3 rounded-2xl rounded-bl-md max-w-[280px] text-[15px] leading-relaxed shadow-lg">
        {displayedText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-0.5 h-4 bg-white ml-0.5 align-middle"
        />
      </div>
    </motion.div>
  )
}

// Chat input mockup
function ChatInput() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-3 shadow-sm"
    >
      <span className="text-gray-400 text-[15px] flex-1">Enter your message</span>
      <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
        <ArrowUp className="w-4 h-4" />
      </button>
      <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
        <Mic className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-gray-400"
    >
      <LogoMorgan />
      <LogoCrestview />
      <LogoSterling />
      <LogoHarrison />
      <LogoPacific />
    </motion.div>
  )
}

export default function Hero() {
  const [showMessages, setShowMessages] = useState(false)

  useEffect(() => {
    // Start the chat animation after a brief delay
    const timer = setTimeout(() => setShowMessages(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/70 via-sky-50/50 to-white" />
      <div className="absolute inset-0 bg-gradient-to-r from-sky-100/30 via-transparent to-sky-100/30" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1120px] mx-auto px-5 pt-12 pb-20">
        {/* Headline and CTAs */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl md:text-[clamp(36px,7vw,64px)] font-bold leading-[1.1] tracking-tight text-gray-900 mb-6"
          >
            Book qualified leads while you sleep.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-sm md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Implement AI with your firm to answer calls and messages instantly, qualify leads, and book appointments 24/7 — so every inquiry turns into an opportunity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/contact-sales"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
            >
              Contact Us
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-6 py-4 text-gray-900 font-semibold hover:text-gray-600 transition-colors"
            >
              See How It Works
            </a>
          </motion.div>
        </div>

        {/* Chat mockup */}
        <div className="flex justify-center mt-6">
          <div className="w-full max-w-[380px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.5, }}
              className="h-[325px] grid items-end bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-5 space-y-4"
            >
              <AnimatePresence>
                {showMessages && (
                  <>
                    <UserMessage delay={0.2}>
                      I was injured in a car accident last week and I need a lawyer.
                    </UserMessage>
                    <AIMessage
                      text="I'm sorry to hear about your accident. I can ask you a few questions to see if this is something we can help with."
                      delay={1.2}
                    />
                  </>
                )}
              </AnimatePresence>
              <ChatInput />
            </motion.div>
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
