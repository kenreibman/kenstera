"use client";

import { ArrowRight } from "lucide-react";
import { useNewsletterSignup } from "@/components/newsletter/useNewsletterSignup";

export function NewsletterCTA() {
  const { email, setEmail, submitted, submitting, error, handleSubmit } =
    useNewsletterSignup();

  return (
    <div className="my-12 rounded-2xl border border-border bg-gradient-to-br from-secondary to-background p-8">
      <div className="max-w-xl">
        <h3 className="text-2xl font-semibold text-foreground mb-2">
          Stay ahead of the curve
        </h3>
        <p className="text-muted-foreground mb-6">
          Get the latest insights on AI, automation, and digital transformation
          delivered to your inbox. No spam, just valuable content.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            aria-label="Email address"
            className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitted ? "Subscribed!" : submitting ? "Subscribing..." : "Subscribe"}
            {!submitted && !submitting && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>
        {error && (
          <p role="alert" className="text-red-500 text-sm mt-2">{error}</p>
        )}
        <p aria-live="polite" className="sr-only">
          {submitted ? "Subscribed to the newsletter." : ""}
        </p>
      </div>
    </div>
  );
}
