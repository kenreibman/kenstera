import Link from "next/link";
import { Wordmark } from "@/components/brand/Leaf";
import { BOOKING_HREF, CONTACT_EMAIL } from "@/content/site";

const LINKS = [
  { label: "What we do", href: "/#systems" },
  { label: "Planner", href: "/#planner" },
  { label: "How it works", href: "/#method" },
  { label: "Services", href: "/services" },
  { label: "Book a call", href: BOOKING_HREF },
  { label: "Instagram", href: "https://www.instagram.com/kenstera.co/" },
  { label: "Facebook", href: "https://www.facebook.com/people/Kenstera/61586497872271/" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

export function Footer() {
  return (
    <footer className="relative z-[1] bg-ink text-[13px] text-sage">
      <div className="wrap flex flex-col gap-8 py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Wordmark className="text-[17px] text-paper" />
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-paper hover:underline">
            {CONTACT_EMAIL}
          </a>
        </div>
        <ul className="flex flex-wrap gap-x-7 gap-y-1">
          {LINKS.map((l) => (
            <li key={l.label}>
              {l.href.startsWith("http") ? (
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center hover:text-paper">
                  {l.label}
                </a>
              ) : (
                <Link href={l.href} className="inline-flex min-h-9 items-center hover:text-paper">
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <p>© {new Date().getFullYear()} Kenstera LLC</p>
      </div>
    </footer>
  );
}
