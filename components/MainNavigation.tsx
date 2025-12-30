"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#case-studies", label: "Studies" },
  { href: "#pricing", label: "Pricing" },
];

export function MainNavigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-6">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-semibold text-black">
            Kenstera
          </span>
        </Link>

        {/* Nav + CTA */}
        <nav className="flex items-center gap-6 md:gap-8">
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg font-large text-black transition-colors hover:text-black/70"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
