import { Phone, MessageSquare, MessageCircle, Mail, ArrowRight } from 'lucide-react'

function GoogleIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="ig-flow-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80"/>
          <stop offset="50%" stopColor="#E1306C"/>
          <stop offset="100%" stopColor="#833AB4"/>
        </linearGradient>
      </defs>
      <rect width="20" height="20" x="2" y="2" rx="5" fill="url(#ig-flow-grad)"/>
      <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="2"/>
      <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24">
      <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24">
      <path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

const channels = [
  { name: 'Phone Calls', icon: <Phone className="w-6 h-6" />, description: 'Inbound & outbound calls' },
  { name: 'SMS', icon: <MessageCircle className="w-6 h-6" />, description: 'Text message conversations' },
  { name: 'Web Chat', icon: <MessageSquare className="w-6 h-6" />, description: 'Website live chat' },
  { name: 'Google Ads', icon: <GoogleIcon />, description: 'Local Service Ads leads' },
  { name: 'Facebook', icon: <FacebookIcon />, description: 'Messenger & lead forms' },
  { name: 'Instagram', icon: <InstagramIcon />, description: 'DMs & comments' },
  { name: 'WhatsApp', icon: <WhatsAppIcon />, description: 'Business messaging' },
  { name: 'Email', icon: <Mail className="w-6 h-6" />, description: 'Inbound inquiries' },
]

const leads = [
  { name: 'Aiden King', status: 'Qualified', source: 'Google LSA', time: '2 min ago', color: 'bg-amber-100' },
  { name: 'Sarah Chen', status: 'Qualified', source: 'Phone Call', time: '8 min ago', color: 'bg-rose-100' },
  { name: 'Marcus Johnson', status: 'New', source: 'Web Chat', time: '12 min ago', color: 'bg-sky-100' },
  { name: 'Emily Rodriguez', status: 'Qualified', source: 'Facebook', time: '18 min ago', color: 'bg-emerald-100' },
]

export function Flow() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
            Every channel. One inbox.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Capture leads from every source and automatically qualify them—no matter where the conversation starts.
          </p>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Channel sources */}
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-6 uppercase tracking-wide">Capture from</p>
            <div className="grid grid-cols-2 gap-4">
              {channels.map((channel, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-100/50 transition-colors"
                >
                  <div className="text-gray-700">
                    {channel.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{channel.name}</p>
                    <p className="text-xs text-gray-500">{channel.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Lead inbox preview */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <ArrowRight className="w-5 h-5 text-indigo-500" />
              <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Into your inbox</p>
            </div>

            {/* Inbox card with glow */}
            <div className="relative">
              {/* Purple glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-indigo-100 via-violet-100 to-purple-100 rounded-3xl blur-xl opacity-70" />

              {/* Card */}
              <div className="relative bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <rect x="2" y="2" width="7" height="7" rx="1.5" />
                        <rect x="11" y="2" width="7" height="7" rx="1.5" />
                        <rect x="2" y="11" width="7" height="7" rx="1.5" />
                        <rect x="11" y="11" width="7" height="7" rx="1.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Lead Inbox</p>
                      <p className="text-xs text-gray-500">4 new leads today</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs text-emerald-600 font-medium">Live</span>
                  </div>
                </div>

                {/* Lead rows */}
                <div className="divide-y divide-gray-50">
                  {leads.map((lead, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors">
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-full ${lead.color} flex items-center justify-center text-sm font-bold text-gray-700 shrink-0`}>
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-900 truncate">{lead.name}</p>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            lead.status === 'Qualified' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">via {lead.source}</p>
                      </div>

                      {/* Time */}
                      <span className="text-xs text-gray-400 shrink-0">{lead.time}</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center">
                    Leads are automatically qualified and routed to your team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
