import { Mail, Calendar, MessageSquare } from 'lucide-react'
import { BlockSection, TITLE_CLASS, TitleBlock } from '@/components/exact'

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
    <>
      <BlockSection className="px-6 pb-10 pt-20 lg:px-8 lg:pb-10 lg:pt-[120px]">
        <TitleBlock eyebrow="What happens next">
          <h2 className={TITLE_CLASS}>Here&apos;s what to expect</h2>
        </TitleBlock>
      </BlockSection>
      <BlockSection className="px-6 pb-20 pt-10 lg:px-8 lg:pb-[120px]">
        <div className="grid gap-2 sm:grid-cols-3 sm:gap-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl bg-surface px-5 py-7"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.125)]">
                <step.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </span>
              <div>
                <h3 className="mb-[18px] text-[24px] font-normal leading-[31.2px] tracking-[-0.24px] text-black">{step.title}</h3>
                <p className="text-[16px] leading-[22.4px] tracking-[0.16px] text-[#6e6e6e]">{step.description}</p>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.075)]" />
            </div>
          ))}
        </div>
      </BlockSection>
    </>
  )
}
