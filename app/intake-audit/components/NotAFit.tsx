import { ArrowLeft, CheckCircle } from 'lucide-react'
import { FormData } from './QualifierForm'

interface NotAFitProps {
  formData: FormData
  onBack: () => void
}

function ProgressIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="hidden md:flex items-center gap-1.5">
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
    <div className="w-full bg-white/30 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
          Thanks for your interest!
        </h2>
        <p className="text-gray-500">
          This audit works best for firms with 20+ inbound leads per month. Here&apos;s what to focus on to get there:
        </p>
      </div>

      {/* Checklist */}
      <div className="bg-white/50 backdrop-blur-sm border border-white/60 rounded-2xl p-6 mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Your pre-audit checklist:
        </h3>
        <ul className="flex flex-col gap-5">
          {checklist.map((item, index) => (
            <li key={index} className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-gray-700">
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
      <div className="bg-gradient-to-br from-emerald-50/80 to-green-50/60 backdrop-blur-sm border border-emerald-200/50 rounded-2xl p-5 mb-8">
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
          className="p-3 bg-white/60 backdrop-blur-sm text-gray-700 rounded-full hover:bg-white/80 transition-all border border-white/60"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <ProgressIndicator currentStep={2} totalSteps={3} />
      </div>
    </div>
  )
}
