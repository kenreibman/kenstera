import Link from 'next/link'
import Script from 'next/script'
import { BlockSection, SimpleHeader } from '@/components/exact'
import {
  ConfirmationHero,
  NextSteps,
} from './components'

export default function BookingConfirmedPage() {
  return (
    <main className="bg-page">
      <Script
        id="meta-pixel-schedule"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `fbq('track', 'PageView'); fbq('track', 'Schedule');`,
        }}
      />

      <SimpleHeader />

      <ConfirmationHero />
      <NextSteps />

      <footer>
        <BlockSection className="px-6 py-14 text-center lg:px-8">
          <div className="flex flex-col items-center gap-2">
            <p className="text-[15px] text-subtle">Questions before your call?</p>
            <a href="mailto:contact@kenstera.com" className="text-[16px] text-black underline underline-offset-4">
              contact@kenstera.com
            </a>
            <Link href="/" className="mt-4 text-[14px] text-subtle transition-colors hover:text-black">
              &larr; Back to home
            </Link>
          </div>
        </BlockSection>
      </footer>
    </main>
  )
}
