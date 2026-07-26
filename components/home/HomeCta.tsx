import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HomeCta() {
  return (
    <section id="contact" className="relative py-20">
      <div className="w-full max-w-7xl mx-auto px-5">
        <div
          className="relative rounded-3xl overflow-hidden p-10 sm:p-14 md:p-16 lg:p-20"
          style={{ backgroundColor: "#0a1628" }}
        >
          {/* Aurora gradient blob */}
          <div
            className="absolute inset-0 opacity-70 pointer-events-none"
            aria-hidden="true"
          >
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

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <p className="text-sm font-medium text-white/60 mb-6">
                Get in Touch
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] max-w-2xl">
                Let&rsquo;s grow your business
              </h2>
            </div>

            <div className="flex flex-col items-start gap-4 shrink-0">
              <Link
                href="/contact-sales"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-gray-900 font-semibold text-sm hover:bg-white/90 transition-colors"
              >
                Contact us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:info@kenstera.com"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                or email info@kenstera.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeCta;
