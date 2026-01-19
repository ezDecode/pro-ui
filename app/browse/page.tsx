import { getComponents } from "@/lib/components";
import { BrowseGrid } from "./browse-grid";

// Server component - fetches components automatically
export default function BrowseComponentsPage() {
    // Auto-discover all components from previews folder
    const components = getComponents();

    return (
        <>
            {/* Header */}
            <section className="py-10 md:py-14">
                <h1 className="text-2xl font-medium tracking-tight md:text-3xl">
                    Components
                </h1>
                <p className="mt-2 text-muted-foreground text-sm">
                    Interactive previews. Click to view docs.
                </p>
            </section>

            {/* Components Grid */}
            <BrowseGrid components={components} />

            {/* Spacer */}
            <div className="h-16" />
        </>
    );
}
