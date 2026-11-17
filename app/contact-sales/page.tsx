'use client'

import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import Link from "next/link"
import { Zap, HeadphonesIcon } from 'lucide-react'

export default function ContactPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "contact" });
      cal("on", {
        action: "__iframeReady",
        callback: () => {
          cal("ui", {
            hideEventTypeDetails: true,
            theme: "light",
            layout: "month_view"
          });
        }
      });
    })();
  }, []);

  const benefits = [
    {
      icon: Zap,
      text: "Custom implementation for your firm's workflow"
    },
    {
      icon: HeadphonesIcon,
      text: "Dedicated support and ongoing optimization"
    }
  ]

  return (
    <main className="min-h-screen bg-page">
      <div className="mx-auto flex h-16 max-w-[1184px] items-center px-5 sm:px-8">
        <Link href="/" className="text-[19px] font-semibold tracking-[-0.03em] text-black">
          Kenstera
        </Link>
      </div>

      <div className="mx-auto grid max-w-[1184px] gap-10 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:pt-14">
        {/* Left */}
        <div className="lg:col-span-5">
          <p className="mb-3 text-[15px] text-subtle">Contact sales</p>
          <h1 className="text-[40px] leading-[1.08] text-black sm:text-[52px]">Contact Us</h1>

          <ul className="mt-10 space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit.text} className="flex items-start gap-3 rounded-2xl bg-surface p-4">
                <span className="ring-hairline flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white">
                  <benefit.icon className="h-4 w-4 text-black" />
                </span>
                <span className="pt-1 text-[15px] leading-[1.5] text-black/80">{benefit.text}</span>
              </li>
            ))}
          </ul>

          <Link href="/" className="mt-10 inline-block text-[14px] text-subtle transition-colors hover:text-black">
            &larr; Back to home
          </Link>
        </div>

        {/* Right: Cal.com embed */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-surface p-2">
            <div className="ring-hairline rounded-xl bg-white p-6 sm:p-8">
              <h2 className="text-[28px] leading-[1.2] text-black">Book a call</h2>
              <p className="mt-1 text-[15px] text-subtle">Pick a time that works for you</p>
              <div className="mt-6">
                <Cal namespace="contact" calLink="kenstera/intake-15-minutes" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
