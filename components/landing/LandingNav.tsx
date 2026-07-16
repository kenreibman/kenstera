"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

// Minimal, dark-themed nav for the immersive landing page. Sits fixed over the
// hero (which is position:fixed z-0/z-10), so it needs a high z-index and
// pointer-events. Kept intentionally light-touch: logo + a few links out to the
// rest of the site, so the landing stays cinematic while remaining navigable.
const LINKS = [
  { label: "Law Firms", href: "/intake" },
];

export default function LandingNav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
      <div className="mx-auto flex h-16 max-w-[1250px] items-center justify-between px-5 md:px-8 pointer-events-auto">
        {/* Logo */}
        <Link
          href="/"
          className="text-white font-sans font-semibold text-lg tracking-tight hover:opacity-80 transition-opacity"
        >
          Kenstera
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-sans text-sm text-white/70 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact-sales"
            className="font-sans text-sm font-semibold text-black bg-white rounded-full px-5 py-2 hover:bg-white/80 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex h-10 w-10 items-center justify-center text-white"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden fixed inset-0 top-16 z-[100] bg-black/95 backdrop-blur-md pointer-events-auto flex flex-col px-6 py-8 gap-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-sans text-white text-lg py-3 border-b border-white/10"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact-sales"
            onClick={() => setOpen(false)}
            className="mt-4 text-center font-sans font-semibold text-black bg-white rounded-full px-5 py-3.5 hover:bg-white/80 transition-colors"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
