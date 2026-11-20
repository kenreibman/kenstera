import Link from "next/link";
import { BlockSection } from "@/components/exact";

const columns = [
  {
    title: "Navigation",
    links: [
      { label: "Services", href: "/services" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Facebook", href: "https://www.facebook.com/people/Kenstera/61586497872271/" },
      { label: "Instagram", href: "https://www.instagram.com/kenstera.co/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "info@kenstera.com", href: "mailto:info@kenstera.com" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

const LINK =
  "block w-fit rounded px-1.5 py-[9px] -mx-1.5 text-[14px] font-medium leading-[10px] text-black outline-none transition-colors duration-150 hover:text-subtle focus-visible:ring-2 focus-visible:ring-black/30";

/**
 * Footer in the exact elevenlabs.io layout: 12-column grid, wordmark in columns 1-3, link groups
 * in columns 4-12 (13px gray label, 14px/500 black links with 28px rows), inside the section frame.
 */
export function Footer() {
  return (
    <footer className="main-footer bg-page">
      <BlockSection className="px-3 py-20 lg:py-[120px]">
        <div className="grid grid-cols-12 gap-x-3 gap-y-16">
          <div className="col-span-12 px-5 lg:col-span-3">
            <Link
              href="/"
              className="-m-2 block w-fit rounded p-2 text-[19px] font-semibold tracking-[-0.03em] text-black"
            >
              Kenstera
            </Link>
          </div>

          <ul className="col-span-12 grid grid-cols-12 gap-x-3 gap-y-10 lg:col-span-9">
            {columns.map((col) => (
              <li key={col.title} className="col-span-6 px-5 sm:col-span-4 lg:col-span-3">
                <p className="-mt-[9px] py-[9px] text-[13px] font-medium leading-[10px] text-subtle">{col.title}</p>
                <ul className="mt-[3px]">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith("http") ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className={LINK}>
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-16 px-5 text-[13px] text-subtle">© {new Date().getFullYear()} Kenstera LLC</p>
      </BlockSection>
    </footer>
  );
}
