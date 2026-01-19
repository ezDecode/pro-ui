"use client";

import { ArrowRight02Icon, HugeiconsIcon } from "@/components/icons";
import type { ComponentInfo } from "@/lib/components";
import Link from "next/link";
import { Suspense, lazy, useMemo } from "react";

// Preview loader with lazy loading
function PreviewLoader({ name }: { name: string }) {
    const Component = useMemo(() => {
        return lazy(() => import(`@/components/previews/${name}/default`));
    }, [name]);

    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center h-full">
                    <div className="w-4 h-4 border-2 border-muted-foreground/20 border-t-foreground/50 rounded-full animate-spin" />
                </div>
            }
        >
            <Component />
        </Suspense>
    );
}

// Single component card
function ComponentCard({ name, title, description, href }: ComponentInfo) {
    return (
        <div className="group flex flex-col bg-background border border-edge hover:border-foreground/15 transition-colors duration-200">
            {/* Interactive Preview */}
            <div className="relative min-h-[200px] sm:min-h-[220px] flex items-center justify-center p-6 sm:p-8 bg-muted/10">
                <PreviewLoader name={name} />
            </div>

            {/* Info + Link */}
            <Link
                href={href}
                className="flex items-center gap-4 p-4 border-t border-edge bg-background hover:bg-muted/20 transition-colors"
            >
                <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground">
                        {title}
                    </span>
                </div>
                <div className="shrink-0 w-7 h-7 flex items-center justify-center border border-edge group-hover:border-foreground/30 group-hover:bg-foreground group-hover:text-background transition-all duration-150">
                    <HugeiconsIcon icon={ArrowRight02Icon} size={14} />
                </div>
            </Link>
        </div>
    );
}

interface BrowseGridProps {
    components: ComponentInfo[];
}

export function BrowseGrid({ components }: BrowseGridProps) {
    if (components.length === 0) {
        return (
            <div className="py-12 text-center text-muted-foreground text-sm">
                No components found. Add preview components to get started.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {components.map((component) => (
                <ComponentCard key={component.name} {...component} />
            ))}
        </div>
    );
}
