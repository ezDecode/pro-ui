import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { PageNavigation } from "@/components/core/page-navigation";
import { TableOfContents } from "@/components/core/table-of-contents";
import { ArrowRight02Icon, HugeiconsIcon } from "@/components/icons";
import { getNavigation } from "@/lib/navigation";

interface TocEntry {
	id: string;
	text: string;
	level: number;
}

interface DocPageLayoutProps {
	title: string;
	description: string;
	logo?: string;
	toc?: TocEntry[];
	markdownContent?: string;
	children: React.ReactNode;
	breadcrumbs?: { title: string; href: string }[];
}

export function DocPageLayout({
	title,
	description,
	logo,
	toc = [],
	markdownContent,
	children,
	breadcrumbs = [],
}: DocPageLayoutProps) {
	const fullMarkdown = `# ${title}\n\n${description}\n\n${markdownContent || ""
		}`;
	const navigation = getNavigation();

	return (
		<>
			{/* Main Content Column - 52rem (flex-1 takes remaining space) */}
			<main className="relative py-6 lg:py-8 min-w-0">
				<div className="w-full">
					{breadcrumbs.length > 0 && (
						<nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
							<Link
								href="/docs"
								className="hover:text-foreground transition-colors"
							>
								Docs
							</Link>
							{breadcrumbs.map((crumb) => (
								<React.Fragment key={crumb.href}>
									<HugeiconsIcon icon={ArrowRight02Icon} size={16} />
									<Link
										href={crumb.href}
										className="hover:text-foreground transition-colors"
									>
										{crumb.title}
									</Link>
								</React.Fragment>
							))}
						</nav>
					)}
					{logo && (
						<div className="mb-6">
							<Image
								src={logo}
								alt={`${title} logo`}
								width={100}
								height={100}
								className="aspect-auto"
							/>
						</div>
					)}
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
								{title}
							</h1>
							<PageNavigation
								position="top"
								markdownContent={fullMarkdown}
								navigation={navigation}
							/>
						</div>
						<p className="text-sm text-muted-foreground">{description}</p>
					</div>
					<div className="pt-8 space-y-6">{children}</div>
					<PageNavigation
						position="bottom"
						markdownContent={fullMarkdown}
						navigation={navigation}
					/>
				</div>
			</main>

			{/* Right Column: Table of Contents - 15rem */}
			<aside className="hidden lg:block w-[15rem] shrink-0">
				<div className="sticky top-20 py-6 pl-4">
					{toc && toc.length > 0 && <TableOfContents toc={toc} />}
				</div>
			</aside>
		</>
	);
}
