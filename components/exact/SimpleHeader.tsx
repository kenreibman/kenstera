import Link from "next/link";

/** Minimal top bar for focused pages (booking, contact): wordmark aligned to the frame's left edge. */
export function SimpleHeader() {
  return (
    <header>
      <div className="mx-5 flex h-16 max-w-[1178px] items-center min-[1218px]:mx-auto">
        <Link
          href="/"
          className="-mx-3 flex h-9 items-center rounded-full px-3 text-[19px] font-semibold tracking-[-0.03em] text-black transition-colors duration-150 hover:bg-black/5"
        >
          Kenstera
        </Link>
      </div>
    </header>
  );
}
