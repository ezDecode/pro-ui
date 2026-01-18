"use client";

import * as React from "react";
import { CopyButton } from "@/components/core/copy-button";
import { cn } from "@/lib/utils";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode;
  raw?: string;
}

export function CodeBlock({
  className,
  children,
  raw,
  ...props
}: CodeBlockProps) {
  const preRef = React.useRef<HTMLPreElement>(null);
  const [textContent, setTextContent] = React.useState(raw || "");

  React.useEffect(() => {
    if (!raw && preRef.current) {
      setTextContent(preRef.current.textContent || "");
    }
  }, [raw, children]);

  return (
    <div className="group relative my-4 overflow-hidden rounded-xl border border-border/10 bg-zinc-100 dark:bg-zinc-800">
      <pre
        ref={preRef}
        className={cn(
          "overflow-x-auto p-5 font-mono text-sm leading-relaxed scrollbar-hide",
          className
        )}
        {...props}
      >
        {children}
      </pre>
      <div className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
        <CopyButton value={textContent} />
      </div>
    </div>
  );
}
