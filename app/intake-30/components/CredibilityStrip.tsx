'use client'

export default function CredibilityStrip() {
  const stats = [
    { value: "24/7", label: "Instant response" },
    { value: "<5s", label: "Average reply time" },
    { value: "100%", label: "Calls answered" },
    { value: "0", label: "Leads missed" },
  ]

  return (
    <section className="relative py-16">
      {/* Dotted line separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#e5e7eb_4px,#e5e7eb_8px)]" />

      <div className="w-full max-w-[1120px] mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
