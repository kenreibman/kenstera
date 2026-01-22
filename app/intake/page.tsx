import Script from 'next/script'
import {
  Hero,
  StickyNav,
  IntakeCall,
  IntakeBooking,
  IntakeSetup,
  DashboardPreview,
  CRMIntegrations,
  SecurityCompliance,
  Objections,
  FAQ,
  FinalCTA,
} from './components'

// PLACEHOLDER: Replace with your actual values
const SITE_CONFIG = {
  agencyName: 'Kenstera',
  siteUrl: 'https://kenstera.com',
}

export default function PIIntakePage() {
  return (
    <>
      <Script
        id="meta-pixel-pageview"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `fbq('track', 'PageView');`,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            'name': SITE_CONFIG.agencyName,
            'description': 'AI-powered intake automation system for Personal Injury law firms. 24/7 lead response, qualification, and booking.',
            'url': `${SITE_CONFIG.siteUrl}/intake-1`,
            'serviceType': 'Legal Technology Services',
            'areaServed': 'United States',
            'offers': {
              '@type': 'Offer',
              'name': 'PI Firm Intake System',
              'description': '24/7 automated intake, lead qualification, and consultation booking for Personal Injury firms'
            }
          })
        }}
      />

      <StickyNav />
      <main>
        <Hero />
        <IntakeCall />
        <IntakeBooking />
        <IntakeSetup />
        <CRMIntegrations />
        <SecurityCompliance />
        <DashboardPreview />
        <Objections />
        <FAQ />
        <FinalCTA />
      </main>
    </>
  )
}
