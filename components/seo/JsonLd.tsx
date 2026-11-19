import { jsonLdString } from "@/lib/seo";

/** Renders one or more JSON-LD blocks, escaped so content can't close the script tag. */
export function JsonLd({ data }: { data: unknown | unknown[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(block) }} />
      ))}
    </>
  );
}
