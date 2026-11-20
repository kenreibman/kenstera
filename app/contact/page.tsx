'use client'

import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"
import Link from "next/link"
import { Zap, HeadphonesIcon, Mail } from 'lucide-react'
import { BlockSection, SimpleHeader } from "@/components/exact"

function InfoCard({ icon: Icon, children }: { icon: typeof Zap; children: React.ReactNode }) {
  return (
    <li className="relative flex items-start gap-3 overflow-hidden rounded-2xl bg-surface p-4">
      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.125)]">
        <Icon className="h-4 w-4 text-black" />
      </span>
      <span className="pt-1 text-[15px] leading-[1.5] text-black/80">{children}</span>
      <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.075)]" />
    </li>
  )
}

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

  return (
    <main className="bg-page">
      <SimpleHeader />

      <BlockSection bare className="pb-10 pt-12 lg:pb-14 lg:pt-20">
        <div className="grid grid-cols-12 gap-x-3">
          <div className="col-span-12 lg:col-span-6 lg:pr-5">
            <p className="el-trim mb-5 text-[14px] leading-[21px] tracking-[0.14px] text-subtle">Get in touch</p>
            <h1 className="el-trim text-[36px] leading-[42px] tracking-[-0.72px] text-black lg:text-[48px] lg:leading-[52px] lg:tracking-[-0.96px]">
              Contact us
            </h1>
          </div>
          <div className="col-span-12 mt-8 flex flex-col lg:col-span-6 lg:mt-0 lg:pl-5">
            <p className="el-trim mt-auto text-balance text-[16px] leading-6 tracking-[0.16px] text-black lg:text-pretty">
              Pick a time that works for you, or send us an email. We&rsquo;ll talk through your business and tell you
              honestly whether we can help.
            </p>
          </div>
        </div>
      </BlockSection>

      <BlockSection className="px-6 pb-20 pt-10 lg:px-8 lg:pb-[120px]">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-3">
          {/* Left */}
          <div className="lg:col-span-5">
            <ul className="space-y-2 sm:space-y-3">
              <InfoCard icon={Zap}>Custom implementation for your business&apos;s workflow</InfoCard>
              <InfoCard icon={HeadphonesIcon}>Dedicated support and ongoing optimization</InfoCard>
              <InfoCard icon={Mail}>
                Prefer email?{" "}
                <a href="mailto:contact@kenstera.com" className="text-black underline underline-offset-4">
                  contact@kenstera.com
                </a>
              </InfoCard>
            </ul>

            <Link href="/" className="mt-10 inline-block text-[14px] text-subtle transition-colors hover:text-black">
              &larr; Back to home
            </Link>
          </div>

          {/* Right: Cal.com embed */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl bg-surface p-2">
              <div className="rounded-xl bg-white p-6 shadow-[0_0_0_0.5px_rgba(0,0,0,0.125)] sm:p-8">
                <h2 className="text-[28px] leading-[1.2] text-black">Book a call</h2>
                <p className="mt-1 text-[15px] text-subtle">Pick a time that works for you</p>
                <div className="mt-6">
                  <Cal namespace="contact" calLink="kenstera/meet-with-kenstera" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </BlockSection>
    </main>
  )
}
