import { Check } from 'lucide-react'
import { BlockSection } from '@/components/exact'

export default function ConfirmationHero() {
  return (
    <BlockSection className="p-0" containerClassName="mt-6 lg:mt-10">
      <div className="px-4 py-4">
        <div className="grad g-moss flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-3xl px-6 py-16 text-center sm:min-h-[480px]">
          <span
            aria-hidden="true"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg"
          >
            <Check className="h-7 w-7 text-black" strokeWidth={1.8} />
          </span>

          <h1 className="mt-8 text-[36px] leading-[42px] tracking-[-0.72px] text-white lg:text-[48px] lg:leading-[52px] lg:tracking-[-0.96px]">
            You&apos;re all set.
          </h1>

          <p className="mt-4 max-w-md text-[17px] leading-[1.45] text-white/90">
            Your call with Kenstera is booked. Check your email for the calendar invite and meeting details.
          </p>

          <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[14px] text-black">
            <span className="h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
            Confirmation sent to your email
          </span>
        </div>
      </div>
    </BlockSection>
  )
}
