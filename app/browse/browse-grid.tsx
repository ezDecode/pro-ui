"use client";

import { ArrowDown01Icon, ArrowUp01Icon, HugeiconsIcon, PackageOpenIcon } from "@/components/icons";
import type { ComponentInfo } from "@/lib/components";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Suspense, lazy, useMemo, useState } from "react";

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

// Individual component item with collapsible preview
function ComponentItem({ name, title, description, href }: ComponentInfo) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="border-b border-edge">
            {/* Component Row - Toggle */}
            <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
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
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    <HugeiconsIcon
                        icon={ArrowDown01Icon}
                        size={14}
                        className="text-muted-foreground"
                    />
                </motion.div>
            </button>

            {/* Collapsible Preview with Motion */}
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1],
                            opacity: { duration: 0.2 }
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
