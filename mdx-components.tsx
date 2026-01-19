import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { CodeBlock } from "@/components/core/code-block";
import { ComponentPreview } from "@/components/core/component-preview";
import { DependencyPills } from "@/components/core/dependency-pills";
import { InstallCommand } from "@/components/core/install-command";
import { Shoutout } from "@/components/core/shoutout";
import { SourceCode } from "@/components/core/source-code";
import { Download01Icon, HugeiconsIcon } from "@/components/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { PropsTable, PropItem } from "@/components/mdx/PropsTable";
import { Steps, Step } from "@/components/mdx/Steps";
import { Callout } from "@/components/mdx/Callout";
import { CreditNote } from "@/components/mdx/CreditNote";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		Link,
		ComponentPreview,
		DependencyPills,
		Shoutout,
		CreditNote,

		InstallCommand,
		SourceCode,
		Download: () => <HugeiconsIcon icon={Download01Icon} size={16} />,
		Tabs,
		TabsContent,
		TabsList,
		TabsTrigger,
		// MDX Documentation Components
		PropsTable,
		PropItem,
		Steps,
		Step,
		Callout,
		h1: ({ className, ...props }) => (
			<h1
				className={cn(
					"mt-2 scroll-m-20 text-3xl font-semibold tracking-tight text-foreground",
					className,
				)}
				{...props}
			/>
		),
		h2: ({ className, ...props }) => (
			<h2
				className={cn(
					"mt-12 scroll-m-20 pb-2 text-xl font-medium tracking-tight text-foreground first:mt-0",
					className,
				)}
				{...props}
			/>
		),
		h3: ({ className, ...props }) => (
			<h3
				className={cn(
					"mt-10 scroll-m-20 text-lg font-medium tracking-tight text-foreground mb-4",
					className,
				)}
				{...props}
			/>
		),
		h4: ({ className, ...props }) => (
			<h4
				className={cn(
					"mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
					className,
				)}
				{...props}
			/>
		),
		h5: ({ className, ...props }) => (
			<h5
				className={cn(
					"mt-8 scroll-m-20 text-base font-semibold tracking-tight",
					className,
				)}
				{...props}
			/>
		),
		h6: ({ className, ...props }) => (
			<h6
				className={cn(
					"mt-8 scroll-m-20 text-base font-semibold tracking-tight",
					className,
				)}
				{...props}
			/>
		),
		a: ({ className, ...props }) => (
			<a
				className={cn("font-medium underline underline-offset-4", className)}
				{...props}
			/>
		),
		p: ({ className, ...props }) => (
			<p
				className={cn(
					"text-base leading-relaxed text-muted-foreground [&:not(:first-child)]:mt-4 mb-4",
					className,
				)}
				{...props}
			/>
		),
		ul: ({ className, ...props }) => (
			<ul
				className={cn("my-4 space-y-3 list-none p-0", className)}
				{...props}
			/>
		),
		ol: ({ className, ...props }) => (
			<ol
				className={cn("my-4 space-y-3 list-none p-0 counter-reset-[item]", className)}
				{...props}
			/>
		),
		li: ({ className, ...props }) => (
			<li
				className={cn(
					"text-base leading-relaxed text-muted-foreground relative pl-6 before:content-['-'] before:absolute before:left-0 before:top-0 before:text-muted-foreground/60 before:font-medium",
					className,
				)}
				{...props}
			/>
		),
		blockquote: ({ className, ...props }) => (
			<blockquote
				className={cn(
					"mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
					className,
				)}
				{...props}
			/>
		),
		img: ({ className, alt, ...props }) => (
			// biome-ignore lint/performance/noImgElement: Markdown components have no specified width and height
			<img
				className={cn("rounded-md border", className)}
				alt={alt}
				{...props}
			/>
		),
		hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
		table: ({ className, ...props }) => (
			<div className="w-full overflow-y-auto my-8">
				<table className={cn("w-full text-left border-collapse", className)} {...props} />
			</div>
		),
		tr: ({ className, ...props }) => (
			<tr
				className={cn("border-foreground/10 border-t last:border-b", className)}
				{...props}
			/>
		),
		th: ({ className, ...props }) => (
			<th
				className={cn(
					"py-3 pr-4 text-left font-medium text-foreground [&[align=center]]:text-center [&[align=right]]:text-right",
					className,
				)}
				{...props}
			/>
		),
		td: ({ className, ...props }) => (
			<td
				className={cn(
					"py-4 text-left text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right",
					className,
				)}
				{...props}
			/>
		),
		pre: ({ className, children, ...props }) => (
			<CodeBlock className={className} {...props}>
				{children}
			</CodeBlock>
		),
		code: ({ className, children, ...props }) => {
			const isInline = !className?.includes("language-");
			if (isInline) {
				return (
					<code
						className={cn(
							"relative rounded-sm bg-zinc-100 dark:bg-zinc-900 px-[0.3rem] py-[0.2rem] font-mono text-sm max-h-100 overflow-y-auto",
							className,
						)}
						{...props}
					>
						{children}
					</code>
				);
			}
			return (
				<code className={cn("font-mono text-sm", className)} {...props}>
					{children}
				</code>
			);
		},
		...components,
	};
}
