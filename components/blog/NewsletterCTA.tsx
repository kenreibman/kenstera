"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

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
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            Subscribe
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
