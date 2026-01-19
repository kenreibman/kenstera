'use client'

import { AlertCircle } from 'lucide-react'

export default function ProblemSection() {
  return (
    <section className="relative py-20">
      <div className="w-full max-w-[1120px] mx-auto px-5">
        <p className="text-[13px] font-semibold tracking-wide uppercase text-red-600 mb-3">
          The Reality
        </p>
        <h2 className="text-[clamp(28px,5vw,42px)] font-bold leading-[1.15] mb-5 text-gray-900">
          Your Intake Process Is Costing You Cases
        </h2>
        <p className="text-lg text-gray-500 max-w-[600px] leading-relaxed mb-12">
          You&apos;re spending money to get leads. But what happens after they call or fill out a form?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-7">
            <div className="w-11 h-11 flex items-center justify-center bg-red-50 rounded-[10px] mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2.5">After-Hours Leads Go Cold</h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              Accidents don&apos;t happen 9-to-5. A lead that calls at 9pm and gets voicemail will call your competitor at 9:01pm.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-7">
            <div className="w-11 h-11 flex items-center justify-center bg-red-50 rounded-[10px] mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2.5">Slow Response = Lost Case</h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              The average PI firm takes 47 minutes to respond to a web lead. By then, the prospect has already talked to 2-3 other firms.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-7">
            <div className="w-11 h-11 flex items-center justify-center bg-red-50 rounded-[10px] mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2.5">Intake Staff Can&apos;t Scale</h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              Hiring 24/7 intake coverage costs $15-20k/month. And humans get tired, make mistakes, and can only handle one call at a time.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-7">
            <div className="w-11 h-11 flex items-center justify-center bg-red-50 rounded-[10px] mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2.5">Good Cases Slip Through</h3>
            <p className="text-[15px] leading-relaxed text-gray-500">
              Without consistent qualification, your attorneys waste time on calls that go nowhere—while valuable cases get stuck in a queue.
            </p>
          </div>
        </div>

        <div className="bg-red-50 border border-red-100 border-l-4 border-l-red-600 rounded-lg py-6 px-7">
          <p className="text-base leading-relaxed text-gray-900">
            <strong className="text-red-600">The math is brutal:</strong> If you&apos;re spending $500 per lead and losing 30% to slow response, you&apos;re burning $150 per lead before you even talk to them.
          </p>
        </div>
      </div>
    </section>
  )
}
