import Link from "next/link";
import Image from "next/image";
import type { CaseStudyMeta } from "@/lib/case-studies";

interface CaseStudyCardProps {
  study: CaseStudyMeta;
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Link href={`/case-studies/${study.slug}`} className="group block">
      <article>
        {/* Image */}
        <div className="aspect-[16/10] overflow-hidden rounded-xl bg-muted mb-4">
          {study.heroImage ? (
            <Image
              src={study.heroImage}
              alt={study.title}
              width={600}
              height={375}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
              {study.clientPhoto && (
                <Image
                  src={study.clientPhoto}
                  alt={study.clientName}
                  width={120}
                  height={120}
                  className="rounded-full object-cover object-top w-24 h-24"
                />
              )}
            </div>
          )}
        </div>

        {/* Category tag */}
        {study.category && (
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full border border-foreground/80 text-foreground mb-3 uppercase tracking-wide">
            {study.category}
          </span>
        )}

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 leading-tight group-hover:opacity-70 transition-opacity">
          {study.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {study.description}
        </p>
      </article>
    </Link>
  );
}
