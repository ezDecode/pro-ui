import { ComponentsGrid } from "@/components/core/components-grid";
import { InspirationsSection } from "@/components/core/inspirations-section";
import { ArrowRight02Icon, HugeiconsIcon } from "@/components/icons";
import { GitHub } from "@/components/icons/github";
import { Footer } from "@/registry/new-york/ui/footer";
import { getNavigation } from "@/lib/navigation";
import { generateSEO, generateSoftwareSchema } from "@/lib/seo";
import { RaisedButton } from "@/registry/new-york/ui/raised-button";
import Image from "next/image";
import Link from "next/link";

export const metadata = generateSEO({
	title: "Skie — Open Source Components for Modern Interfaces",
	description:
		"Beautiful, accessible React components for building modern interfaces. Free and open source UI library with motion design and smooth interactions.",
	keywords: [
		"React Components",
		"UI Library",
		"Motion Design",
		"Open Source",
		"Skie",
		"Free Components",
		"Radix UI",
		"Tailwind CSS",
	],
	url: "/",
});

export default function Home() {
	const softwareSchema = generateSoftwareSchema();

	const navigation = getNavigation();
	const componentsSection = navigation.find(
		(section) => section.title === "Components",
	);
	const components = componentsSection?.items || [];

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: json schema
				dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
			/>
			<div className="relative px-4">
				<section className="mx-auto flex flex-col max-w-[52rem] gap-5 py-8 md:py-16 lg:py-24">
					<Image
						src={"/media/img_logo.png"}
						alt="Skie Logo"
						width={150}
						height={150}
						className="aspect-auto"
					/>

					<h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-4xl">
						Greetings from Skie UI
						<br />
						<span className="text-muted-foreground">
							Solo Developer Building motion interactions.
						</span>
					</h1>

					{/* Polished Intro Paragraph */}
					<p className="text-sm leading-relaxed text-muted-foreground md:text-base">
						A laboratory for refined components, motion experiments, and interactions.
						We recreate the best design animations on the web to make them accessible
						and open-source for all designers. If you&apos;re building modern interfaces,
						these tools will be invaluable. Available as free, open-source, and select premium assets.
					</p>

					<div className="flex flex-wrap items-center justify-start gap-3 py-2">
						<Link href="/docs">
							<RaisedButton
								size="default"
								color="#FDAC16"
								className="flex items-center"
							>
								Browse components
								<HugeiconsIcon icon={ArrowRight02Icon} size={16} />
							</RaisedButton>
						</Link>
						<Link
							href="https://github.com/ezDecode"
							target="_blank"
							rel="noreferrer"
						>
							<RaisedButton size="icon" color="#3b3b3b" className="rounded-lg">
								<GitHub className="h-6 w-6" />
							</RaisedButton>
						</Link>
					</div>

					{/* Context Section */}
					<div className="space-y-4 mt-8">
						<div className="space-y-3 text-[15px] text-muted-foreground leading-relaxed">
							<p>
								Basically, I wanted a place to store high-quality motion components that don&apos;t suck to implement.
								I find cool interactions on the web, break them down, and rebuild them here so they are actually usable.
							</p>
							<p>
								It&apos;s all built with Radix and Tailwind—the stack I use in production. No bloat, just code you can copy.
								Open source helped me get here, so this is just me giving back.
								Check the <Link href="/docs" className="text-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-foreground transition-all">documentation</Link> and grab whatever you need.
							</p>
						</div>
					</div>

					{/* Inspirations Section - Auto-populated from lib/inspirations.ts */}
					<InspirationsSection className="mt-6 mb-12" />

					<ComponentsGrid components={components} />
					<Footer />
				</section>
			</div>
		</>
	);
}
