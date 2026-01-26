'use client'

import { usePathname } from 'next/navigation'
import { MainNavigation } from '@/components/MainNavigation'
import { Footer } from '@/components/Footer'

// Routes where navigation and footer should be hidden (e.g., ad landing pages)
const HIDDEN_LAYOUT_ROUTES = ['/intake-1', '/intake', '/intake-audit', '/contact-sales', '/booking-confirmed']

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
