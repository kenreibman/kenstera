"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

export function FinalCTA() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong")
        return
      }

      setEmail("")
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="relative py-20">
      <div className="w-full max-w-7xl mx-auto px-5">
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
              Built to scale
            </h2>

            {/* Bottom: Subtitle + Form */}
            <div className="mt-auto pt-16">
              <p className="text-white/70 text-lg mb-6 max-w-md">
                Subscribe to our newsletter for our product updates.
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-lg"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  aria-label="Email address"
                  className="flex-1 px-5 py-3 rounded-full bg-white text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 font-medium text-sm hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                  {submitted ? "Subscribed!" : submitting ? "Subscribing..." : "Submit"}
                  {!submitted && !submitting && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
              {error && (
                <p className="text-red-300 text-sm mt-2">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
