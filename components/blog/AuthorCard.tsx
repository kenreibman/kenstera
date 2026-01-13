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
      <div className="hidden sm:flex relative h-6 w-6 overflow-hidden bg-black items-center justify-center">
        <Image
          src="/logo-main.svg"
          alt={author}
          width={32}
          height={32}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-foreground">{author}</span>
        <div className="flex flex-wrap sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs text-muted-foreground">
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
