import { DependencyPills } from "@/components/core/dependency-pills";
import { InspirationsSection } from "@/components/core/inspirations-section";
import { ArrowRight02Icon, HugeiconsIcon } from "@/components/icons";
import { GitHubIcon } from "@/components/icons/social-icons";
import { GridSeparator } from "@/components/ui/grid-separator";
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

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: json schema
				dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
			/>

			{/* Hero Section */}
			<section className="screen-line-after py-8 md:py-12 lg:py-16">
				<div className="relative mb-4 w-fit screen-line-before screen-line-after border-r border-edge">
					<div className="grid-pattern-subtle">
						<Image
							src={"/media/img_logo.png"}
							alt="Skie Logo"
							width={150}
							height={150}
							className="aspect-auto"
						/>
					</div>
				</div>
				<GridSeparator size="sm" />

				<div className="screen-line-before screen-line-after py-2">
					<h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-4xl">
						Greetings from
						<br />
						<span className="text-muted-foreground">
							Solo developer building motion interactions.
						</span>
					</h1>
				</div>
				<GridSeparator size="sm" />

				{/* Polished Intro Paragraph */}
				<p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base max-w-2xl">
					A laboratory for refined components, motion experiments, and interactions.
					We recreate the best design animations on the web to make them accessible
					and open-source for all designers. If you&apos;re building modern interfaces,
					these tools will be invaluable. Available as free, open-source, and select premium assets.
				</p>

				<div className="flex flex-wrap items-center justify-start gap-2 mt-3">
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
							<GitHubIcon className="h-6 w-6" />
						</RaisedButton>
					</Link>
				</div>
			</section>

			{/* Separator with diagonal pattern */}
			<GridSeparator size="sm" />

			{/* About Section */}
			<section className="screen-line-after py-6 md:py-10">
				<div className="space-y-3 text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
					<div className="screen-line-before screen-line-after py-2 mb-2">
						<h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-4xl text-foreground">
							Know me
						</h1>
					</div>
					<GridSeparator size="sm" />
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
			</section>

			{/* Separator */}
			<GridSeparator size="md" />

			{/* Dependencies Section */}
			<section className="screen-line-after py-6 md:py-8">
				<div className="screen-line-before screen-line-after py-2 mb-2">
					<h2 className="text-xl font-semibold tracking-tight">Built with</h2>
				</div>
				<GridSeparator size="sm" />
				<DependencyPills
					dependencies={[
						{ name: "React", url: "https://react.dev", color: "#1e3a5f" },
						{ name: "Motion", url: "https://motion.dev", color: "#302727ff" },
						{ name: "GSAP", url: "https://gsap.com", color: "#0e3a0e" },
						{ name: "Radix UI", url: "https://radix-ui.com", color: "#1a1a2e" },
						{ name: "Tailwind", url: "https://tailwindcss.com", color: "#0e4a5c" },
					]}
				/>
			</section>

			{/* Separator */}
			<GridSeparator size="md" />

			{/* Inspirations Section */}
			<section className="screen-line-after py-6 md:py-8">
				<InspirationsSection className="mb-0" />
			</section>

			{/* Separator */}
			<GridSeparator size="sm" />

			{/* Footer Section */}
			<section className="py-6 md:py-8">
				<Footer navigation={navigation} />
			</section>
		</>
	);
}

