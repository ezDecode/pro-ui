import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { PageNavigation } from "@/components/core/page-navigation";
import { ArrowRight02Icon, HugeiconsIcon } from "@/components/icons";
import { getNavigation } from "@/lib/navigation";

interface DocPageLayoutProps {
	title: string;
	description: string;
	logo?: string;
	markdownContent?: string;
	children: React.ReactNode;
	breadcrumbs?: { title: string; href: string }[];
}

export function DocPageLayout({
	title,
	description,
	logo,
	markdownContent,
	children,
	breadcrumbs = [],
}: DocPageLayoutProps) {
	const fullMarkdown = `# ${title}\n\n${description}\n\n${markdownContent || ""
		}`;
	const navigation = getNavigation();

	return (
		<main className="relative py-8 lg:py-12 min-w-0">
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
	);
}
