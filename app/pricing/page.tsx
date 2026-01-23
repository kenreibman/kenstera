import type { Metadata } from "next";
import Link from "next/link";
import { PricingCards } from "./components/PricingCards";
import { PricingFAQ } from "./components/PricingFAQ";
import { PricingCTA } from "./components/PricingCTA";

export const metadata: Metadata = {
  title: "Pricing | Kenstera",
  description:
    "Competitive pricing for your business needs. Choose from Scale, Business, or Partner plans.",
  openGraph: {
    title: "Pricing | Kenstera",
    description:
      "Competitive pricing for your business needs. Choose from Scale, Business, or Partner plans.",
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Competitive pricing for your business needs
          </h1>
        </div>

        {/* Pricing Grid */}
        <PricingCards />

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-neutral-600">
            Not sure which plan is right for you?{" "}
            <Link
              href="https://cal.com/kenstera/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-700"
            >
              Book a free consultation
            </Link>
          </p>
        </div>

        {/* FAQ Section */}
        <PricingFAQ />

        {/* CTA Section */}
        <PricingCTA />
      </div>
    </main>
  );
}
