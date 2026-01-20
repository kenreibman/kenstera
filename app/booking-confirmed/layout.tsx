import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Booking Confirmed | Kenstera',
  description: 'Your consultation has been scheduled. We look forward to speaking with you.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function BookingConfirmedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
