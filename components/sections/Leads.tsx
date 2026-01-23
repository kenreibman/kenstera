import { Phone, Calendar, Pencil, Check } from 'lucide-react'

function ResponseTimeCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {/* Response time graphic */}
      <div className="mb-8">
        <p className="text-sm text-gray-600 mb-4">Response time</p>

        {/* Kenstera bar */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm font-semibold text-gray-900 w-20">Kenstera</span>
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-violet-500 rounded-full"></div>
            <span className="text-sm text-violet-600">&lt; 1 min</span>
          </div>
        </div>

        {/* Industry average bar */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 w-20">Industry<br/>average</span>
          <div className="flex items-center gap-2">
            <div className="w-48 h-6 bg-gray-200 rounded-full"></div>
            <span className="text-sm text-gray-500">69 min</span>
          </div>
        </div>
      </div>

      {/* Text content */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
        Be the first to speak to every new lead
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        The firm that replies first usually wins the case. Kenstera helps you respond in seconds—so you never miss your shot at a client.
      </p>
    </div>
  )
}

function ContactCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {/* Contact card graphic */}
      <div className="mb-8 flex justify-center">
        <div className="relative">
          {/* Main contact card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white text-sm font-medium">
                BS
              </div>
            </div>
            {/* Info */}
            <div>
              <p className="text-sm font-semibold text-gray-900">Brooklyn Simmons</p>
              <p className="text-xs text-gray-500">Los Angeles, CA</p>
              <p className="text-xs text-violet-600">Personal Injury</p>
            </div>
          </div>

          {/* Action icons with connecting lines */}
          <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {/* Dotted lines and icons */}
            <div className="relative">
              <div className="absolute right-full top-1/2 w-8 border-t border-dashed border-gray-300"></div>
              <div className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center">
                <Phone className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            <div className="relative">
              <div className="absolute right-full top-1/2 w-8 border-t border-dashed border-gray-300"></div>
              <div className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center">
                <Calendar className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            <div className="relative">
              <div className="absolute right-full top-1/2 w-8 border-t border-dashed border-gray-300"></div>
              <div className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center">
                <Pencil className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Text content */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
        Guide prospects to the right next step
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        Calls. Bookings. Retainers. Every lead gets exactly what they need—automatically, and without wasting your team's time.
      </p>
    </div>
  )
}

function AutomationCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {/* Automation flow graphic */}
      <div className="mb-8 flex justify-center">
        <div className="relative">
          {/* Lead captured */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
              <svg className="w-3 h-3 text-violet-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <div className="px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-700">
              Lead captured
            </div>
          </div>

          {/* Connecting line */}
          <div className="ml-3 w-px h-4 bg-gray-200"></div>

          {/* Lead qualified */}
          <div className="flex items-center gap-2 mb-2 ml-6">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <Check className="w-3 h-3 text-emerald-600" />
            </div>
            <div className="px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-700">
              Lead qualified
            </div>
          </div>

          {/* Connecting line */}
          <div className="ml-9 w-px h-4 bg-gray-200"></div>

          {/* Call initiated */}
          <div className="flex items-center gap-2 ml-12">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Phone className="w-3 h-3 text-gray-600" />
            </div>
            <div className="px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-700">
              Call initiated
            </div>
          </div>
        </div>
      </div>

      {/* Text content */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
        Intake automation that just works
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        Kenstera handles everything before and after the call. Automate intake, follow-up, and next steps without the hassle.
      </p>
    </div>
  )
}

export function Leads() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
            Capture more leads,<br />
            from <em className="italic">more places</em>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Reach high-intent prospects across chat, text, LSA, WhatsApp, Meta, and phone—from one intake platform built to convert for law firms.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <ResponseTimeCard />
          <ContactCard />
          <AutomationCard />
        </div>
      </div>
    </section>
  )
}
