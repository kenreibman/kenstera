import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Sales | Kenstera',
  description: 'Book a call with our team to discuss AI-powered intake for your law firm.',
}

export default function ContactSalesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
