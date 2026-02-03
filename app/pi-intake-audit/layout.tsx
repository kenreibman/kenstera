import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Intake Leak Audit | Kenstera',
  description: 'Stop wasting money on shared leads that never convert. Get a free intake leak audit for your personal injury firm.',
}

export default function PIIntakeAuditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
