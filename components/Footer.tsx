import Link from "next/link";

const nav = [
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact Us", href: "/contact-sales" },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

export function Footer() {
  return (
    <footer className="main-footer border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-20">
        {/* Top */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="text-lg font-bold text-black">
              Kenstera
            </Link>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <div className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-400">
              Navigation
            </div>
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[14px] text-gray-600 transition-colors hover:text-black"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <div className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-400">
              Contact
            </div>
            <div className="space-y-3">
              <a
                href="mailto:info@kenstera.com"
                className="text-[14px] text-gray-600 transition-colors hover:text-black"
              >
                info@kenstera.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-gray-100 pt-8 md:flex-row md:items-center">
          <div className="text-xs text-gray-400">
            © {new Date().getFullYear()} Kenstera LLC
          </div>

          <ul className="flex flex-wrap gap-6">
            {legal.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-xs text-gray-500 transition-colors hover:text-black"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
