import Link from "next/link";
import { Leaf } from "@/components/brand/Leaf";
import { BOOKING_HREF, CONTACT_EMAIL } from "@/content/site";

const NAV = [
  { label: "Systems", href: "/#systems" },
  { label: "Planner", href: "/#planner" },
  { label: "Proof", href: "/#proof" },
  { label: "Method", href: "/#method" },
  { label: "Services", href: "/services" },
  { label: "Book a call", href: BOOKING_HREF },
];

const LEGAL = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

export function Footer() {
  return (
    <footer className="relative z-[1] overflow-hidden bg-ink/80 text-paper backdrop-blur-md">
      <div className="wrap rule-dark grid gap-12 pb-10 pt-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="display max-w-[14ch] text-4xl sm:text-5xl">
            Grown to order. <em className="text-lime">Tended</em> for good.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="label mb-5 text-sage">Explore</p>
          <ul className="space-y-3">
            {NAV.map((n) => (
              <li key={n.label}>
                <Link href={n.href} className="nav-link text-[15px] text-paper/85 hover:text-paper">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="label mb-5 text-sage">Say hello</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="nav-link display text-2xl sm:text-3xl">
            {CONTACT_EMAIL}
          </a>
          <ul className="mt-6 flex gap-5 text-[15px] text-paper/85">
            <li>
              <a className="nav-link" href="https://www.instagram.com/kenstera.co/" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a className="nav-link" href="https://www.facebook.com/people/Kenstera/61586497872271/" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Giant wordmark, rising as the page ends */}
      <div className="wrap pointer-events-none select-none" aria-hidden="true">
        <div className="wordmark-rise flex items-end justify-between gap-4">
          <span
            className="display block text-[23.5vw] leading-[0.78] text-paper/[0.07] xl:text-[310px]"
            style={{ fontVariationSettings: '"SOFT" 100, "WONK" 0' }}
          >
            Kenstera
          </span>
          <Leaf veins className="mb-[2vw] hidden w-[11vw] max-w-[150px] rotate-12 text-lime/25 sm:block" />
        </div>
      </div>

      <div className="wrap flex flex-col gap-4 pb-8 pt-6 text-[13px] text-sage sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Kenstera LLC</p>
        <ul className="flex gap-6">
          {LEGAL.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="nav-link hover:text-paper">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
