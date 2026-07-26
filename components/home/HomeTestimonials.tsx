const TESTIMONIALS = [
  {
    quote:
      "Kenstera rebuilt our website and booking requests tripled in two months. It finally feels like us.",
    name: "Maya R.",
    role: "Boutique Studio Owner",
  },
  {
    quote:
      "The automations they set up quietly handle the busywork that used to eat my evenings. I got my time back.",
    name: "Devin K.",
    role: "Agency Founder",
  },
  {
    quote:
      "Their marketing systems gave us a pipeline we can actually predict. Leads stopped being luck.",
    name: "Priya S.",
    role: "SaaS Co-founder",
  },
  {
    quote:
      "We went from a dead landing page to a system that compounds. Revenue is up 40% since launch.",
    name: "Marcus L.",
    role: "E-commerce Director",
  },
];

export function HomeTestimonials() {
  return (
    <section id="testimonials" className="relative py-20 md:py-28">
      {/* Dotted line separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,#e5e7eb_4px,#e5e7eb_8px)]" />

      <div className="w-full max-w-7xl mx-auto px-5">
        <div
          className="rounded-3xl p-8 md:p-14"
          style={{ backgroundColor: "rgb(245, 243, 241)" }}
        >
          {/* Label */}
          <p className="text-sm font-medium text-gray-900 mb-4">
            What Clients Say
          </p>

          <h2 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] tracking-tight text-gray-900 mb-14">
            Testimonials
          </h2>

          {/* Newspaper-style columns, each opening under its own rule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
            {TESTIMONIALS.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="border-t border-gray-300 pt-6 flex flex-col h-full"
              >
                <blockquote className="text-base md:text-lg font-medium leading-relaxed text-gray-900 flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="block font-semibold text-gray-900">
                    {testimonial.name}
                  </span>
                  <span className="block text-gray-500">
                    {testimonial.role}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeTestimonials;
