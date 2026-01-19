"use client";

import { ArrowDown01Icon, HugeiconsIcon, PackageOpenIcon } from "@/components/icons";
import type { ComponentInfo } from "@/lib/components";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Suspense, lazy, memo, startTransition, useCallback, useEffect, useMemo, useRef, useState } from "react";

// Component cache to avoid re-importing already loaded components
const componentCache = new Map<string, React.LazyExoticComponent<React.ComponentType<unknown>>>();

// Prefetch queue to handle background loading
const prefetchedComponents = new Set<string>();

// Get or create lazy component with caching
function getOrCreateLazyComponent(name: string) {
    if (!componentCache.has(name)) {
        componentCache.set(name, lazy(() => import(`@/components/previews/${name}/default`)));
    }
    return componentCache.get(name)!;
}

// Prefetch a component in the background
function prefetchComponent(name: string) {
    if (prefetchedComponents.has(name)) return;
    prefetchedComponents.add(name);
    // Trigger the import to cache it
    import(`@/components/previews/${name}/default`).catch(() => {
        // Silent fail - component will load normally when needed
        prefetchedComponents.delete(name);
    });
}

// Optimized Preview loader with caching
const PreviewLoader = memo(function PreviewLoader({ name }: { name: string }) {
    const Component = useMemo(() => getOrCreateLazyComponent(name), [name]);

    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center h-full min-h-[100px]">
                    <div className="w-4 h-4 border-2 border-muted-foreground/20 border-t-foreground/50 rounded-full animate-spin" />
                </div>
            }
        >
            <Component />
        </Suspense>
    );
});

// Individual component item with collapsible preview - optimized
function ComponentItem({ name, title, description, href }: ComponentInfo) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);

    // Prefetch on hover (with debounce via requestIdleCallback)
    useEffect(() => {
        if (isHovered && !isExpanded) {
            const id = requestIdleCallback(() => prefetchComponent(name), { timeout: 100 });
            return () => cancelIdleCallback(id);
        }
    }, [isHovered, isExpanded, name]);

    // Intersection observer for viewport-based prefetching
    useEffect(() => {
        const element = itemRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    // Prefetch when component is near viewport
                    requestIdleCallback(() => prefetchComponent(name), { timeout: 500 });
                }
            },
            { rootMargin: "200px" } // Start prefetching 200px before visible
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [name]);

    const handleToggle = useCallback(() => {
        startTransition(() => {
            setIsExpanded((prev) => !prev);
        });
    }, []);

    return (
        <div
            ref={itemRef}
            className="border-b border-edge"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Component Row - Toggle */}
            <button
                type="button"
                onClick={handleToggle}
                className={cn(
                    "w-full flex items-center gap-3 h-12 px-4",
                    "hover:bg-muted/20 transition-colors cursor-pointer",
                    "text-left select-none",
                    isExpanded && "bg-muted/10"
                )}
            >
                <HugeiconsIcon
                    icon={PackageOpenIcon}
                    size={16}
                    className="text-muted-foreground shrink-0"
                />
                <span className="text-sm font-medium text-foreground truncate flex-1">
                    {title}
                </span>
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                >
                    <HugeiconsIcon
                        icon={ArrowDown01Icon}
                        size={14}
                        className="text-muted-foreground"
                    />
                </motion.div>
            </button>

            {/* Collapsible Preview with Motion - FASTER animation */}
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            duration: 0.15, // Reduced from 0.3
                            ease: [0.25, 0.1, 0.25, 1], // Faster ease curve
                            opacity: { duration: 0.1, delay: 0.02 } // Show content earlier
                        }}
                        className="overflow-hidden border-t border-edge"
                    >
                        {/* Interactive Preview Area */}
                        <div className="relative min-h-[200px] flex items-center justify-center p-6 bg-muted/5">
                            <PreviewLoader name={name} />
                        </div>

                        {/* View Docs Link */}
                        <Link
                            href={href}
                            className="flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors border-t border-edge"
                        >
                            View Documentation →
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
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

    // Split components into two columns
    const midpoint = Math.ceil(components.length / 2);
    const leftColumn = components.slice(0, midpoint);
    const rightColumn = components.slice(midpoint);

    return (
        <div className="border-t border-edge">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Column */}
                <div className="md:border-r border-edge">
                    {leftColumn.map((component) => (
                        <ComponentItem key={component.name} {...component} />
                    ))}
                </div>

                {/* Right Column */}
                <div>
                    {rightColumn.map((component) => (
                        <ComponentItem key={component.name} {...component} />
                    ))}
                </div>
            </div>
        </div>
    );
}
