import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book Qualified Leads While You Sleep | AI Intake System for Law Firms',
  description: 'Stop losing cases to slow response times. Our AI-powered intake system qualifies, routes, and books consultations around the clock—so your firm signs more cases without adding staff.',
  openGraph: {
    title: 'Book Qualified Leads While You Sleep | AI Intake System for Law Firms',
    description: 'Stop losing cases to slow response times. Our AI-powered intake system qualifies, routes, and books consultations around the clock.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Qualified Leads While You Sleep | AI Intake System for Law Firms',
    description: 'Stop losing cases to slow response times. Sign more cases with 24/7 automated intake.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function IntakeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
