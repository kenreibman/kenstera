"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight, Sparkles } from "lucide-react";
import { buttonClass } from "@/components/el/ui";

// Dropdown menu data (unchanged from the live site)
const servicesDropdown = {
  columns: [
    {
      title: "Services",
      items: [
        {
          title: "Intake and Scheduling",
          description: "24/7 lead qualification and booking",
          href: "/services/intake-and-scheduling"
        },
        {
          title: "Intake for Law Firms",
          description: "Automated intake built for legal practices",
          href: "/intake"
        },
        {
          title: "Custom Development",
          description: "Website, Software, Integrations & More.",
          href: "/services/custom-development"
        },
        {
          title: "Support Automation",
          description: "Instant responses, happy customers",
          href: "/services/support-automation"
        },
      ]
    },
    {
      title: "Industries",
      items: [
        {
          title: "HVAC",
          description: "Missed calls and Google reviews",
          href: "/hvac"
        },
        {
          title: "Law Firms",
          description: "PI, family law, criminal defense",
          href: "/industries/law"
        },
        {
          title: "Healthcare",
          description: "Patient intake and scheduling",
          href: "/industries/healthcare"
        },
        {
          title: "Real Estate",
          description: "Lead capture and nurturing",
          href: "/industries/real-estate"
        },
      ]
    },
  ],
  featured: {
    icon: Sparkles,
    title: "After-Hours Intake for Personal Injury Firms",
    description: "Get leads and book consultations 24/7.",
    href: "/industries/law"
  }
};

const navItems = [
  {
    href: "/services",
    label: "Services",
    hasDropdown: true,
    dropdown: servicesDropdown
  },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/pricing", label: "Pricing" },
  { href: "/team", label: "Team" },
];

function Wordmark() {
  return <span className="text-[19px] font-semibold tracking-[-0.03em] text-black">Kenstera</span>;
}

// Desktop mega-menu panel, styled like the elevenlabs.io product menu.
function NavDropdown({ dropdown }: { dropdown: typeof servicesDropdown }) {
  return (
    // focus-within keeps the menu open while keyboard focus moves through its
    // links; without it, `invisible` removes them from the tab order entirely.
    <div className="invisible absolute -left-3 top-full pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
      <div className="ring-hairline w-[640px] rounded-2xl bg-white p-2 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.18)]">
        <div className="grid grid-cols-2 gap-1">
          {dropdown.columns.map((column) => (
            <div key={column.title} className="p-3">
              <p className="mb-2 px-3 text-[13px] text-subtle">{column.title}</p>
              <div>
                {column.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-surface"
                  >
                    <p className="text-[14px] text-black">{item.title}</p>
                    <p className="text-[13px] text-subtle">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {dropdown.featured && (
          <Link
            href={dropdown.featured.href}
            className="m-1 flex items-center gap-4 rounded-xl bg-surface p-4 transition-colors hover:bg-surface-2"
          >
            <span className="grad g-ember h-10 w-10 flex-none rounded-lg" aria-hidden="true" />
            <span>
              <span className="block text-[14px] text-black">{dropdown.featured.title}</span>
              <span className="block text-[13px] text-subtle">{dropdown.featured.description}</span>
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

// Mobile nav item with expandable dropdown
function MobileNavItem({
  item,
  isExpanded,
  onToggle,
  onClose
}: {
  item: typeof navItems[0];
  isExpanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  if (item.hasDropdown && item.dropdown) {
    return (
      <div className="border-b border-hairline">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          className="flex w-full items-center justify-between py-4 text-[17px] text-black"
        >
          {item.label}
          <ChevronDown
            className={`h-4 w-4 text-subtle transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>
        {isExpanded && (
          <div className="pb-4">
            {item.dropdown.columns.map((column) => (
              <div key={column.title} className="mb-3">
                <p className="mb-1 text-[13px] text-subtle">{column.title}</p>
                {column.items.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    onClick={onClose}
                    className="block py-2 text-[15px] text-black/80 hover:text-black"
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            ))}
            {item.dropdown.featured && (
              <Link
                href={item.dropdown.featured.href}
                onClick={onClose}
                className="mt-1 flex items-center gap-3 rounded-xl bg-surface p-3 text-[14px] text-black"
              >
                <span className="grad g-ember h-7 w-7 flex-none rounded-md" aria-hidden="true" />
                {item.dropdown.featured.title}
              </Link>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onClose}
      className="flex items-center justify-between border-b border-hairline py-4 text-[17px] text-black"
    >
      {item.label}
      <ChevronRight className="h-4 w-4 text-subtle" />
    </Link>
  );
}

export function MainNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the mobile menu, and the page behind it must not scroll.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setExpandedItem(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setExpandedItem(null);
  };

  return (
    <>
      <header
        className={`main-navigation sticky top-0 z-50 bg-page/90 backdrop-blur-md transition-shadow ${
          scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.06)]" : ""
        }`}
      >
        <div className="mx-5 flex h-16 max-w-[1178px] items-center min-[1218px]:mx-auto">
          <Link href="/" className="-mx-3 flex h-9 items-center rounded-full px-3 transition-colors duration-150 hover:bg-black/5" aria-label="Kenstera home">
            <Wordmark />
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Primary" className="ml-9 hidden items-center gap-x-7 md:flex xl:gap-x-9">
            {navItems.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="-mx-3 flex h-9 items-center gap-1 rounded-full px-3 text-[18px] text-black transition-colors duration-150 hover:bg-black/5"
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown className="h-3.5 w-3.5 text-subtle transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                {item.hasDropdown && item.dropdown && <NavDropdown dropdown={item.dropdown} />}
              </div>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="ml-auto hidden items-center gap-2 md:flex">
            <Link href="/contact" className={buttonClass("primary")}>
              Contact Us
            </Link>
          </div>

          {/* Mobile */}
          <div className="ml-auto flex items-center gap-2 md:hidden">
            <Link href="/contact" className={buttonClass("primary")}>
              Contact Us
            </Link>
            <button
              type="button"
              onClick={() => (mobileMenuOpen ? closeMobileMenu() : setMobileMenuOpen(true))}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed bottom-0 left-0 right-0 top-16 z-50 flex flex-col bg-page md:hidden"
        >
          <nav className="flex-1 overflow-y-auto px-5">
            {navItems.map((item) => (
              <MobileNavItem
                key={item.href}
                item={item}
                isExpanded={expandedItem === item.href}
                onToggle={() => setExpandedItem(expandedItem === item.href ? null : item.href)}
                onClose={closeMobileMenu}
              />
            ))}
          </nav>
          <div className="border-t border-hairline p-5">
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className={`${buttonClass("primary", "md")} w-full`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
