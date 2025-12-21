"use client";

import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Mail } from "lucide-react";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Work", href: "/work" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Design", href: "/services/web-design" },
      { label: "Development", href: "/services/development" },
      { label: "Brand Systems", href: "/services/brand" },
      { label: "SEO & Performance", href: "/services/seo" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com", icon: Instagram },
  { label: "Email", href: "mailto:hello@kenstera.com", icon: Mail },
];

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={href}
        className="group inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        <span className="relative">
          {children}
          <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-white/60 transition-all duration-300 group-hover:w-full" />
        </span>
        <ArrowUpRight className="h-4 w-4 opacity-60 transition group-hover:opacity-100" />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
    >
      <span className="relative">
        {children}
        <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-white/60 transition-all duration-300 group-hover:w-full" />
      </span>
      <ArrowUpRight className="h-4 w-4 opacity-60 transition group-hover:opacity-100" />
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* pure black fade that visually “sinks” into the footer */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-black" />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-start justify-between gap-6">
              <div>
                <Link href="/" className="inline-flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center bg-white/10 ring-1 ring-white/15">
                    <span className="text-sm font-semibold tracking-tight">K</span>
                  </div>
                  <span className="text-lg font-semibold tracking-tight">
                    Kenstera
                  </span>
                </Link>

                <p className="mt-5 max-w-md text-sm leading-6 text-white/60">
                  A design and development studio building modern websites that
                  convert—fast, scalable, and obsessively polished.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                  >
                    Start a project
                  </Link>
                  <a
                    href="mailto:hello@kenstera.com"
                    className="inline-flex items-center justify-center bg-white/0 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/5"
                  >
                    hello@kenstera.com
                  </a>
                </div>
              </div>

              <Link
                href="#top"
                className="hidden shrink-0 bg-white/0 p-3 ring-1 ring-white/15 transition hover:bg-white/5 lg:inline-flex"
                aria-label="Back to top"
              >
                <ArrowUpRight className="h-5 w-5 rotate-[-45deg]" />
              </Link>
            </div>

            {/* Social row */}
            <div className="mt-10 flex flex-wrap gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group inline-flex items-center gap-2 bg-white/0 px-4 py-2 text-sm text-white/70 ring-1 ring-white/15 transition hover:bg-white/5 hover:text-white"
                  >
                    <Icon className="h-4 w-4 opacity-70 transition group-hover:opacity-100" />
                    {s.label}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-7">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {footerLinks.map((col) => (
                <div key={col.title}>
                  <div className="text-xs font-semibold tracking-[0.22em] text-white/50 uppercase">
                    {col.title}
                  </div>
                  <ul className="mt-5 space-y-3">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <FooterLink href={l.href}>{l.label}</FooterLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-white/55">
              © {year} Kenstera. All rights reserved.
            </div>

            <div className="flex flex-wrap gap-6">
              <Link
                href="/privacy"
                className="text-sm font-medium text-white/60 transition hover:text-white"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm font-medium text-white/60 transition hover:text-white"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-sm font-medium text-white/60 transition hover:text-white"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
