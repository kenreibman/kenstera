'use client'

import { Hero } from './components/Hero'
import { CompaniesWorkedWith } from './components/CompaniesWorkedWith'
import { IntakeWizard } from './components/IntakeWizard'

export default function PIIntakeAuditPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CompaniesWorkedWith />
      <IntakeWizard />
    </main>
  )
}
