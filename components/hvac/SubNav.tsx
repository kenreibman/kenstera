import { buttonClass } from "@/components/el/ui";

/** Product sub-nav under the main nav, as on elevenlabs.io product pages. */
export function SubNav({ href, label }: { href: string; label: string }) {
  const links = [
    { href: "#how", label: "How it works" },
    { href: "#what", label: "What you get" },
    { href: "#compare", label: "Before and after" },
    { href: "#faq", label: "FAQ" },
  ];
  return (
    <div className="sticky top-16 z-30 border-b border-hairline bg-page/90 backdrop-blur-md">
      <div className="mx-5 flex h-14 max-w-[1178px] items-center justify-between gap-6 min-[1218px]:mx-auto">
        <span className="flex items-center gap-2.5 text-[15px] text-black">
          <span className="grad g-ember inline-block h-6 w-6 rounded-md" aria-hidden="true" />
          Kenstera for HVAC
        </span>
        <nav className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[15px] text-black/80 transition-colors hover:text-black">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="hidden sm:block">
            <a href={href} className={buttonClass("primary", "sm")}>
              {label}
            </a>
          </span>
        </nav>
      </div>
    </div>
  );
}
