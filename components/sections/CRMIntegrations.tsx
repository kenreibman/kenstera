import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function CRMIntegrations() {
  const integrations = [
    { name: 'Clio', logo: <ClioLogo /> },
    { name: 'Litify', logo: <LitifyLogo /> },
    { name: 'Filevine', logo: <FilevineLogo /> },
    { name: 'MyCase', logo: <MyCaseLogo /> },
    { name: 'Salesforce', logo: <SalesforceLogo /> },
    { name: 'Lawmatics', logo: <LawmaticsLogo /> },
  ]

  return (
    <section className="relative py-20 md:py-28">
      {/* Dotted line separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#e5e7eb_4px,#e5e7eb_8px)]" />

      <div className="w-full max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[clamp(32px,5vw,52px)] font-bold leading-[1.1] tracking-tight text-gray-900 mb-5">
            Connect to Your Tech Stack and CRM
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Seamlessly connect to your existing tools and simplify case management, follow-ups, and lead conversion. Every lead flows directly into your system.
          </p>
        </div>

        {/* Integration card */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200" />

          <div className="relative p-8 md:p-12">
            {/* Logo grid */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-10">
              {integrations.map((integration, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 flex items-center justify-center h-20 shadow-sm hover:shadow-md transition-shadow"
                >
                  {integration.logo}
                </div>
              ))}
            </div>

            {/* Features row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Integration</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  Our team personally codes and connects your existing tools with tailored integrations and automated data sync.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-Time Sync</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  Client data, appointments, and conversations sync instantly across all your platforms. No manual entry required.
                </p>
              </div>
            </div>

            {/* Footer row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <Link
                href="/contact-sales"
                className="inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-3 transition-all"
              >
                Book a Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Logo components
function ClioLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <svg className="w-6 h-6" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#1B75BC" />
        <path d="M8 12a4 4 0 108 0 4 4 0 00-8 0z" fill="white" />
      </svg>
      <span className="text-[15px] font-semibold text-gray-800">Clio</span>
    </div>
  )
}

function LitifyLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#00D4AA" />
        <path d="M7 12l3 3 7-7" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[15px] font-semibold text-gray-800">Litify</span>
    </div>
  )
}

function FilevineLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#6366F1" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#6366F1" strokeWidth="2" fill="none" />
      </svg>
      <span className="text-[15px] font-semibold text-gray-800">Filevine</span>
    </div>
  )
}

function MyCaseLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" fill="#FF6B35" />
        <path d="M8 10h8M8 14h5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="text-[15px] font-semibold text-gray-800">MyCase</span>
    </div>
  )
}

function SalesforceLogo() {
  return (
    <div className="flex items-center gap-1">
      <svg className="w-7 h-7" viewBox="0 0 24 24">
        {/* Salesforce cloud shape */}
        <path
          d="M10.5 5.5c1.1-1.3 2.8-2 4.5-2 2.5 0 4.6 1.5 5.5 3.6.4-.1.8-.1 1.2-.1 2.5 0 4.3 2 4.3 4.5s-1.8 4.5-4.3 4.5h-14c-2.8 0-5-2.2-5-5 0-2.5 1.8-4.5 4.2-4.9.5-2.2 2.5-3.6 4.8-3.6 1.1 0 2.1.4 2.8 1z"
          fill="#00A1E0"
          transform="translate(-1.5, 4) scale(0.9)"
        />
      </svg>
      <span className="text-[13px] font-bold text-[#00A1E0]">salesforce</span>
    </div>
  )
}

function LawmaticsLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#7C3AED" />
        <path d="M12 6v12M8 10l4-4 4 4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[14px] font-semibold text-gray-800">Lawmatics</span>
    </div>
  )
}
