"use client";

import * as React from "react";
import { codeToHtml } from "shiki";
import { motion } from "framer-motion";
import { DependencyPills } from "@/components/core/dependency-pills";
import { FullscreenButton } from "@/components/core/fullscreen-button";
import {
	Copy01Icon,
	Download01Icon,
	HugeiconsIcon,
	Tick02Icon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ComponentPreviewClientProps
	extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	code: string;
	/** Optional filename for download */
	filename?: string;
	/** Optional list of dependencies to show in footer */
	dependencies?: Array<{
		name: string;
		url: string;
		color?: string;
	}>;
}

type TabValue = "preview" | "code";

/**
 * Client component to render component preview with FilterChips-style tabs
 * Features: Preview/Code tabs with animated indicator, fullscreen, copy & download
 */
export function ComponentPreviewClient({
	children,
	className,
	code,
	filename = "component.tsx",
	dependencies,
	...props
}: ComponentPreviewClientProps) {
	const [activeTab, setActiveTab] = React.useState<TabValue>("preview");
	const [html, setHtml] = React.useState("");
	const [copied, setCopied] = React.useState(false);

	React.useEffect(() => {
		codeToHtml(code, {
			lang: "tsx",
			themes: {
				light: "github-light",
				dark: "github-dark",
			},
		}).then(setHtml);
	}, [code]);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDownload = () => {
		const blob = new Blob([code], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const tabs: { value: TabValue; label: string }[] = [
		{ value: "preview", label: "Preview" },
		{ value: "code", label: "Code" },
	];

	return (
		<div className={cn("my-6 w-full", className)} {...props}>
			<div className="rounded-xl border overflow-hidden bg-background">
				{/* Header with FilterChips-style tabs */}
				<div className="flex items-center justify-between border-b bg-muted/20 px-3 py-2">
					{/* Tabs - FilterChips style with animated indicator */}
					<div className="flex gap-1" role="tablist">
						{tabs.map((tab) => {
							const isActive = tab.value === activeTab;
							return (
								<button
									key={tab.value}
									type="button"
									role="tab"
									aria-selected={isActive}
									onClick={() => setActiveTab(tab.value)}
									className={cn(
										"relative inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
										isActive
											? "text-background"
											: "text-muted-foreground hover:text-foreground hover:bg-muted/40"
									)}
								>
									{/* Animated background indicator */}
									{isActive && (
										<motion.span
											layoutId="previewTabIndicator"
											className="absolute inset-0 bg-foreground rounded-lg"
											transition={{ type: "spring", stiffness: 500, damping: 35 }}
											initial={false}
										/>
									)}
									<span className="relative z-10">{tab.label}</span>
								</button>
							);
						})}
					</div>

					{/* Action buttons */}
					<TooltipProvider>
						<div className="flex items-center gap-1">
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="sm"
										onClick={handleCopy}
										className="h-7 w-7 p-0"
									>
										{copied ? (
											<HugeiconsIcon icon={Tick02Icon} size={14} />
										) : (
											<HugeiconsIcon icon={Copy01Icon} size={14} />
										)}
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>{copied ? "Copied!" : "Copy code"}</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="sm"
										onClick={handleDownload}
										className="h-7 w-7 p-0"
									>
										<HugeiconsIcon icon={Download01Icon} size={14} />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Download file</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</TooltipProvider>
				</div>

				{/* Tab Content */}
				{activeTab === "preview" && (
					<div className="relative group min-h-[150px] p-6">
						<div className="flex items-center justify-center w-full">
							{children}
						</div>
						<div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
							<FullscreenButton>{children}</FullscreenButton>
						</div>
					</div>
				)}

				{activeTab === "code" && (
					<div className="max-h-[500px] overflow-auto">
						<pre className="p-4 text-sm font-mono overflow-x-auto">
							<code
								data-theme
								dangerouslySetInnerHTML={{ __html: html }}
							/>
						</pre>
					</div>
				)}
			</div>

			{/* Dependencies Footer - Styled as requested */}
			{dependencies && dependencies.length > 0 && (
				<div className="mt-4 flex flex-wrap items-center gap-2">
					<span className="text-sm font-medium text-muted-foreground mr-1">Dependencies:</span>
					<DependencyPills dependencies={dependencies} />
				</div>
			)}
		</div>
	);
}
