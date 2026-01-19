'use client'

import { CheckCircle, Clock, ClipboardList, Users } from 'lucide-react'

export default function CredibilityStrip() {
  return (
    <section className="relative py-6 border-t border-b border-gray-200 bg-gray-50">
      <div className="w-full max-w-[1120px] mx-auto px-5">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-900 whitespace-nowrap">
            <CheckCircle className="w-5 h-5 text-red-600" />
            <span>Built for PI Firms</span>
          </div>
          <div className="w-px h-5 bg-gray-200" />
          <div className="flex items-center gap-2 text-sm font-medium text-gray-900 whitespace-nowrap">
            <Clock className="w-5 h-5 text-red-600" />
            <span>24/7 Instant Response</span>
          </div>
          <div className="w-px h-5 bg-gray-200" />
          <div className="flex items-center gap-2 text-sm font-medium text-gray-900 whitespace-nowrap">
            <ClipboardList className="w-5 h-5 text-red-600" />
            <span>Case Qualification Built-In</span>
          </div>
          <div className="w-px h-5 bg-gray-200" />
          <div className="flex items-center gap-2 text-sm font-medium text-gray-900 whitespace-nowrap">
            <Users className="w-5 h-5 text-red-600" />
            <span>No Staff Required</span>
          </div>
        </div>
      </div>
    </section>
  )
}
