"use client";

import {
	Download05Icon,
	Home09Icon,
	HugeiconsIcon,
	ImageCompositionIcon,
	MapsIcon,
	ShapeCollectionIcon,
	StatusIcon,
	UserLove01Icon
} from "@/components/icons";
import { cn } from "@/lib/utils";
import type { NavSection } from "@/types/nav-item";
import type { IconSvgElement } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { DiscordIcon, TwitterIcon } from "../icons/social-icons";

interface DocsSidebarClientProps {
	navigation: NavSection[];
}

// Map page titles to icons
const pageIcons: Record<string, IconSvgElement> = {
	Introduction: Home09Icon,
	Components: ShapeCollectionIcon,
	Installation: Download05Icon,
	"Status - Beta": StatusIcon,
	Roadmap: MapsIcon,
	Contributors: UserLove01Icon,
	Gallery: ImageCompositionIcon,
};

const socialIcons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
	Twitter: TwitterIcon,
	Discord: DiscordIcon,
};

export function DocsSidebarClient({ navigation }: DocsSidebarClientProps) {
	const pathname = usePathname();

	return (
		<aside className="sticky top-14 hidden lg:block w-[15rem] shrink-0 h-[calc(100vh-3.5rem)]">
			<div className="py-8 overflow-auto h-full pr-4">
				<nav className="grid grid-flow-row auto-rows-max text-sm">
					{navigation.map((section) => (
						<div key={section.title} className="pb-6">
							{section.title.length > 0 && section.title !== "Socials" && (
								<h4 className="rounded-md px-2 py-1 text-xs text-muted-foreground">
									{section.title}
								</h4>
							)}
							{section.items && section.items.length > 0 && (
								<div className="flex flex-col gap-1 mt-1">
									{section.items.map((item) => {
										const Icon = pageIcons[item.title];
										const SocialIcon = socialIcons[item.title];
										const isExternal = item.href.startsWith("http");

										const linkContent = (
											<>
												{Icon && (
													<HugeiconsIcon
														icon={Icon}
														className="size-4 text-muted-foreground group-hover:text-accent-foreground transition-colors"
													/>
												)}
												{SocialIcon && (
													<SocialIcon className="size-4 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
												)}
												<span>{item.title}</span>
											</>
										);

										return isExternal ? (
											<a
												key={item.href}
												href={item.href}
												target="_blank"
												rel="noopener noreferrer"
												className="group flex w-fit items-center gap-1.5 text-sm rounded-md border border-transparent px-2 py-1 hover:bg-accent hover:text-accent-foreground font-medium text-foreground"
											>
												{linkContent}
											</a>
										) : (
											<Link
												key={item.href}
												href={item.href}
												className={cn(
													"group flex w-fit items-center gap-1.5 text-sm rounded-md border border-transparent px-2 py-1 hover:bg-accent hover:text-accent-foreground font-medium text-foreground",
													pathname === item.href ? "bg-accent" : "",
												)}
											>
												{linkContent}
											</Link>
										);
									})}
								</div>
							)}
						</div>
					))}
				</nav>
			</div>
		</aside>
	);
}
