import Link from "next/link";
import Image from "next/image";
import type { CaseStudyMeta } from "@/lib/case-studies";

interface CaseStudyCardProps {
  study: CaseStudyMeta;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group block rounded-2xl bg-surface p-2 transition-colors hover:bg-surface-2"
    >
      <article>
        <div className="aspect-[16/10] overflow-hidden rounded-xl bg-surface-2">
          {study.heroImage ? (
            <Image
              src={study.heroImage}
              alt={study.title}
              width={1440}
              height={900}
              sizes="(min-width: 768px) 560px, 100vw"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="h-full w-full bg-surface-2" />
          )}
        </div>

        <div className="px-4 pb-5 pt-5">
          {study.category && <p className="mb-2 text-[13px] text-subtle">{study.category}</p>}
          <h2 className="text-[22px] leading-[1.25] text-black">{study.title}</h2>
          <p className="mt-2 line-clamp-2 text-[15px] leading-[1.5] text-subtle">{study.description}</p>
        </div>
      </article>
    </Link>
  );
}
