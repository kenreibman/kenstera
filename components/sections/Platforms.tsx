'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowUp, Mic } from 'lucide-react'
import Link from 'next/link'

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
      <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl rounded-br-md max-w-[220px] text-[14px] leading-relaxed shadow-sm">
        {children}
      </div>
    </motion.div>
  )
}

function AIMessage({ text, delay }: { text: string; delay: number }) {
  const { displayedText, isComplete } = useTypewriter(text, 25, delay * 1000)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="flex items-start gap-3"
    >
      <AIAvatar />
      <div className="bg-gray-900 text-white px-4 py-3 rounded-2xl rounded-bl-md max-w-[220px] text-[14px] leading-relaxed shadow-lg">
        {displayedText}
        {!isComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            className="inline-block w-0.5 h-4 bg-white ml-0.5 align-middle"
          />
        )}
      </div>
    </motion.div>
  )
}

// Chat input mockup with typing animation
function ChatInput({ typingText, isTyping }: { typingText: string; isTyping: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-3 shadow-sm"
    >
      <span className={`text-[14px] flex-1 ${typingText ? 'text-gray-900' : 'text-gray-400'}`}>
        {typingText || 'Enter your message'}
        {isTyping && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            className="inline-block w-0.5 h-4 bg-gray-900 ml-0.5 align-middle"
          />
        )}
      </span>
      <button className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${typingText ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>
        <ArrowUp className="w-3.5 h-3.5" />
      </button>
      <button className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
        <Mic className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  )
}

// Hook for typing animation in input
function useInputTyping(text: string, speed: number = 50, startDelay: number = 0) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setDisplayedText('')
    setIsTyping(false)
    setIsComplete(false)

    const startTimeout = setTimeout(() => {
      setIsTyping(true)
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          setIsTyping(false)
          setIsComplete(true)
          clearInterval(interval)
        }
      }, speed)

      return () => clearInterval(interval)
    }, startDelay)

    return () => clearTimeout(startTimeout)
  }, [text, speed, startDelay])

  return { displayedText, isTyping, isComplete }
}

// Animated Chat Mockup
function AgentsChatMockup() {
  const [phase, setPhase] = useState(0)
  // Phase 0: Blank screen
  // Phase 1: Typing in input
  // Phase 2: Message sent, show user bubble
  // Phase 3: AI responds
  // Phase 4: Typing second message
  // Phase 5: Second message sent
  // Phase 6: AI responds again

  const firstMessage = "Hello, I've been in a car accident and I need a lawyer."
  const secondMessage = "Yes, it was a rear end collision and I have a broken leg."

  const { displayedText: inputText1, isTyping: isTyping1, isComplete: typing1Complete } = useInputTyping(
    firstMessage,
    50,
    phase >= 1 ? 0 : 99999
  )

  const { displayedText: inputText2, isTyping: isTyping2, isComplete: typing2Complete } = useInputTyping(
    secondMessage,
    50,
    phase >= 4 ? 0 : 99999
  )

  // Start typing after 1 second
  useEffect(() => {
    const timer = setTimeout(() => setPhase(1), 1000)
    return () => clearTimeout(timer)
  }, [])

  // After first typing completes, send message
  useEffect(() => {
    if (typing1Complete && phase === 1) {
      const timer = setTimeout(() => setPhase(2), 500)
      return () => clearTimeout(timer)
    }
  }, [typing1Complete, phase])

  // After user message appears, AI responds
  useEffect(() => {
    if (phase === 2) {
      const timer = setTimeout(() => setPhase(3), 800)
      return () => clearTimeout(timer)
    }
  }, [phase])

  // After AI response, start typing second message
  useEffect(() => {
    if (phase === 3) {
      const timer = setTimeout(() => setPhase(4), 4000)
      return () => clearTimeout(timer)
    }
  }, [phase])

  // After second typing completes, send message
  useEffect(() => {
    if (typing2Complete && phase === 4) {
      const timer = setTimeout(() => setPhase(5), 500)
      return () => clearTimeout(timer)
    }
  }, [typing2Complete, phase])

  // After second user message, AI responds again
  useEffect(() => {
    if (phase === 5) {
      const timer = setTimeout(() => setPhase(6), 800)
      return () => clearTimeout(timer)
    }
  }, [phase])

  // Get current input text based on phase
  const getCurrentInputText = () => {
    if (phase === 1) return inputText1
    if (phase === 4) return inputText2
    return ''
  }

  const isCurrentlyTyping = phase === 1 ? isTyping1 : phase === 4 ? isTyping2 : false

  return (
    <div className="relative rounded-3xl overflow-hidden">
      {/* Blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-sky-100 to-blue-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />

      {/* Chat container */}
      <div className="relative p-6">
        <div className="h-[280px] flex flex-col justify-end space-y-3">
          <AnimatePresence>
            {/* First user message */}
            {phase >= 2 && (
              <UserMessage key="user-1" delay={0}>
                {firstMessage}
              </UserMessage>
            )}

            {/* First AI response */}
            {phase >= 3 && (
              <AIMessage
                key="ai-1"
                text="I'm sorry to hear that. I can connect you to one of our attorneys, but first can you provide more details about the incident?"
                delay={0.3}
              />
            )}

            {/* Second user message */}
            {phase >= 5 && (
              <UserMessage key="user-2" delay={0}>
                {secondMessage}
              </UserMessage>
            )}

            {/* Second AI response */}
            {phase >= 6 && (
              <AIMessage
                key="ai-2"
                text="Thank you for the information. I'll make sure to connect you with a personal injury attorney who can assist you further."
                delay={0.3}
              />
            )}
          </AnimatePresence>
        </div>
        <div className="mt-4">
          <ChatInput typingText={getCurrentInputText()} isTyping={isCurrentlyTyping} />
        </div>
      </div>
    </div>
  )
}

