"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight, Sparkles, Bot, FileText, DollarSign } from "lucide-react";

// Dropdown menu data
const servicesDropdown = {
  columns: [
    {
      title: "Services",
      items: [
        {
          title: "AI Intake Systems",
          description: "24/7 lead qualification and booking",
          href: "/intake"
        },
        {
          title: "Marketing Automation",
          description: "Automated campaigns that convert",
          href: "/services/marketing"
        },
        {
          title: "Customer Support AI",
          description: "Instant responses, happy customers",
          href: "/services/support"
        },
      ]
    },
    {
      title: "Industries",
      items: [
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
    title: "AI Intake for PI Firms",
    description: "Get 30 qualified leads per month",
    href: "/intake-1"
  }
};

const navItems = [
  {
    href: "/services",
    label: "Services",
    hasDropdown: true,
    dropdown: servicesDropdown
  },
  { href: "/intake", label: "AI Intake" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
];

// Dropdown component
function NavDropdown({ dropdown }: { dropdown: typeof servicesDropdown }) {
  return (
    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 min-w-[600px]">
        {/* Columns */}
        <div className="flex gap-12">
          {dropdown.columns.map((column, idx) => (
            <div key={idx} className="flex-1">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">
                {column.title}
              </p>
              <div className="space-y-1">
                {column.items.map((item, itemIdx) => (
                  <Link
                    key={itemIdx}
                    href={item.href}
                    className="block px-3 py-2.5 -mx-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <p className="text-[14px] font-medium text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-[13px] text-gray-500">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Featured */}
        {dropdown.featured && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <Link
              href={dropdown.featured.href}
              className="flex items-center gap-4 p-3 -mx-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center">
                <dropdown.featured.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[14px] font-medium text-gray-900">
                  {dropdown.featured.title}
                </p>
                <p className="text-[13px] text-gray-500">
                  {dropdown.featured.description}
                </p>
              </div>
            </Link>
          </div>
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
      <div>
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full px-6 py-3.5 text-[15px] text-gray-900 font-medium transition-colors hover:bg-gray-50"
        >
          {item.label}
          <ChevronRight
            className={`w-4 h-4 text-gray-300 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
          />
        </button>
        {isExpanded && (
          <div className="py-2 space-y-1 px-6 bg-gray-50">
            {item.dropdown.columns.map((column, colIdx) => (
              <div key={colIdx} className="mb-2">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                  {column.title}
                </p>
                {column.items.map((subItem, subIdx) => (
                  <Link
                    key={subIdx}
                    href={subItem.href}
                    onClick={onClose}
                    className="block py-2 text-[14px] text-gray-600 hover:text-black transition-colors"
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
                className="flex items-center gap-2 py-2 text-[14px] text-sky-600 font-medium hover:text-sky-700 transition-colors"
              >
                <item.dropdown.featured.icon className="w-4 h-4" />
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
      className="flex items-center justify-between px-6 py-3.5 text-[15px] text-gray-900 font-medium transition-colors hover:bg-gray-50"
    >
      {item.label}
      <ChevronRight className="w-4 h-4 text-gray-300" />
    </Link>
  );
}

export function MainNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Don't hide nav if mobile menu is open
      if (mobileMenuOpen) {
        setIsVisible(true);
        return;
      }

      // Show nav when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide on scroll down, show on scroll up
      else if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  const toggleExpanded = (href: string) => {
    setExpandedItem(expandedItem === href ? null : href);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setExpandedItem(null);
  };

  return (
    <>
    <header
      className={`main-navigation sticky top-0 z-50 bg-white border-b border-gray-100 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex gap-8 mx-auto h-14 max-w-[1200px] items-center px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-lg font-bold text-black">
            Kenstera
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className="flex items-center gap-1 px-3 py-2 text-[14px] text-gray-600 transition-colors hover:text-black rounded-lg hover:bg-gray-50"
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-transform group-hover:rotate-180" />
                )}
              </Link>
              {item.hasDropdown && item.dropdown && (
                <NavDropdown dropdown={item.dropdown} />
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Right - Auth */}
        <div className="ml-auto hidden items-center gap-4 md:flex">
          <Link
            href="/contact-sales"
            className="px-4 py-2 text-[14px] font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="ml-auto flex items-center gap-3 md:hidden">
          <Link
            href="/contact-sales"
            className="px-4 py-1.5 text-[13px] font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
          >
            Contact Us
          </Link>
          <button
            onClick={() => mobileMenuOpen ? closeMobileMenu() : setMobileMenuOpen(true)}
            className="flex h-9 w-9 items-center justify-center"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-black" />
            ) : (
              <Menu className="h-5 w-5 text-black" />
            )}
          </button>
        </div>
      </div>

      </header>

      {/* Mobile Dropdown Menu - Outside header to avoid stacking issues */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 md:hidden z-40"
            onClick={closeMobileMenu}
          />
          {/* Menu Panel - Full height */}
          <div className="fixed top-14 left-0 right-0 bottom-0 bg-white md:hidden z-50 flex flex-col overflow-hidden">
            <nav className="flex flex-col py-4 flex-1 overflow-y-auto">
              {navItems.map((item) => (
                <MobileNavItem
                  key={item.href}
                  item={item}
                  isExpanded={expandedItem === item.href}
                  onToggle={() => toggleExpanded(item.href)}
                  onClose={closeMobileMenu}
                />
              ))}
            </nav>
            <div className="px-6 py-6 border-t border-gray-100 flex gap-3 mt-auto">
              <Link
                href="/contact-sales"
                onClick={closeMobileMenu}
                className="flex-1 text-center px-4 py-3.5 text-[14px] font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
