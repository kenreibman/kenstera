"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ children, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silently ignore clipboard errors
    }
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-border bg-neutral-950 dark:bg-neutral-900">
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 dark:bg-neutral-800 border-b border-border">
          <span className="text-xs text-neutral-400 font-mono">
            {filename || language}
          </span>
          <button
            onClick={handleCopy}
            aria-label="Copy code to clipboard"
            className={cn(
              "flex items-center gap-1.5 text-xs transition-colors",
              copied
                ? "text-emerald-400"
                : "text-neutral-400 hover:text-neutral-200"
            )}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-neutral-100">{children}</code>
      </pre>
    </div>
  );
}
