import { Button } from "@/components/el/ui"
import { BlockSection, TITLE_CLASS, TitleBlock } from "@/components/exact"

export function CRMIntegrations() {
  const integrations = [
    { name: "Clio", logo: <ClioLogo /> },
    { name: "Litify", logo: <LitifyLogo /> },
    { name: "Filevine", logo: <FilevineLogo /> },
    { name: "MyCase", logo: <MyCaseLogo /> },
    { name: "Salesforce", logo: <SalesforceLogo /> },
    { name: "Lawmatics", logo: <LawmaticsLogo /> },
  ]

  return (
    <>
      <BlockSection className="px-6 pb-12 pt-20 lg:px-8 lg:pb-14 lg:pt-[120px]">
        <TitleBlock eyebrow="Integrations">
          <h2 className={TITLE_CLASS}>Connect to your tech stack and CRM</h2>
        </TitleBlock>
        <p className="el-trim mx-auto mt-5 max-w-[560px] px-5 text-center text-[16px] leading-6 tracking-[0.16px] text-subtle">
          Seamlessly connect to your existing tools and simplify case management, follow-ups, and lead conversion. Every lead flows directly into your system.
        </p>
      </BlockSection>

      <BlockSection className="p-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="flex h-28 items-center justify-center border-b border-r border-black/5 px-4 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r lg:[&:nth-child(6n)]:border-r-0"
              aria-label={integration.name}
            >
              {integration.logo}
            </div>
          ))}
        </div>
        <div className="grid gap-8 px-6 py-12 md:grid-cols-2 lg:px-8">
          <div>
            <h3 className="mb-[18px] text-[24px] font-normal leading-[31.2px] tracking-[-0.24px] text-black">Custom integration</h3>
            <p className="text-[16px] leading-[22.4px] tracking-[0.16px] text-[#6e6e6e]">
              Our team personally codes and connects your existing tools with tailored integrations and automated data sync.
            </p>
          </div>
          <div>
            <h3 className="mb-[18px] text-[24px] font-normal leading-[31.2px] tracking-[-0.24px] text-black">Real-time sync</h3>
            <p className="text-[16px] leading-[22.4px] tracking-[0.16px] text-[#6e6e6e]">
              Client data, appointments, and conversations sync instantly across all your platforms. No manual entry required.
            </p>
          </div>
        </div>
        <div className="border-t border-black/5 px-6 py-8 lg:px-8">
          <Button href="/contact">Book a Demo</Button>
        </div>
      </BlockSection>
    </>
  )
}

function ClioLogo() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-1.5">
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
    <div className="flex flex-col md:flex-row items-center gap-1.5">
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
    <div className="flex flex-col md:flex-row items-center gap-1.5">
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
    <div className="flex flex-col md:flex-row items-center gap-1.5">
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
    <div className="flex flex-col md:flex-row items-center gap-1">
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
    <div className="flex flex-col md:flex-row items-center gap-1.5">
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#7C3AED" />
        <path d="M12 6v12M8 10l4-4 4 4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[14px] font-semibold text-gray-800">Lawmatics</span>
    </div>
  )
}
