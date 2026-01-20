import Link from "next/link";

export function PricingCTA() {
  return (
    <section className="mt-20 border-t border-neutral-200 pt-16 sm:mt-28 sm:pt-20">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Ready to accelerate your business?
        </h2>
        <Link
          href="/contact-sales"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
