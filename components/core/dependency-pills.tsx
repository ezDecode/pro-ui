"use client";

import Link from "next/link";
import { RaisedButton } from "@/registry/new-york/ui/raised-button";
import { Favicon } from "./favicon";

interface Dependency {
    name: string;
    url: string;
    color?: string;
}

interface DependencyPillsProps {
    dependencies: Dependency[];
    className?: string;
}

/**
 * DependencyPills - Displays a list of dependencies as pill-shaped buttons
 * Uses smart Favicon component with SVG > PNG > Google API fallback
 * 
 * Usage:
 * ```tsx
 * <DependencyPills 
 *   dependencies={[
 *     { name: "React", url: "https://react.dev", color: "#61dafb" },
 *     { name: "Motion", url: "https://motion.dev", color: "#f5f530" },
 *     { name: "GSAP", url: "https://gsap.com", color: "#88ce02" },
 *   ]} 
 * />
 * ```
 */
export function DependencyPills({ dependencies, className }: DependencyPillsProps) {
    return (
        <div className={`flex flex-wrap items-center gap-2 ${className ?? ""}`}>
            {dependencies.map((dep) => (
                <Link
                    key={dep.name}
                    href={dep.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <RaisedButton
                        size="sm"
                        color={dep.color ?? "#27272a"}
                        className="rounded-full px-3 py-1.5 h-auto gap-2 font-medium text-xs"
                    >
                        <Favicon
                            url={dep.url}
                            alt={`${dep.name} icon`}
                            size={16}
                            className="shrink-0"
                        />
                        {dep.name}
                    </RaisedButton>
                </Link>
            ))}
        </div>
    );
}

export default DependencyPills;
