"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export function MainNavigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-6">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="../logo-main.svg"
            width={30}
            height={30}
            alt=""
          />
          <span className="text-2xl font-semibold text-black">
            Kenstera
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-black/80 transition-colors hover:text-black"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-2 rounded-full px-5">
            <Link href="#contact">Book a Call</Link>
          </Button>
        </nav>

        {/* Mobile Nav */}
        <div className="flex items-center gap-3 md:hidden">
          <Button asChild size="sm" variant="default" className="rounded-full px-4 text-sm">
            <Link href="#contact">Book a Call</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition-colors hover:bg-black/5"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 text-black" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-white">
              <SheetHeader className="border-b border-black/5 pb-4">
                <SheetTitle className="text-left text-lg font-semibold">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 pt-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center rounded-lg px-3 py-3 text-[16px] font-medium text-black/80 transition-colors hover:bg-black/5 hover:text-black"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-6 border-t border-black/5 pt-6">
                <SheetClose asChild>
                  <Button asChild className="w-full rounded-full">
                    <Link href="#contact">Book a Call</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
