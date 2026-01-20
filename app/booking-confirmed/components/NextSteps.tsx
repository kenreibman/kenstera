import { Mail, Calendar, MessageSquare } from 'lucide-react'

const steps = [
  {
    icon: Mail,
    title: 'Check your inbox',
    description: 'You\'ll receive a calendar invite with the meeting link. Add it to your calendar so you don\'t miss it.',
  },
  {
    icon: Calendar,
    title: 'Prepare (optional)',
    description: 'Think about your current intake process—what\'s working, what\'s not. We\'ll discuss it on the call.',
  },
  {
    icon: MessageSquare,
    title: 'Join the call',
    description: 'We\'ll review your intake flow, show you a live demo, and give you an honest assessment of fit.',
  },
]

export default function NextSteps() {
  return (
    <section className="relative py-16">
      <div className="w-full max-w-[1120px] mx-auto px-5">
        <div className="max-w-[800px] mx-auto">
          <p className="text-[13px] font-semibold tracking-wide uppercase text-red-600 mb-3 text-center">
            What happens next
          </p>
          <h2 className="text-[clamp(24px,4vw,32px)] font-bold leading-[1.2] mb-10 text-gray-900 text-center">
            Here&apos;s what to expect
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
