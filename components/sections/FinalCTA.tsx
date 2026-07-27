"use client"

import { ArrowRight } from "lucide-react"
import { useNewsletterSignup } from "@/components/newsletter/useNewsletterSignup"

export function FinalCTA() {
  const { email, setEmail, submitted, submitting, error, handleSubmit } =
    useNewsletterSignup()

  return (
    <section className="relative py-20">
      <div className="w-full max-w-7xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden min-h-[480px] flex flex-col justify-between p-10 sm:p-14 md:p-16 lg:p-20"
          style={{ backgroundColor: "#0a1628" }}
        >
          {/* Aurora gradient blob */}
          <div className="absolute inset-0 opacity-70 pointer-events-none" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                background: [
                  "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(217,70,239,0.5) 0%, transparent 70%)",
                  "radial-gradient(ellipse 60% 80% at 40% 80%, rgba(236,72,153,0.4) 0%, transparent 70%)",
                  "radial-gradient(ellipse 50% 50% at 80% 60%, rgba(124,58,237,0.35) 0%, transparent 70%)",
                  "radial-gradient(ellipse 70% 40% at 20% 40%, rgba(167,57,208,0.3) 0%, transparent 70%)",
                ].join(", "),
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between flex-1">
            {/* Top: Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] max-w-2xl">
              Ready to stop losing leads?
            </h2>

            {/* Bottom: CTA + Newsletter */}
            <div className="mt-auto pt-16">
              <a
                href="/contact-sales"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-gray-900 font-semibold text-sm hover:bg-white/90 transition-colors"
              >
                Book a Call
                <ArrowRight className="h-4 w-4" />
              </a>

              <div className="mt-10">
                <p className="text-white/50 text-sm mb-3">
                  Or subscribe for updates
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="flex gap-3 max-w-lg"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    aria-label="Email address"
                    className="flex-1 px-5 py-3 rounded-full bg-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 border border-white/10"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center px-5 py-2.5 sm:gap-2 sm:px-6 sm:py-3 rounded-full bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-colors disabled:opacity-50 border border-white/10"
                  >
                    {submitted ? (
                      <span className="sm:hidden">✓</span>
                    ) : submitting ? (
                      <span className="sm:hidden">...</span>
                    ) : (
                      <ArrowRight className="h-4 w-4 sm:order-last" />
                    )}
                    <span className="hidden sm:inline">
                      {submitted ? "Subscribed!" : submitting ? "Subscribing..." : "Submit"}
                    </span>
                  </button>
                </form>
                {error && (
                  <p role="alert" className="text-red-300 text-sm mt-2">{error}</p>
                )}
                <p aria-live="polite" className="sr-only">
                  {submitted ? "Subscribed to the newsletter." : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
