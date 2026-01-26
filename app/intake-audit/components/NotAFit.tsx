'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { FormData } from './QualifierForm'

interface NotAFitProps {
  formData: FormData
  onBack: () => void
}

function ProgressIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`h-1 w-16 rounded-full transition-colors ${
            i < currentStep ? 'bg-gray-900' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

export default function NotAFit({ formData, onBack }: NotAFitProps) {
  const checklist = [
    {
      title: 'Get to 20+ inbound leads per month',
      description:
        'Focus on ad spend or referral partnerships to hit this threshold before automation makes sense.',
    },
    {
      title: 'Focus on PI auto accidents',
      description:
        'This audit is specifically designed for auto accident intake workflows.',
    },
    {
      title: 'Track your current leak points',
      description:
        'Start logging missed calls, slow follow-ups, and no-shows so you know where to focus.',
    },
    {
      title: 'Document your intake process',
      description:
        'Map out your current flow: who answers, when, what questions they ask, how leads get booked.',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
          Thanks for your interest!
        </h2>
        <p className="text-gray-500">
          Based on your responses, this audit works best for PI auto accident firms with 20+ inbound leads per month. Here&apos;s what to focus on to get there:
        </p>
      </div>

      {/* Checklist */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Your pre-audit checklist:
        </h3>
        <ul className="flex flex-col gap-5">
          {checklist.map((item, index) => (
            <li key={index} className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-gray-600">
                  {index + 1}
                </span>
              </div>
              <div>
                <p className="text-[15px] font-medium text-gray-900">
                  {item.title}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Confirmation message */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <div className="flex items-start gap-4">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-[15px] font-medium text-emerald-900 mb-1">
              We&apos;ve saved your info
            </h3>
            <p className="text-sm text-emerald-700">
              We&apos;ll reach out to <span className="font-medium">{formData.email}</span> when you might be ready for an audit.
            </p>
          </div>
        </div>
      </div>

      {/* Back button and progress indicator row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <ProgressIndicator currentStep={2} totalSteps={3} />
      </div>
    </motion.div>
  )
}
