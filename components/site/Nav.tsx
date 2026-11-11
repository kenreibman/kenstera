"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow, Wordmark } from "@/components/brand/Leaf";
import { BOOKING_HREF } from "@/content/site";

const LINKS = [
  { href: "/#systems", label: "Systems" },
  { href: "/#planner", label: "Planner" },
  { href: "/#proof", label: "Proof" },
  { href: "/#method", label: "Method" },
  { href: "/services", label: "Services" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  // Hide on scroll down, return on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) setHidden(false);
      else if (y > last.current + 6) setHidden(true);
      else if (y < last.current - 6) setHidden(false);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <header
        className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] sm:px-5 sm:pt-4 ${
          hidden && !open ? "-translate-y-[120%]" : ""
        }`}
      >
        <div className="nav-pill mx-auto flex h-14 max-w-[1320px] items-center justify-between rounded-full pl-5 pr-2 text-paper">
          <Link href="/" aria-label="Kenstera home" onClick={() => setOpen(false)}>
            <Wordmark className="text-[17px]" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link text-[14px] text-paper/80 transition-colors hover:text-paper">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href={BOOKING_HREF} className="btn btn-lime !min-h-10 !px-5 !text-[14px]">
              Book a call <Arrow />
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-paper/15 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 h-px w-4 bg-paper transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0.5"}`} />
                <span className={`absolute left-0 h-px w-4 bg-paper transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
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
        className="fixed inset-0 z-40 flex flex-col bg-ink/95 px-6 pb-8 pt-28 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="display fade-up flex items-baseline justify-between border-b border-paper/10 py-4 text-[11vw] text-paper sm:text-6xl"
              style={{ ["--d" as string]: `${i * 0.05}s` }}
            >
              {l.label}
              <span className="label text-sage">0{i + 1}</span>
            </Link>
          ))}
        </nav>
        <Link href={BOOKING_HREF} onClick={() => setOpen(false)} className="btn btn-lime mt-8 w-full">
          Book a 15-minute call <Arrow />
        </Link>
      </div>
    </>
  );
}
