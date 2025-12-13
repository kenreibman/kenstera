"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export function MainNavigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold text-white">Kenstera</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "text-sm font-medium transition-colors",
                    active ? "text-white" : "text-white/70 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              asChild
              className="rounded-full bg-violet-400 px-4 py-2 text-sm font-semibold text-black hover:bg-violet-500 transition-colors"
            >
              <Link href="https://cal.com/kenstera/15min" target="_blank">
                Book a call
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full border-white/15 bg-black/60 px-3 text-white hover:bg-white/5"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-full max-w-sm border-white/10 bg-neutral-950 text-white"
              >
                <SheetHeader>
                  <SheetTitle className="text-white">Menu</SheetTitle>
                </SheetHeader>

                <div className="mt-6 flex flex-col gap-2">
                  {navItems.map((item) => {
                    const active = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={[
                          "rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                          active
                            ? "border-white/20 bg-white/10 text-white"
                            : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white",
                        ].join(" ")}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-6">
                  <Button
                    asChild
                    className="w-full rounded-full bg-violet-400 text-black hover:bg-violet-500 transition-colors"
                  >
                    <Link href="https://cal.com/kenstera/15min" target="_blank">
                      Book a call
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
