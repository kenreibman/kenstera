"use client";

import { useEffect } from "react";
import { BlockSection } from "@/components/exact";

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
    <main className="bg-page">
      <BlockSection bare className="pb-24 pt-16 lg:pb-32 lg:pt-24">
        <h1 className="el-trim text-[36px] leading-[42px] tracking-[-0.72px] text-black lg:text-[48px] lg:leading-[52px] lg:tracking-[-0.96px]">
          Something went wrong.
        </h1>
        <p className="el-trim mt-5 text-[16px] leading-6 tracking-[0.16px] text-subtle">
          An unexpected error occurred. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex h-11 items-center rounded-full bg-black px-5 text-[16px] text-white transition-colors hover:bg-black/85"
        >
          Try again
        </button>
      </BlockSection>
    </main>
  );
}
