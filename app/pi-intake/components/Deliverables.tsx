'use client'

import { Phone, MessageSquare, ClipboardList, Zap, Calendar, Building } from 'lucide-react'
import { Check } from 'lucide-react'

export default function Deliverables() {
  return (
    <section className="relative py-20">
      <div className="w-full max-w-[1120px] mx-auto px-5">
        <p className="text-[13px] font-semibold tracking-wide uppercase text-red-600 mb-3">
          What You Get
        </p>
        <h2 className="text-[clamp(28px,5vw,42px)] font-bold leading-[1.15] mb-5 text-gray-900">
          A Complete Intake System, Not Just Another Tool
        </h2>
        <p className="text-lg text-gray-500 max-w-[600px] leading-relaxed mb-12">
          Everything you need to capture, qualify, and convert every lead—built specifically for Personal Injury.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-7">
            <div className="w-11 h-11 flex items-center justify-center bg-red-50 rounded-[10px] mb-4">
              <Phone className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2.5">24/7 Voice Response</h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              Intelligent voice system that answers calls instantly, gathers case details, and handles conversations naturally—no robotic menus.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-7">
            <div className="w-11 h-11 flex items-center justify-center bg-red-50 rounded-[10px] mb-4">
              <MessageSquare className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2.5">Multi-Channel Coverage</h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              Text messages, web forms, live chat—all funneled into one system. Every channel gets the same instant, qualified response.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-7">
            <div className="w-11 h-11 flex items-center justify-center bg-red-50 rounded-[10px] mb-4">
              <ClipboardList className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2.5">PI-Specific Qualification</h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              Custom intake scripts for auto accidents, slip-and-fall, medical malpractice, and more. Captures the details your attorneys need.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-7">
            <div className="w-11 h-11 flex items-center justify-center bg-red-50 rounded-[10px] mb-4">
              <Zap className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2.5">Intelligent Routing</h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              High-value cases to senior partners, specific case types to specialists. Your rules, automatically enforced 24/7.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-7">
            <div className="w-11 h-11 flex items-center justify-center bg-red-50 rounded-[10px] mb-4">
              <Calendar className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2.5">Automated Booking</h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              Qualified leads book directly into your calendar. Automated confirmations and reminders reduce no-shows significantly.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-7">
            <div className="w-11 h-11 flex items-center justify-center bg-red-50 rounded-[10px] mb-4">
              <Building className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2.5">CRM Integration</h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              Syncs with Clio, Litify, Filevine, Salesforce, and more. New leads and case data flow directly into your existing systems.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-7">
          <h4 className="text-base font-semibold text-gray-900 mb-5">Also Included:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="flex items-center gap-2.5 text-[15px] text-gray-900">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Setup &amp; configuration</span>
            </div>
            <div className="flex items-center gap-2.5 text-[15px] text-gray-900">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Custom intake scripts</span>
            </div>
            <div className="flex items-center gap-2.5 text-[15px] text-gray-900">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Performance dashboard</span>
            </div>
            <div className="flex items-center gap-2.5 text-[15px] text-gray-900">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Ongoing optimization</span>
            </div>
            <div className="flex items-center gap-2.5 text-[15px] text-gray-900">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Dedicated support</span>
            </div>
            <div className="flex items-center gap-2.5 text-[15px] text-gray-900">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>No long-term contract</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
