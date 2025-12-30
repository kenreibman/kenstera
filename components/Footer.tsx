"use client";

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
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20">
        {/* Top */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="text-2xl tracking-tight text-black">
              Kenstera
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <div className="mb-4 text-xs uppercase tracking-widest text-black/50">
              Navigation
            </div>
            <ul className="space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-black/70 hover:text-black"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <div className="mb-4 text-xs uppercase tracking-widest text-black/50">
              Contact
            </div>

            <div className="space-y-3 text-sm text-black/70">
              <div>
                <a
                  href="mailto:info@kenstera.com"
                  className="hover:text-black"
                >
                  info@kenstera.com
                </a>
              </div>
              <div>
                <a href="tel:+19293579256" className="hover:text-black">
                  +1 (929) 357-9256
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-black/10 pt-8 md:flex-row md:items-center">
          <div className="pt-2 text-xs text-black/50">
            © {new Date().getFullYear()} Kenstera LLC
          </div>

          <ul className="flex flex-wrap gap-6 text-xs">
            {legal.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-black/60 hover:text-black"
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
