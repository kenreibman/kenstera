import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import { Callout } from "./Callout";
import { CodeBlock } from "./CodeBlock";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold tracking-tight mt-8 mb-4">{children}</h1>
  ),
  h2: ({ children }) => {
    const id = slugify(String(children));
    return (
      <h2
        id={id}
        className="text-2xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-24"
      >
        <a href={`#${id}`} className="anchor-link">
          {children}
        </a>
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = slugify(String(children));
    return (
      <h3
        id={id}
        className="text-xl font-semibold tracking-tight mt-8 mb-3 scroll-mt-24"
      >
        <a href={`#${id}`} className="anchor-link">
          {children}
        </a>
      </h3>
    );
  },
  p: ({ children }) => (
    <p className="leading-7 mb-4 text-foreground/90">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-foreground/90">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-foreground/90">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-primary pl-6 italic text-foreground/80">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href || "#"}
        className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
      >
        {children}
      </Link>
    );
  },
  img: ({ src, alt, ...props }) => (
    <Image
      src={src || ""}
      alt={alt || ""}
      width={800}
      height={450}
      className="rounded-lg my-6"
      sizes="(max-width: 768px) 100vw, 800px"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-border" />,
  table: ({ children }) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-border bg-muted/50">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-border">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-foreground/90">{children}</td>
  ),
  code: ({ children }) => (
    <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">
      {children}
    </code>
  ),
  pre: ({ children }) => {
    const codeElement = children as React.ReactElement<{ children: string; className?: string }>;
    const code = codeElement?.props?.children || "";
    const className = codeElement?.props?.className || "";
    const language = className.replace("language-", "");

    return <CodeBlock language={language}>{code}</CodeBlock>;
  },
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  // Custom components
  Callout,
  CodeBlock,
};
