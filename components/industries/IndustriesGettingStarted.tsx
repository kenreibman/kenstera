import Link from "next/link";

interface IndustriesGettingStartedProps {
  heading?: string;
  description?: string;
}

export function IndustriesGettingStarted({
  heading = "Start in days, not months",
  description = "Get started easily with minimal setup and hands-on support to explore what Conversational Agents can unlock for your business.",
}: IndustriesGettingStartedProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Dotted line */}
        <div className="border-t-2 border-dotted border-gray-300 mb-4" />

        {/* Section label */}
        <p className="text-sm font-medium text-gray-900 mb-16">Getting started</p>

        {/* Heading row */}
        <div className="flex justify-between items-start mb-16">
          <div className="max-w-lg">
            <h2 className="text-4xl lg:text-5xl font-medium text-gray-900 mb-6">
              {heading}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Launch key placeholder */}
          <div className="hidden lg:block">
            <div className="border border-dashed border-gray-300 rounded px-6 py-4 text-xs text-gray-400">
              Launch key
            </div>
          </div>
        </div>

        {/* Two cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Card 1 - Warm off-white background */}
          <div className="rounded-2xl p-16 lg:p-32" style={{ backgroundColor: 'rgb(245, 243, 241)' }}>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Custom pricing based on your needs
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              Get started with Kenstera Agents featuring enterprise-grade FDE deployment, global language readiness, and rapid integration support.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="/contact-sales"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-gray-900 hover:text-gray-600 transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>

          {/* Card 2 - White with border */}
          <div className="border border-gray-200 rounded-2xl p-16 lg:p-32">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Dedicated onboarding and support
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              Our team will guide you through setup, integration, and optimization to ensure your Conversational Agent delivers maximum value from day one.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="/contact-sales"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/contact-sales"
                className="text-sm text-gray-900 hover:text-gray-600 transition-colors"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom dotted line */}
        <div className="border-t-2 border-dotted border-gray-300" />
      </div>
    </section>
  );
}

export default IndustriesGettingStarted;
