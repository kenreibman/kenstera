'use client'

import { ShieldCheck, Award, HeartPulse, Globe, Trash2 } from 'lucide-react'

export default function SecurityCompliance() {
  return (
    <section className="relative py-20 bg-black">
      <div className="w-full max-w-[1120px] mx-auto px-5">
        {/* Simple centered header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-500 mb-4">
            Enterprise-grade security
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Your client data, protected
          </h2>
        </div>

        {/* Compliance badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {/* SOC 2 */}
          <div className="flex flex-col items-center gap-3 px-6 py-5 bg-white/5 border border-white/10 rounded-2xl min-w-[140px]">
            <ShieldCheck className="w-8 h-8 text-sky-400" />
            <span className="text-white font-semibold text-sm">SOC 2 Type II</span>
          </div>

          {/* ISO 27001 */}
          <div className="flex flex-col items-center gap-3 px-6 py-5 bg-white/5 border border-white/10 rounded-2xl min-w-[140px]">
            <Award className="w-8 h-8 text-sky-400" />
            <span className="text-white font-semibold text-sm">ISO 27001</span>
          </div>

          {/* HIPAA */}
          <div className="flex flex-col items-center gap-3 px-6 py-5 bg-white/5 border border-white/10 rounded-2xl min-w-[140px]">
            <HeartPulse className="w-8 h-8 text-sky-400" />
            <span className="text-white font-semibold text-sm">HIPAA</span>
          </div>

          {/* GDPR */}
          <div className="flex flex-col items-center gap-3 px-6 py-5 bg-white/5 border border-white/10 rounded-2xl min-w-[140px]">
            <Globe className="w-8 h-8 text-sky-400" />
            <span className="text-white font-semibold text-sm">GDPR</span>
          </div>

          {/* Zero Retention */}
          <div className="flex flex-col items-center gap-3 px-6 py-5 bg-white/5 border border-white/10 rounded-2xl min-w-[140px]">
            <Trash2 className="w-8 h-8 text-sky-400" />
            <span className="text-white font-semibold text-sm">Zero Retention</span>
          </div>
        </div>

        {/* Subtle footer */}
        <p className="text-center text-sm text-gray-600 mt-12">
          Audit reports and compliance documentation available upon request.
        </p>
      </div>
    </section>
  )
}
