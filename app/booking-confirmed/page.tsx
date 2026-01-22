import Script from 'next/script'
import {
  ConfirmationHero,
  NextSteps,
  FeaturedPosts,
} from './components'

export default function BookingConfirmedPage() {
  return (
    <main className="min-h-screen bg-white">
      <Script
        id="meta-pixel-schedule"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `fbq('track', 'PageView'); fbq('track', 'Schedule');`,
        }}
      />
      <ConfirmationHero />
      <NextSteps />
      <FeaturedPosts />

      {/* Footer with contact info */}
      <footer className="py-10 border-t border-gray-200">
        <div className="w-full max-w-[1120px] mx-auto px-5 text-center">
          <p className="text-sm text-gray-500 mb-2">
            Questions before your call?
          </p>
          <a
            href="mailto:info@kenstera.com"
            className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
          >
            info@kenstera.com
          </a>
        </div>
      </footer>
    </main>
  )
}
