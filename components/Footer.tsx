import Link from "next/link";

const nav = [
  { label: "About", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Services", href: "#" },
  { label: "Contact", href: "#" },
];

const legal = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export function Footer() {
  return (
    <footer className="main-footer border-t border-black/10 bg-black">
      <div className="mx-auto max-w-7xl px-5 py-20">
        {/* Top */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="text-2xl tracking-tight text-white">
              Kenstera
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <div className="mb-4 text-xs uppercase tracking-widest text-white">
              Navigation
            </div>
            <ul className="space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <div className="mb-4 text-xs uppercase tracking-widest text-white">
              Contact
            </div>

            <div className="space-y-3 text-sm text-white">
              <div>
                <a
                  href="mailto:info@kenstera.com"
                  className="hover:text-white"
                >
                  info@kenstera.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-black/10 pt-8 md:flex-row md:items-center">
          <div className="pt-2 text-xs text-white">
            © {new Date().getFullYear()} Kenstera LLC
          </div>

          <ul className="flex flex-wrap gap-6 text-xs">
            {legal.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-white hover:text-white"
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
