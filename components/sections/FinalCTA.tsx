"use client"

import { ArrowRight } from "lucide-react"
import { useNewsletterSignup } from "@/components/newsletter/useNewsletterSignup"
import { Button, Container } from "@/components/el/ui"

export function FinalCTA() {
  const { email, setEmail, submitted, submitting, error, handleSubmit } =
    useNewsletterSignup()

  return (
    <section className="border-t border-hairline">
      <Container framed>
        <div className="py-20 sm:py-28">
          <div className="grad g-ember flex min-h-[420px] flex-col justify-end rounded-2xl p-8 sm:p-12">
            <h2 className="max-w-xl text-[36px] leading-[1.1] text-white sm:text-[48px]">
              Ready to stop losing leads?
            </h2>
            <div className="mt-8">
              <Button href="/contact-sales" variant="light">Book a Call</Button>
            </div>

            <div className="mt-10 max-w-md">
              <p className="mb-3 text-[14px] text-white/80">Or subscribe for updates</p>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  aria-label="Email address"
                  className="h-11 flex-1 rounded-full bg-white/15 px-4 text-[15px] text-white ring-1 ring-white/30 backdrop-blur placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/60"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-white px-5 text-[15px] text-black transition-colors hover:bg-white/90 disabled:opacity-50"
                >
                  {submitted ? "Subscribed" : submitting ? "Subscribing..." : "Submit"}
                  {!submitted && !submitting && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
              {error && (
                <p role="alert" className="mt-2 text-[14px] text-white">{error}</p>
              )}
              <p aria-live="polite" className="sr-only">
                {submitted ? "Subscribed to the newsletter." : ""}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
