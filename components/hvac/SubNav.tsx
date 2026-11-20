"use client";

import { useEffect, useState } from "react";
import { buttonClass } from "@/components/el/ui";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#what", label: "What you get" },
  { href: "#compare", label: "Before and after" },
  { href: "#faq", label: "FAQ" },
];

/**
 * Product sub-nav, as on elevenlabs.io product pages: a cream tray that hangs under the header inside
 * the frame, plain gray tabs with the current section shown as a white pill, and a black pill at the right.
 */
export function SubNav({ href, label }: { href: string; label: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    // The current section is the last one whose top has passed 40% of the viewport.
    const update = () => {
      let current: string | null = null;
      for (const l of LINKS) {
        const el = document.querySelector(l.href);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = l.href;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="sticky top-16 z-30">
      <div className="mx-5 max-w-[1178px] min-[1218px]:mx-auto">
        <div className="flex h-16 items-center justify-between gap-6 rounded-b-2xl border border-t-0 border-[#e5e5e5] bg-surface/95 px-3 backdrop-blur-md sm:px-4">
          <span className="flex items-center gap-2.5 pl-1 text-[15px] text-black">
            <span className="grad g-ember inline-block h-6 w-6 rounded-md" aria-hidden="true" />
            Kenstera for HVAC
          </span>
          <nav aria-label="On this page" className="flex items-center gap-2">
            <ul className="hidden items-center gap-1 md:flex">
              {LINKS.map((l) => {
                const on = active === l.href;
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      aria-current={on ? "true" : undefined}
                      className={`inline-flex h-10 items-center rounded-full px-4 text-[15px] transition-[background-color,color,box-shadow] duration-150 ${
                        on
                          ? "bg-white text-black shadow-[0_0_0_0.5px_rgba(0,0,0,0.125)]"
                          : "text-[#59544f] hover:text-black"
                      }`}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <span className="hidden sm:block">
              <a href={href} className={buttonClass("primary", "md")}>
                {label}
              </a>
            </span>
          </nav>
        </div>
      </div>
    </div>
  );
}
