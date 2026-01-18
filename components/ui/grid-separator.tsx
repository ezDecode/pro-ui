import { cn } from "@/lib/utils";

/**
 * GridSeparator Component - Inspired by chanhdai.com
 * Creates a diagonal pattern separator with grid lines
 * Use between sections for visual separation with breathing space
 */

interface GridSeparatorProps {
    className?: string;
    /** Height of the separator in Tailwind units (default: h-10) */
    size?: "sm" | "md" | "lg" | "xl";
    /** Whether to show the diagonal pattern (default: true) */
    showPattern?: boolean;
}

const sizeClasses = {
    sm: "h-6",
    md: "h-10",
    lg: "h-16",
    xl: "h-24",
};

export function GridSeparator({ className, size = "md", showPattern = true }: GridSeparatorProps) {
    return (
        <div
            data-slot="grid-separator"
            className={cn(
                "relative flex w-full border-x border-edge",
                sizeClasses[size],
                showPattern && "grid-pattern-stripe",
                className
            )}
        />
    );
}

/**
 * SimpleGridLine - A simple horizontal line that spans the viewport
 */
interface SimpleGridLineProps {
    className?: string;
    position?: "top" | "bottom" | "both";
}

export function SimpleGridLine({ className, position = "both" }: SimpleGridLineProps) {
    return (
        <div
            data-slot="simple-grid-line"
            className={cn(
                "w-full border-x border-edge",
                position === "top" && "screen-line-before",
                position === "bottom" && "screen-line-after",
                position === "both" && "screen-line-before screen-line-after",
                className
            )}
        />
    );
}
