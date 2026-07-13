'use client'

import { usePathname } from 'next/navigation'
import { MainNavigation } from '@/components/MainNavigation'
import { Footer } from '@/components/Footer'

// Routes where navigation and footer should be hidden (e.g., ad landing pages).
// '/' is the immersive redesign landing (has its own LandingNav); '/work' is
// the dark case-study route. Both bring their own chrome.
const HIDDEN_LAYOUT_ROUTES = ['/', '/work', '/intake-1', '/intake-audit', '/leak-score', '/contact-sales', '/booking-confirmed', '/personal-injury-intake', '/pi-intake-audit']

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const hideLayout = HIDDEN_LAYOUT_ROUTES.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  )

  return (
    <>
      {!hideLayout && <MainNavigation />}
      {children}
      {!hideLayout && <Footer />}
    </>
  )
}
