"use client";

import { useEffect, useState } from "react";

/**
 * Phone-only booking button that slides up after the hero and tucks away once
 * the closing call-to-action is on screen. Owners read this page in a truck,
 * so the next step should always be one thumb away.
 */
export function StickyCta({ href, label }: { href: string; label: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let pastHero = false;
    let bookVisible = false;
    const update = () => setShow(pastHero && !bookVisible);
    const onScroll = () => {
      pastHero = window.scrollY > 520;
      update();
    };
    const target = document.getElementById("book");
    const io = new IntersectionObserver(([entry]) => {
      bookVisible = entry.isIntersecting;
      update();
    });
    if (target) io.observe(target);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-4 pt-2 transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <a
        href={href}
       
       
        tabIndex={show ? 0 : -1}
        className="flex h-12 w-full items-center justify-center rounded-full bg-black text-[16px] text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)]"
      >
        {label}
      </a>
    </div>
  );
}
