import Image from "next/image";
import { formatDate } from "@/lib/blog";

interface AuthorCardProps {
  author: string;
  date: string;
  updated?: string;
  readingTime: string;
}

export function AuthorCard({
  author,
  date,
  updated,
  readingTime,
}: AuthorCardProps) {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="relative h-12 w-12 rounded-full overflow-hidden bg-neutral-900 flex items-center justify-center ring-2 ring-border">
        <Image
          src="/logo-main.svg"
          alt={author}
          width={48}
          height={48}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-foreground">{author}</span>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={date}>{formatDate(date)}</time>
          {updated && (
            <>
              <span>·</span>
              <span>Updated {formatDate(updated)}</span>
            </>
          )}
          <span>·</span>
          <span>{readingTime}</span>
        </div>
      </div>
    </div>
  );
}
