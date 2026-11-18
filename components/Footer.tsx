import Link from "next/link";
import { Container } from "@/components/el/ui";

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

export function Footer() {
  return (
    <footer className="main-footer border-t border-hairline bg-page">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="text-[19px] font-semibold tracking-[-0.03em] text-black">
              Kenstera
            </Link>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="md:col-span-2 md:last:col-span-3">
              <p className="mb-4 text-[13px] text-subtle">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("http") ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] text-black/80 transition-colors hover:text-black"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="text-[14px] text-black/80 transition-colors hover:text-black">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-hairline py-6 text-[13px] text-subtle">
          © {new Date().getFullYear()} Kenstera LLC
        </div>
      </Container>
    </footer>
  );
}
