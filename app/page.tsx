import { ComponentsGrid } from "@/components/core/components-grid";
import { Footer } from "@/registry/new-york/ui/footer";
import { getNavigation } from "@/lib/navigation";
import { generateSEO, generateSoftwareSchema } from "@/lib/seo";
import Link from "next/link";

export const metadata = generateSEO({
	title: "Skie — Design Engineer Portfolio & Component Library",
	description:
		"A laboratory for refined components and motion experiments. Focused on the intersection of aesthetics and high-end interaction.",
	keywords: [
		"React Components",
		"UI Library",
		"Design Engineer",
		"Motion Design",
		"Open Source",
		"Component Library",
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
					{/* Identity row */}
					<div className="flex items-center gap-4">
						<div className="shrink-0 relative">
							<div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
							<img
								src="/media/img_logo.png"
								alt="Akash"
								className="relative rounded-full h-12 w-12 sm:h-16 sm:w-16 border-2 border-background shadow-lg"
							/>
						</div>

						<div className="flex flex-col">
							<h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground bg-gradient-to-br from-foreground to-muted-foreground/60 bg-clip-text text-transparent pb-1">
								Akash
							</h1>
							<span className="text-base sm:text-lg text-muted-foreground font-light">
								Design Engineer
							</span>
						</div>
					</div>

					<div className="space-y-6 max-w-3xl">
						<p className="text-2xl sm:text-3xl font-light text-foreground leading-snug">
							Designing with humans at the centre.{" "}
							<br className="hidden sm:block" />
							Enter the{" "}
							<Link
								href="/docs"
								className="group font-normal text-foreground underline decoration-muted-foreground/30 underline-offset-4 transition-all hover:decoration-primary hover:text-primary relative inline-flex items-center gap-1"
							>
								craft
								<svg
									className="h-5 w-5 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 8l4 4m0 0l-4 4m4-4H3"
									/>
								</svg>
							</Link>{" "}
							to explore the components.
						</p>

						<p className="text-xl sm:text-2xl text-muted-foreground/80 font-light leading-relaxed w-full">
							I build systems that balance ambition with pragmatism. My work
							spans reusable foundations that scale, intelligent visual
							experiences that adapt, and cloud-native reliability that endures.
						</p>

						<div className="flex items-center gap-6 pt-4">
							<Link
								href="mailto:ezdecode@gmail.com"
								className="group flex items-center gap-2 text-sm font-normal text-foreground/80 transition-colors hover:text-foreground"
							>
								<span className="border-b border-muted-foreground/30 pb-0.5 transition-colors group-hover:border-foreground">
									Get in touch
								</span>
							</Link>
							<Link
								href="https://github.com/ezDecode"
								target="_blank"
								rel="noreferrer"
								className="group flex items-center gap-2 text-sm font-normal text-foreground/80 transition-colors hover:text-foreground"
							>
								<span className="border-b border-muted-foreground/30 pb-0.5 transition-colors group-hover:border-foreground">
									GitHub
								</span>
							</Link>
						</div>
					</div>

					<div className="space-y-1 mt-8">
						<h2 className="text-lg font-semibold">What&apos;s this for?</h2>
						<p className="text-sm text-muted-foreground leading-relaxed">
							Components designed for conversational interfaces—animated
							buttons, smooth transitions, accessible controls. Built with
							precision and shared for anyone building similar experiences.
						</p>
					</div>
					<div className="space-y-1">
						<h2 className="text-lg font-semibold">What you&apos;ll find</h2>
						<p className="text-sm text-muted-foreground leading-relaxed">
							Components used in production. Built with Radix UI and Tailwind
							CSS. Copy the code and make it yours.
						</p>
					</div>
					<div className="space-y-1 mb-10">
						<h2 className="text-lg font-semibold">Why share?</h2>
						<p className="text-sm text-muted-foreground leading-relaxed">
							Open source has given us a lot. This is one way of contributing
							back.
						</p>
					</div>

					<ComponentsGrid components={components} />
					<Footer />
				</section>
			</div>
		</>
	);
}
