import { Mail, Calendar, MessageSquare } from 'lucide-react'
import { Reveal } from '@/components/el/motion'

const steps = [
  {
    icon: Mail,
    title: 'Check your inbox',
    description: "You'll receive a calendar invite with the meeting link. Add it to your calendar so you don't miss it.",
  },
  {
    icon: Calendar,
    title: 'Prepare (optional)',
    description: "Think about how your business handles calls, leads and reviews today: what's working, what's not. We'll talk it through.",
  },
  {
    icon: MessageSquare,
    title: 'Join the call',
    description: "We'll learn how your business runs and give you an honest read on whether we can help.",
  },
]

export default function NextSteps() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <p className="mb-3 text-[16px] text-subtle">What happens next</p>
          <h2 className="text-[32px] leading-[1.15] text-black sm:text-[40px]">Here&apos;s what to expect</h2>
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 90}>
              <div className="flex h-full min-h-[240px] flex-col justify-between rounded-2xl bg-surface p-6 sm:p-7">
                <span className="ring-hairline flex h-10 w-10 items-center justify-center rounded-lg bg-white/70">
                  <step.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="text-[19px] font-normal leading-[1.25] text-black">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.5] text-subtle">{step.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
