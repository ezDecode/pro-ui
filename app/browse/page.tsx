import { getComponents } from "@/lib/components";
import { BrowseGrid } from "./browse-grid";
import { GridSeparator } from "@/components/ui/grid-separator";
import Link from "next/link";
import { DependencyPills } from "@/components/core/dependency-pills";

// Server component - fetches components automatically
export default function BrowseComponentsPage() {
    // Auto-discover all components from previews folder
    const components = getComponents();

    return (
        <>
            {/* Header Section */}
            <section className="py-10 md:py-14">
                <h1 className="text-2xl font-medium tracking-tight md:text-3xl">
                    Interaction Components
                </h1>
                <p className="mt-2 text-muted-foreground text-sm font-mono">
                    Some of the best interactions found from from the internet.
                </p>
            </section>

            {/* Grid Separator */}
            <GridSeparator size="sm" />

            {/* Components Grid - Two Column Layout */}
            <BrowseGrid components={components} />

            {/* Grid Separator */}
            <GridSeparator size="md" />

            {/* Built For Section */}
            <section className="py-6">
                <h2 className="text-xl font-medium tracking-tight mb-2">Built with</h2>
                <DependencyPills
                    dependencies={[
                        { name: "React", url: "https://react.dev", color: "#1e3a5f" },
                        { name: "Motion", url: "https://motion.dev", color: "#302727ff" },
                        { name: "GSAP", url: "https://gsap.com", color: "#0e3a0e" },
                        { name: "Radix UI", url: "https://radix-ui.com", color: "#33338aff" },
                        { name: "Shadcn", url: "https://ui.shadcn.com/", color: "#1A171D" },
                        { name: "Tailwind", url: "https://tailwindcss.com", color: "#0e4a5c" },
                    ]}
                />
            </section>
            {/* Bottom Grid Separator */}
            <GridSeparator size="sm" />

            {/* Spacer */}
            <div className="h-8" />
        </>
    );
}
