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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-6">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold text-white">
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
                className="text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* “Book a call” button */}
          <Button
            asChild
            className="
            bg-violet-400
              px-4 py-2
              rounded-none
              text-sm
              font-semibold
              text-primary
            hover:bg-violet-500
              transition-colors
            "
          >
            <Link
              href="https://cal.com/kenstera/15min"
              target="_blank"
            >
              Book a call
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
