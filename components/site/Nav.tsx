"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/Leaf";
import { BOOKING_HREF } from "@/content/site";

const LINKS = [
  { href: "/#systems", label: "What we do" },
  { href: "/#planner", label: "Planner" },
  { href: "/#method", label: "How it works" },
  { href: "/services", label: "Services" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="nav-bar fixed inset-x-0 top-0 z-50 text-paper">
        <div className="wrap flex h-14 items-center justify-between">
          <Link href="/" aria-label="Kenstera home" onClick={() => setOpen(false)}>
            <Wordmark className="text-[17px]" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-[13px] text-paper/80 transition-colors hover:text-paper">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link href={BOOKING_HREF} className="btn btn-lime !min-h-9 !px-4 !text-[13px]">
              Book a call
            </Link>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 h-[1.5px] w-5 bg-paper transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0.5"}`} />
                <span className={`absolute left-0 h-[1.5px] w-5 bg-paper transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        hidden={!open}
        className="fixed inset-0 z-40 bg-ink px-[var(--gutter)] pt-24 md:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="display fade-up py-3 text-[2rem] text-paper"
              style={{ ["--d" as string]: `${i * 0.04}s` }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