// Web Development Visual Mockup
function WebDevMockup() {
  return (
    <div className="relative rounded-3xl overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

      {/* Browser mockup */}
      <div className="relative p-6">
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden">
          {/* Browser header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-900/50 border-b border-gray-700/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 ml-4">
              <div className="bg-gray-700/50 rounded-md px-3 py-1.5 text-gray-400 text-xs max-w-[200px]">
                yourwebsite.com
              </div>
            </div>
          </div>

          {/* Browser content */}
          <div className="p-4 space-y-4">
            {/* Nav mockup */}
            <div className="flex items-center justify-between">
              <div className="w-20 h-4 bg-gray-600/50 rounded" />
              <div className="flex gap-3">
                <div className="w-12 h-3 bg-gray-700/50 rounded" />
                <div className="w-12 h-3 bg-gray-700/50 rounded" />
                <div className="w-12 h-3 bg-gray-700/50 rounded" />
              </div>
            </div>

            {/* Hero mockup */}
            <div className="pt-6 pb-4 space-y-3">
              <div className="w-3/4 h-6 bg-gradient-to-r from-sky-500/60 to-indigo-500/60 rounded" />
              <div className="w-1/2 h-4 bg-gray-600/40 rounded" />
              <div className="flex gap-2 pt-2">
                <div className="w-20 h-8 bg-sky-500/70 rounded-full" />
                <div className="w-20 h-8 bg-gray-600/50 rounded-full" />
              </div>
            </div>

            {/* Cards mockup */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-lg p-3 h-20"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="bg-gradient-to-br from-sky-500/30 to-cyan-500/30 rounded-lg p-3 h-20"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="bg-gradient-to-br from-orange-500/30 to-amber-500/30 rounded-lg p-3 h-20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Platforms() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Web Development */}
          <div className="flex flex-col">
            <WebDevMockup />
            <div className="mt-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Custom Development
              </h3>
              <p className="text-gray-600 text-base md:text-lg max-w-sm mx-auto mb-6">
                Beautiful, high-converting websites built for speed and results.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/services/web"
                  className="inline-flex items-center justify-center px-6 py-3 bg-black text-white text-[13px] font-semibold tracking-wide uppercase rounded-full hover:bg-gray-800 transition-colors"
                >
                  Learn More
                </Link>
                <Link
                  href="/contact-sales"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 text-[13px] font-semibold tracking-wide uppercase rounded-full hover:bg-gray-50 transition-colors border border-gray-300"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>

          {/* Right - Agents Platform */}
          <div className="flex flex-col">
            <AgentsChatMockup />
            <div className="mt-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Agents Platform
              </h3>
              <p className="text-gray-600 text-base md:text-lg max-w-sm mx-auto mb-6">
                Speak to your customers with natural, human-sounding AI that feels truly personal.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/intake-audit"
                  className="inline-flex items-center justify-center px-6 py-3 bg-black text-white text-[13px] font-semibold tracking-wide uppercase rounded-full hover:bg-gray-800 transition-colors"
                >
                  Discover Our AI
                </Link>
                <Link
                  href="/contact-sales"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 text-[13px] font-semibold tracking-wide uppercase rounded-full hover:bg-gray-50 transition-colors border border-gray-300"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
