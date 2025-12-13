import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;          // e.g. "Our Services"
  title: ReactNode;          // allows line breaks / spans
  subtitle?: ReactNode;      // supporting text
  align?: "left" | "center"; // default center
  className?: string;        // wrapper overrides
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center rounded-full  border border-white/10 bg-black/60 px-3 py-1 text-sm font-medium text-white">
          {eyebrow}
        </div>
      )}

      <h2 className="text-balance text-3xl font-semibold tracking-tight
        text-transparent
        bg-clip-text
        bg-[linear-gradient(235deg,#ffffff_0%,#ffffff_44%,#6464a7_100%)]
      sm:text-4xl md:text-[40px]">
        {title}
      </h2>

      {subtitle && (
        <p className="max-w-2xl text-sm text-neutral-300 sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
