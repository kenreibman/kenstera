"use client"

import { ArrowRight } from "lucide-react"
import { useNewsletterSignup } from "@/components/newsletter/useNewsletterSignup"
import { Button } from "@/components/el/ui"
import { BlockSection, CtaBand } from "@/components/exact"

export function FinalCTA() {
  const { email, setEmail, submitted, submitting, error, handleSubmit } =
    useNewsletterSignup()

  return (
    <>
      <CtaBand title="Ready to stop losing leads?">
        <Button href="/contact">Book a Call</Button>
      </CtaBand>
      <BlockSection className="px-6 py-14 lg:px-8">
        <div className="mx-auto max-w-md">
          <p className="mb-3 text-[14px] text-subtle">Or subscribe for updates</p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              aria-label="Email address"
              className="h-11 flex-1 rounded-full bg-white px-4 text-[15px] text-black shadow-[0_0_0_0.5px_rgba(0,0,0,0.125)] placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-black/30"
            />
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-black px-5 text-[15px] text-white transition-colors hover:bg-black/85 disabled:opacity-50"
            >
              {submitted ? "Subscribed" : submitting ? "Subscribing..." : "Submit"}
              {!submitted && !submitting && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
          {error && (
            <p role="alert" className="mt-2 text-[14px] text-black">{error}</p>
          )}
          <p aria-live="polite" className="sr-only">
            {submitted ? "Subscribed to the newsletter." : ""}
          </p>
        </div>
      </BlockSection>
    </>
  )
}
