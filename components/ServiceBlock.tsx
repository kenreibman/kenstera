import { ReactNode } from "react";

export type ServiceItem = {
    label: string,
    icon: ReactNode;
}

type ServiceBlockProps = {
  label: string;
  title: string;
  body: string;
  visual: ReactNode;
  reverse?: boolean;
};

export function ServiceBlock({
  label,
  title,
  body,
  visual,
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
      {/* LEFT — visual */}
      <div className="w-full lg:w-1/2">
        {visual}
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
