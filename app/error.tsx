"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main id="main" className="relative z-[1] grid min-h-[92svh] place-items-center px-6 pt-24 text-center">
      <div>
        <p className="label mb-6 text-lime">Something wilted</p>
        <h1 className="display text-[clamp(2.6rem,8vw,6rem)]">
          That didn&apos;t <em className="text-lime">take.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sage">An unexpected error occurred. Try again.</p>
        <button type="button" onClick={reset} className="btn btn-lime mt-9">
          Try again
        </button>
      </div>
    </main>
  );
}
