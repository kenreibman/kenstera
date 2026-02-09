"use client";

import { useEffect, useState, useSyncExternalStore, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

let cachedHeadings: TOCItem[] = [];

function getHeadingsSnapshot(): TOCItem[] {
  if (typeof document === "undefined") return cachedHeadings;
  const article = document.querySelector("article");
  if (!article) return cachedHeadings;

  const elements = article.querySelectorAll("h2, h3");
  const newHeadings = Array.from(elements).map((el) => ({
    id: el.id,
    text: el.textContent || "",
    level: parseInt(el.tagName[1]),
  }));

  // Only update cache if headings actually changed
  const hasChanged =
    newHeadings.length !== cachedHeadings.length ||
    newHeadings.some(
      (h, i) =>
        h.id !== cachedHeadings[i]?.id ||
        h.text !== cachedHeadings[i]?.text ||
        h.level !== cachedHeadings[i]?.level
    );

  if (hasChanged) {
    cachedHeadings = newHeadings;
  }

  return cachedHeadings;
}

function subscribeToHeadings(callback: () => void) {
  // Re-check headings when DOM mutations occur
  const observer = new MutationObserver(callback);
  const article = document.querySelector("article");
  if (article) {
    observer.observe(article, { childList: true, subtree: true });
  }
  return () => observer.disconnect();
}

const getServerSnapshot = () => cachedHeadings;

export function TableOfContents() {
  const headings = useSyncExternalStore(
    subscribeToHeadings,
    getHeadingsSnapshot,
    getServerSnapshot
  );
  const [activeId, setActiveId] = useState<string>("");

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id);
      }
    });
  }, []);

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const elements = article.querySelectorAll("h2, h3");
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-80px 0px -80% 0px",
    });

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [handleIntersection]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="hidden xl:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <p className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
        On this page
      </p>
      <ul className="space-y-2 text-sm border-l border-border">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block py-1 transition-colors border-l-2 -ml-px",
                heading.level === 3 ? "pl-6" : "pl-4",
                activeId === heading.id
                  ? "border-primary text-foreground font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
