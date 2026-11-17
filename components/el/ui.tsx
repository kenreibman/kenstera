import Link from "next/link";
import type { ReactNode } from "react";

/* Shared building blocks for the ElevenLabs-style layout. */

/** Content column. `framed` draws the thin vertical rules on large screens. */
export function Container({
  children,
  className = "",
  framed = false,
}: {
  children: ReactNode;
  className?: string;
  framed?: boolean;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] ${framed ? "frame" : ""} ${className}`}>
      <div className="px-5 sm:px-8">{children}</div>
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  size?: "sm" | "md";
  className?: string;
  external?: boolean;
};

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-1.5 rounded-full font-normal whitespace-nowrap transition-colors";
const BUTTON_VARIANT = {
  primary: "bg-black text-white hover:bg-neutral-800",
  secondary: "bg-white text-black ring-hairline hover:bg-neutral-50",
  light: "bg-white text-black hover:bg-white/90",
};
const BUTTON_SIZE = { sm: "h-9 px-4 text-[14px]", md: "h-11 px-5 text-[16px]" };

export function buttonClass(variant: ButtonProps["variant"] = "primary", size: ButtonProps["size"] = "sm") {
  return `${BUTTON_BASE} ${BUTTON_VARIANT[variant]} ${BUTTON_SIZE[size]}`;
}

export function Button({ href, children, variant = "primary", size = "md", className = "", external }: ButtonProps) {
  const cls = `${buttonClass(variant, size)} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/**
 * The section opener used across elevenlabs.io: small label, headline and
 * button on the left, a short description on the right.
 */
export function SectionHeader({
  label,
  title,
  description,
  action,
  as: Tag = "h2",
  className = "",
}: {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={`grid gap-6 md:grid-cols-2 md:gap-12 ${className}`}>
      <div>
        {label && <p className="mb-3 text-[16px] text-subtle">{label}</p>}
        <Tag
          className={
            Tag === "h1"
              ? "text-[40px] leading-[1.1] text-black sm:text-[48px]"
              : "text-[32px] leading-[1.15] text-black sm:text-[40px]"
          }
        >
          {title}
        </Tag>
        {action && <div className="mt-6">{action}</div>}
      </div>
      {description && (
        <div className="max-w-[520px] text-[17px] leading-[1.45] text-black md:pt-[calc(1rem+28px)]">{description}</div>
      )}
    </div>
  );
}

/** A framed section separated from the one above by a hairline. */
export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-16 border-t border-hairline ${className}`}>
      <Container framed>
        <div className="py-20 sm:py-28">{children}</div>
      </Container>
    </section>
  );
}

/** Warm-gray card with the 16px radius used throughout elevenlabs.io. */
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-surface ${className}`}>{children}</div>;
}

export type Palette = "ember" | "dusk" | "dawn" | "moss" | "iris";

/** Grainy painted-gradient card with an optional white caption at the bottom. */
export function GradientCard({
  palette,
  children,
  label,
  caption,
  className = "",
}: {
  palette: Palette;
  children?: ReactNode;
  label?: string;
  caption?: string;
  className?: string;
}) {
  return (
    <div className={`grad g-${palette} relative flex flex-col overflow-hidden rounded-2xl ${className}`}>
      <div className="relative flex flex-1 items-center justify-center p-6 sm:p-10">{children}</div>
      {(label || caption) && (
        <div className="caption-fade relative px-6 pb-6 pt-10 sm:px-8 sm:pb-7">
          {label && <p className="text-[15px] text-white/80">{label}</p>}
          {caption && <p className="mt-1 max-w-md text-[16px] leading-[1.4] text-white">{caption}</p>}
        </div>
      )}
    </div>
  );
}

/** Card caption in the elevenlabs.io style: gray label, black line beneath. */
export function CardCaption({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-[15px] text-subtle">{label}</p>
      <p className="mt-1 text-[16px] leading-[1.4] text-black">{text}</p>
    </div>
  );
}
