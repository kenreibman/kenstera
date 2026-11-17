import {Hero} from './components/Hero'
import { IntakeWizard } from './components/IntakeWizard'

export default function PIIntakeAuditPage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div id="intake-audit">
        <IntakeWizard />
      </div>
    </main>
  )
}
