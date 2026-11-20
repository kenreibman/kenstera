import type { ReactNode } from "react";

/**
 * CTA band. Full-width top and bottom hairlines, the container edges as border-x, a 32/36 headline
 * on the left and the buttons on the right. Padding 72px.
 */
export function CtaBand({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  return (
    <div id={id} className="border-y border-black/5">
      <div className="relative mx-5 flex max-w-[1178px] flex-col gap-x-6 gap-y-8 border-x border-black/5 px-3 py-[72px] min-[1218px]:mx-auto lg:flex-row lg:items-end">
        <p className="el-trim my-auto flex-auto px-5 text-balance text-[26px] leading-8 text-black lg:text-pretty lg:text-[32px] lg:leading-9 lg:tracking-[-0.03em]">
          {title}
        </p>
        <div className="flex flex-none flex-wrap gap-x-2 gap-y-3 px-5">{children}</div>
      </div>
    </div>
  );
}
