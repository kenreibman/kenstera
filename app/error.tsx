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
    <main id="main" className="relative z-[1] grid min-h-[86svh] place-items-center px-6 pt-20 text-center">
      <div>
        <h1 className="display h1">Something went wrong.</h1>
        <p className="lede mx-auto mt-5 max-w-[32ch] text-sage">An unexpected error occurred. Try again.</p>
        <button type="button" onClick={reset} className="btn btn-lime mt-8">
          Try again
        </button>
      </div>
    </main>
  );
}
