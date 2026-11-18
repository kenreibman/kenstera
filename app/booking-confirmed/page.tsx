import Link from 'next/link'
import Script from 'next/script'
import {
  ConfirmationHero,
  NextSteps,
} from './components'

export default function BookingConfirmedPage() {
  return (
    <main className="min-h-screen bg-page">
      <Script
        id="meta-pixel-schedule"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `fbq('track', 'PageView'); fbq('track', 'Schedule');`,
        }}
      />

      <div className="px-5 sm:px-8">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center">
          <Link href="/" className="text-[19px] font-semibold tracking-[-0.03em] text-black">
            Kenstera
          </Link>
        </div>
      </div>

      <ConfirmationHero />
      <NextSteps />

      <footer className="border-t border-hairline py-12">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-2 px-5 text-center sm:px-8">
          <p className="text-[15px] text-subtle">Questions before your call?</p>
          <a
            href="mailto:contact@kenstera.com"
            className="text-[16px] text-black underline underline-offset-4"
          >
            contact@kenstera.com
          </a>
          <Link href="/" className="mt-4 text-[14px] text-subtle transition-colors hover:text-black">
            &larr; Back to home
          </Link>
        </div>
      </footer>
    </main>
  )
}
