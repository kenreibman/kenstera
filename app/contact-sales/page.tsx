'use client'

import Script from 'next/script'
import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import { Zap, ShieldCheck, HeadphonesIcon, Star } from 'lucide-react'

function CalEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "intake-15-minutes" })
      cal("ui", { theme: "light", hideEventTypeDetails: true, layout: "month_view" })
    })()
  }, [])

  return (
    <Cal
      namespace="intake-15-minutes"
      calLink="kenstera/intake-15-minutes"
      style={{ width: "100%", height: "100%", minHeight: "600px" }}
      config={{ layout: "month_view", theme: "light", hideEventTypeDetails: "true" }}
    />
  )
}

export default function ContactPage() {
  const benefits = [
    {
      icon: Zap,
      text: "Custom implementation for your firm's workflow"
    },
    {
      icon: ShieldCheck,
      text: "Enterprise-grade security including SOC II, GDPR and HIPAA compliance"
    },
    {
      icon: HeadphonesIcon,
      text: "Dedicated support and ongoing optimization"
    }
  ]

  return (
    <main className="lg:h-screen flex flex-col lg:flex-row">
      <Script
        id="meta-pixel-pageview"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `fbq('track', 'PageView');`,
        }}
      />
      {/* Left side - Dark */}
      <div className="hidden lg:flex h-full w-full lg:w-1/2 bg-black text-white p-8 md:p-12 lg:p-16 flex-col relative order-2 lg:order-1">
        {/* Logo */}
        <div className="mb-12">
          <span className="text-xl font-bold">Kenstera</span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h1 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] tracking-tight mb-8">
            Contact Us
          </h1>

          {/* Benefits */}
          <div className="space-y-5 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <benefit.icon className="w-5 h-5 text-white/70 mt-0.5 flex-shrink-0" />
                <span className="text-[15px] text-white/80 leading-relaxed">
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>

          {/* Trusted by */}
          <div className="mt-auto">
            <p className="text-sm text-white/50 mb-6">
              Trusted by leading PI firms
            </p>

            {/* Reviews */}
            <div className="flex items-center gap-2 mt-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-muted fill-muted" />
                ))}
              </div>
              <span className="text-sm text-white/60">
                5.0 stars from our clients
              </span>
            </div>
          </div>
        </div>

        {/* Decorative wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full"
          >
            <path
              d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"
              fill="rgba(255,255,255,0.03)"
            />
            <path
              d="M0,80 C200,40 400,100 600,80 C800,60 1000,100 1200,80 L1200,120 L0,120 Z"
              fill="rgba(255,255,255,0.02)"
            />
          </svg>
        </div>
      </div>

      {/* Right side - White with Cal embed */}
      <div className="w-full lg:w-1/2 bg-white p-8 md:p-12 lg:p-16 flex flex-col order-1 lg:order-2 overflow-auto">
        <div className="mx-auto w-full flex-1">
          {/* <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Book a call
          </h2>
          <p className="text-gray-500 mb-8">
            Pick a time that works for you
          </p> */}

          {/* Cal.com embed */}
          <div className="flex-1">
            <CalEmbed />
          </div>
        </div>
      </div>
    </main>
  )
}