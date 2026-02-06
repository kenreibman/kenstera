export function Testimonials() {
  const testimonials = [
    {
      quote:
        '"We had no idea how many leads were falling through the cracks until the audit. Within two weeks, we recovered cases we would have lost."',
      firm: 'MassimiLaw',
      subtitle: 'Personal Injury Law Firm',
    },
    {
      quote:
        '"The intake audit showed us exactly where our follow-up was breaking down. Simple fixes, massive results."',
      firm: 'Reibman & Weiner',
      subtitle: 'Personal Injury Law Firm',
    },
  ]

  return (
    <section className="bg-gray-50 py-12 px-5">
      <div className="max-w-md mx-auto flex flex-col gap-6">
        {testimonials.map((t) => (
          <div
            key={t.firm}
            className="bg-white rounded-sm p-6 text-center shadow-sm"
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <p className="font-bold text-black text-base leading-relaxed mb-4">
              {t.quote}
            </p>

            {/* Attribution */}
            <p className="text-sm font-bold text-gray-700">{t.firm}</p>
            <p className="text-xs text-gray-500">{t.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
