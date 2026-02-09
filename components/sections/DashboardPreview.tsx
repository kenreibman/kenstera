// Mini sparkline chart
function Sparkline({ color = 'stroke-sky-500', trend = 'up' }: { color?: string; trend?: 'up' | 'down' | 'flat' }) {
  const paths = {
    up: 'M0,20 L10,18 L20,15 L30,16 L40,12 L50,10 L60,8 L70,6 L80,4',
    down: 'M0,4 L10,6 L20,8 L30,7 L40,12 L50,14 L60,16 L70,18 L80,20',
    flat: 'M0,12 L10,11 L20,13 L30,12 L40,11 L50,13 L60,12 L70,11 L80,12'
  }
  return (
    <svg className="w-20 h-6" viewBox="0 0 80 24">
      <path d={paths[trend]} fill="none" className={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// Progress bar
function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden w-full">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  )
}

export function DashboardPreview() {
  const navItems = [
    { icon: 'grid', label: 'Dashboard', active: true },
    { icon: 'phone', label: 'Calls', badge: 18 },
    { icon: 'play', label: 'Recordings' },
    { icon: 'chart', label: 'Analytics' },
    { icon: 'calendar', label: 'Appointments' },
    { icon: 'users', label: 'Clients' },
    { icon: 'settings', label: 'Settings' },
  ]

  const recentCalls = [
    { name: 'Maria Rodriguez', status: 'Booked', statusColor: 'bg-emerald-100 text-emerald-700', detail: 'Auto accident · MVA intake · 2:31', time: '3 min ago' },
    { name: 'James Thompson', status: 'Qualified', statusColor: 'bg-sky-100 text-sky-700', detail: 'Slip and fall · Commercial property · 1:48', time: '12 min ago' },
    { name: 'Sarah Mitchell', status: 'Booked', statusColor: 'bg-emerald-100 text-emerald-700', detail: 'Work injury · Construction site · 3:15', time: '24 min ago' },
    { name: 'David Chen', status: 'Follow-up', statusColor: 'bg-amber-100 text-amber-700', detail: 'Medical malpractice · Needs docs · 2:02', time: '41 min ago' },
  ]

  const outcomes = [
    { label: 'Booked', count: 1847, pct: 76, color: 'bg-emerald-500' },
    { label: 'Qualified', count: 312, pct: 13, color: 'bg-sky-500' },
    { label: 'Follow-up', count: 194, pct: 8, color: 'bg-amber-500' },
    { label: 'Other', count: 73, pct: 3, color: 'bg-gray-400' },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-[clamp(28px,5vw,44px)] font-bold leading-[1.15] tracking-tight text-gray-900 mb-4"
          >
            Your Client & Sales Coordinator
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Answer calls and messages instantly, qualify leads, and book appointments 24/7.
          </p>
        </div>

        {/* Dashboard mockup */}
        <div
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-sky-100/50 via-blue-100/50 to-indigo-100/50 rounded-[32px] blur-2xl" />

          {/* Dashboard container */}
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200/80 overflow-hidden">
            <div className="flex">
              {/* Sidebar */}
              <div className="hidden md:flex flex-col w-56 border-r border-gray-100 bg-gray-50/50 p-4">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-8 px-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">K</span>
                  </div>
                  <span className="text-[15px] font-semibold text-gray-900">Kenstera</span>
                </div>

                {/* Nav items */}
                <nav className="flex-1 space-y-1">
                  {navItems.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] ${
                        item.active
                          ? 'bg-white text-gray-900 font-medium shadow-sm'
                          : 'text-gray-600'
                      }`}
                    >
                      <NavIcon type={item.icon} active={item.active} />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-sky-500 text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Main content */}
              <div className="flex-1 p-6">
                {/* Top bar */}
                <div className="hidden lg:flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-gray-900">Call Analytics</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Last 7 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 text-[13px] text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg">
                      <CalendarIcon />
                      <span>Jan 14 - Jan 21</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[13px] text-white bg-sky-500 px-3 py-1.5 rounded-lg">
                      <ExportIcon />
                      <span>Export</span>
                    </div>
                  </div>
                </div>

                {/* Stats row 1 */}
                <div className="hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <StatCard
                    label="Total Calls"
                    value="2,426"
                    change="+19%"
                    positive
                    icon={<PhoneIcon />}
                    chart={<Sparkline trend="up" />}
                  />
                  <StatCard
                    label="Booking Rate"
                    value="76%"
                    icon={<CheckIcon />}
                    chart={<Sparkline color="stroke-emerald-500" trend="up" />}
                  />
                  <StatCard
                    label="Avg. Call Time"
                    value="2m 18s"
                    icon={<ClockIcon />}
                  />
                  <StatCard
                    label="Activity"
                    value=""
                    icon={<span className="text-[11px] text-sky-600 font-medium">Month</span>}
                    chart={<Sparkline trend="flat" />}
                  />
                </div>

                {/* Stats row 2 */}
                <div className="hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <StatCard
                    label="Leads Qualified"
                    value="1,634"
                    subtext="89%"
                    icon={<UserCheckIcon />}
                  />
                  <StatCard
                    label="Consultations"
                    value="847"
                    change="+24%"
                    positive
                    icon={<CalendarCheckIcon />}
                  />
                  <StatCard
                    label="Signed Clients"
                    value="312"
                    subtext="signed"
                    icon={<FileCheckIcon />}
                  />
                  <StatCard
                    label="Conversion Rate"
                    value="37%"
                    change="+8%"
                    positive
                    icon={<TrendIcon />}
                  />
                </div>

                {/* Bottom section */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  {/* Recent calls */}
                  <div className="lg:col-span-3 bg-gray-50/80 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">Recent Calls</h4>
                      <span className="text-[13px] text-sky-600 font-medium">View all →</span>
                    </div>
                    <div className="space-y-3">
                      {recentCalls.map((call, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <PlayIcon />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[14px] font-medium text-gray-900">{call.name}</span>
                              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${call.statusColor}`}>
                                {call.status}
                              </span>
                            </div>
                            <p className="text-[12px] text-gray-500 truncate">{call.detail}</p>
                          </div>
                          <span className="text-[12px] text-gray-400 whitespace-nowrap">{call.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call outcomes */}
                  <div className="lg:col-span-2 bg-gray-50/80 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-4">Call Outcomes</h4>
                    <div className="space-y-4">
                      {outcomes.map((item, i) => (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <div className={`w-2.5 h-2.5 rounded-sm ${item.color}`} />
                              <span className="text-[13px] text-gray-700">{item.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[14px] font-semibold text-gray-900">{item.count.toLocaleString()}</span>
                              <span className="text-[12px] text-gray-400">({item.pct}%)</span>
                            </div>
                          </div>
                          <ProgressBar value={item.pct} color={item.color} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Stat card component
function StatCard({
  label,
  value,
  change,
  positive,
  subtext,
  icon,
  chart
}: {
  label: string
  value: string
  change?: string
  positive?: boolean
  subtext?: string
  icon?: React.ReactNode
  chart?: React.ReactNode
}) {
  return (
    <div className="bg-gray-50/80 rounded-xl p-4">
      <div className="flex items-start justify-between mb-2">
        <span className="text-[13px] text-gray-500">{label}</span>
        {icon}
      </div>
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {change && (
            <span className={`text-[12px] font-medium ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
              {change}
            </span>
          )}
          {subtext && <span className="text-[12px] text-gray-400">{subtext}</span>}
        </div>
        {chart}
      </div>
    </div>
  )
}

// Icon components
function NavIcon({ type, active }: { type: string; active?: boolean }) {
  const color = active ? 'text-gray-900' : 'text-gray-400'
  const icons: Record<string, React.ReactNode> = {
    grid: (
      <svg className={`w-4 h-4 ${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    phone: (
      <svg className={`w-4 h-4 ${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    play: (
      <svg className={`w-4 h-4 ${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
      </svg>
    ),
    chart: (
      <svg className={`w-4 h-4 ${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M4 20h16M4 20V10m0 10l4-6m0 6V8m0 12l4-8m0 8V6m0 14l4-4m0 4V4" />
      </svg>
    ),
    calendar: (
      <svg className={`w-4 h-4 ${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    users: (
      <svg className={`w-4 h-4 ${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    settings: (
      <svg className={`w-4 h-4 ${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  }
  return icons[type] || null
}

function CalendarIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

function ExportIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12M12 4l-4 4M12 4l4 4" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

function UserCheckIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M17 11l2 2 4-4" />
    </svg>
  )
}

function CalendarCheckIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4" />
    </svg>
  )
}

function FileCheckIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M9 15l2 2 4-4" />
    </svg>
  )
}

function TrendIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M23 6l-9.5 9.5-5-5L1 18" />
      <path d="M17 6h6v6" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
