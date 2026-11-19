import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { SITE_URL } from '@/lib/seo'
import { ORG_ID } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Contact Kenstera',
  description: 'Book a free call with Kenstera or email contact@kenstera.com. Talk through websites, voice and text automation, and marketing for your business.',
}

export default function ContactSalesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Kenstera',
          url: `${SITE_URL}/contact`,
          about: { '@id': ORG_ID },
        }}
      />
      {children}
    </>
  )
}
