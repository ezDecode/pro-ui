"use client";

import * as React from "react";
import { CopyButton } from "@/components/core/copy-button";
import { cn } from "@/lib/utils";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode;
  raw?: string;
  wrapperClassName?: string;
}

export function CodeBlock({
  className,
  wrapperClassName,
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
    <div className={cn("group relative my-4", wrapperClassName)}>
      <pre
        ref={preRef}
        className={cn(
          "overflow-x-auto rounded-xl p-5 font-mono text-sm leading-relaxed scrollbar-hide",
          "bg-zinc-100 dark:bg-zinc-900",
          className
        )}
        {...props}
      >
        {children}
      </pre>
      <div className="absolute right-3 top-3">
        <CopyButton value={textContent} />
      </div>
    </div>
  );
}
