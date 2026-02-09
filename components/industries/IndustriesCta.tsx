import Link from "next/link";

interface IndustriesCtaProps {
  heading?: string;
}

export function IndustriesCta({
  heading = "The most realistic voice AI platform",
}: IndustriesCtaProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Dotted border top */}
        <div className="border-t-2 border-dotted border-gray-300" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-16 gap-8">
          <h2 className="text-2xl lg:text-3xl font-medium text-gray-900">
            {heading}
          </h2>

          <div className="flex items-center gap-3">
            <Link
              href="/contact-sales"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 text-sm font-medium text-gray-900 rounded-full hover:bg-gray-50 transition-colors"
            >
              Talk to sales
            </Link>
            <Link
              href="/contact-sales"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
            >
              Create an AI agent
            </Link>
          </div>
        </div>

        {/* Dotted border bottom */}
        <div className="border-t-2 border-dotted border-gray-300" />
      </div>
    </section>
  );
}

export default IndustriesCta;
