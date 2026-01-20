import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Intake System for Personal Injury Firms | Sign More Cases 24/7',
  description: 'Stop losing cases to slow response times. Our AI-powered intake system qualifies, routes, and books consultations around the clock—so your firm signs more cases without adding staff.',
  openGraph: {
    title: 'Intake System for Personal Injury Firms | Sign More Cases 24/7',
    description: 'Stop losing cases to slow response times. Our AI-powered intake system qualifies, routes, and books consultations around the clock.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intake System for Personal Injury Firms',
    description: 'Stop losing cases to slow response times. Sign more cases with 24/7 automated intake.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PIIntakeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
