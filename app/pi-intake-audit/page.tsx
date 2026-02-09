import {Hero} from './components/Hero'
import { CompaniesWorkedWith } from './components/CompaniesWorkedWith'
import { IntakeWizard } from './components/IntakeWizard'
import {Testimonials} from './components/Testimonials'

export default function PIIntakeAuditPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CompaniesWorkedWith />
      <div id="intake-audit">
        <IntakeWizard />
      </div>
      <Testimonials />
    </main>
  )
}
