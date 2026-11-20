import type { ReactNode } from "react";

/**
 * The frame around every section, measured from elevenlabs.io.
 * Full-width section, a 1178px container with 1px black/5 edges, and a hairline on top that
 * continues to the viewport edge through two 132px stubs. `bare` drops the edges and rule (the hero).
 * Padding presets (desktop / mobile):
 *   hero  pt-24 pb-10 / pt-16 pb-6      statement  pt-[120px] / pt-20      title block  same
 *   cards pt-10 pb-[120px] px-8 / px-6  faq        py-[120px] / py-20
 */
export function BlockSection({
  children,
  className = "px-6 py-20 lg:px-8 lg:py-[120px]",
  containerClassName = "",
  sectionClassName = "",
  id,
  bare = false,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  sectionClassName?: string;
  id?: string;
  bare?: boolean;
}) {
  return (
    <section id={id} className={`block-section scroll-mt-24 overflow-x-clip ${sectionClassName}`}>
      <div
        className={`relative mx-5 max-w-[1178px] min-[1218px]:mx-auto ${bare ? "" : "border-x border-black/5"} ${containerClassName}`}
      >
        {!bare && (
          <div aria-hidden>
            <div className="h-px w-full bg-black/5" />
            <div className="absolute top-0 -left-[132px] h-px w-[132px] bg-black/5" />
            <div className="absolute top-0 -right-[132px] h-px w-[132px] bg-black/5" />
          </div>
        )}
        <div className={className}>{children}</div>
      </div>
    </section>
  );
}

/** 12 columns, gap-x 12px. `bleed` cancels the section's own side padding (the real site does this for title and FAQ grids). */
export function Grid12({
  children,
  className = "",
  bleed = false,
}: {
  children: ReactNode;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <div className={`grid grid-cols-12 gap-x-3 ${bleed ? "-mx-6 px-3 lg:-mx-8" : ""} ${className}`}>{children}</div>
  );
}

/** Eyebrow + centered h2 (the site's `title` block): 14/21 label over a 32/36 headline, columns 3-10. */
export function TitleBlock({
  eyebrow,
  children,
}: {
  eyebrow?: string;
  /** The h2 text, or a node that renders it (for example ScrollText with as="h2"). */
  children: ReactNode;
}) {
  return (
    <Grid12 bleed>
      {eyebrow && (
        <p className="el-trim col-span-12 mb-5 px-5 text-center text-[14px] leading-[21px] tracking-[0.14px] text-subtle lg:col-span-8 lg:col-start-3">
          {eyebrow}
        </p>
      )}
      <div className="col-span-12 px-5 lg:col-span-8 lg:col-start-3">{children}</div>
    </Grid12>
  );
}

export const TITLE_CLASS =
  "el-trim text-balance text-center text-[26px] leading-8 text-black lg:text-[32px] lg:leading-9 lg:tracking-[-0.03em]";
