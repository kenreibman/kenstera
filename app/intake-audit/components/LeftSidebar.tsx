import { Search, Calculator, Zap } from 'lucide-react'

const deliverables = [
  {
    icon: Search,
    title: '#1 Intake Leak Analysis',
    description: 'After-hours, speed-to-lead, follow-up, or no-shows',
    iconBg: 'bg-gradient-to-br from-sky-400/20 to-blue-500/20',
    iconColor: 'text-sky-600',
  },
  {
    icon: Calculator,
    title: 'Boosted Revenue Projection',
    description: 'Conservative projection of missed opportunities',
    iconBg: 'bg-gradient-to-br from-violet-400/20 to-purple-500/20',
    iconColor: 'text-violet-600',
  },
  {
    icon: Zap,
    title: '7-Day Fix Plan',
    description: 'Actionable steps you can implement immediately',
    iconBg: 'bg-gradient-to-br from-amber-400/20 to-orange-500/20',
    iconColor: 'text-amber-600',
  },
]


export default function LeftSidebar() {
  return (
    <div className="relative h-full flex flex-col justify-center">
      {/* Glass background */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border-r border-white/50" />

      {/* Content */}
      <div className="relative max-w-lg mx-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-12 flex flex-col">
        {/* Logo */}
        <div className="mb-8">
          <span className="text-lg font-semibold tracking-tight text-gray-900">Kenstera</span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl lg:text-3xl font-semibold leading-tight mb-4 text-gray-900">
          Free 15-Minute Intake Leak Audit
        </h1>

        {/* Subheading */}
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          For Personal Injury auto accident firms paying for leads but losing cases to missed calls, slow follow-up, or no-shows.
        </p>

        {/* Bento Grid Cards */}
        <div className="mb-3">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            You&apos;ll leave with
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {deliverables.map((item, index) => (
            <div
              key={index}
              className="
                group flex items-center gap-3 p-3
                bg-white/60 backdrop-blur-sm rounded-xl
                border border-white/80
                shadow-[0_8px_32px_rgba(0,0,0,0.04)]
                hover:bg-white/80 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]
                transition-all duration-300
              "
            >
              {/* Icon */}
              <div className={`
                w-9 h-9 rounded-xl flex-shrink-0
                flex items-center justify-center
                backdrop-blur-sm
                ${item.iconBg}
              `}>
                <item.icon className={`w-4 h-4 ${item.iconColor}`} />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
