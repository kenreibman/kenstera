import { CheckCircle2 } from 'lucide-react'

export default function ConfirmationHero() {
  return (
    <section className="relative pt-20 pb-12">
      <div className="w-full max-w-7xl mx-auto px-5">
        <div className="mx-auto text-center max-w-[640px]">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
          </div>

          <h1 className="text-[clamp(28px,5vw,42px)] font-bold leading-[1.15] mb-4 text-gray-900">
            You&apos;re all set.
          </h1>

          <p className="text-lg text-gray-500 mb-6">
            Your consultation has been scheduled. Check your email for the calendar invite and meeting details.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Confirmation sent to your email
          </div>
        </div>
      </div>
    </section>
  )
}
