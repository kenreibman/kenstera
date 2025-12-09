import { ReactNode } from "react";
import { ScrollingList } from "./ScrollingList";

export type ServiceItem = {
    label: string,
    icon: ReactNode;
}

type ServiceBlockProps = {
  label: string;
  title: string;
  body: string;
  items: ServiceItem[];
  reverse?: boolean;
};

export function ServiceBlock({
  label,
  title,
  body,
  items,
  reverse,
}: ServiceBlockProps) {
  return (
    <div
      className={`
        mt-16 flex flex-col gap-10
        lg:mt-20 lg:flex-row lg:items-center
        ${reverse ? "lg:flex-row-reverse" : ""}
      `}
    >
      {/* LEFT — scrolling list */}
      <div className="w-full px-12 pt-12 pb-6 max-w-md rounded-2xl bg-neutral-800/40 backdrop-blur-sm lg:w-1/2">
        <div className="relative mx-auto max-w-md rounded-sm border border-white/10 bg-linear-to-b from-neutral-900/80 to-black/90 p-4">
          {/* Header bar */}
          <div className="mb-3 flex items-center justify-between rounded-sm border border-white/10 bg-black/60 px-3 py-2 text-xs text-neutral-300">
            <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
              What&apos;s Included
            </span>
          </div>

          {/* Animated list */}
          <ScrollingList items={items} />
          
        </div>
            {/* Bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black to-transparent" />
      </div>

      {/* RIGHT — content */}
      <div className="w-full lg:w-1/2">
        <div className="mb-3 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-neutral-200">
          {label}
        </div>

        <h3 className="text-balance text-white text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h3>

        <p className="mt-4 text-sm text-neutral-300">{body}</p>
      </div>
    </div>
  );
}
