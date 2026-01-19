import { getComponents } from "@/lib/components";
import { BrowseGrid } from "./browse-grid";
import { GridSeparator } from "@/components/ui/grid-separator";
import Link from "next/link";

// Server component - fetches components automatically
export default function BrowseComponentsPage() {
    // Auto-discover all components from previews folder
    const components = getComponents();

    return (
        <>
            {/* Header Section */}
            <section className="py-10 md:py-14">
                <h1 className="text-2xl font-medium tracking-tight md:text-3xl">
                    Components
                </h1>
                <p className="mt-2 text-muted-foreground text-sm font-mono">
                    A collection of reusable components. Click to expand preview.
                </p>

                {/* Install Command */}
                <div className="mt-6 flex items-center gap-2">
                    <code className="text-sm text-muted-foreground font-mono">
                        npx shadcn add{" "}
                        <span className="text-foreground">@skie/component-name</span>
                    </code>
                </div>
            </section>

            {/* Grid Separator */}
            <GridSeparator size="sm" />

            {/* Components Grid - Two Column Layout */}
            <BrowseGrid components={components} />

            {/* Grid Separator */}
            <GridSeparator size="md" />

            {/* Built For Section */}
            <section className="py-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-mono text-xs">Built for</span>
                    <Link
                        href="https://react.dev"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-2 py-1 bg-muted/30 hover:bg-muted/50 rounded text-xs font-mono transition-colors"
                    >
                        <i className="devicon-react-original text-[10px]" />
                        React 19
                    </Link>
                    <Link
                        href="https://tailwindcss.com"
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-2 py-1 bg-muted/30 hover:bg-muted/50 rounded text-xs font-mono transition-colors"
                    >
                        <i className="devicon-tailwindcss-original text-[10px]" />
                        Tailwind CSS v4
                    </Link>
                </div>
            </section>

            {/* Bottom Grid Separator */}
            <GridSeparator size="sm" />

            {/* Spacer */}
            <div className="h-8" />
        </>
    );
}
