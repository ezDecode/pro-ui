import { cn } from "@/lib/utils";

/**
 * Panel Component - Inspired by chanhdai.com
 * Creates grid lines that span the full viewport width
 * Use for sections to create a cohesive grid layout
 */

interface PanelProps extends React.ComponentProps<"section"> {
    children: React.ReactNode;
}

export function Panel({ className, children, ...props }: PanelProps) {
    return (
        <section
            data-slot="panel"
            className={cn(
                "screen-line-before screen-line-after border-x border-edge",
                className
            )}
            {...props}
        >
            {children}
        </section>
    );
}

interface PanelHeaderProps extends React.ComponentProps<"header"> {
    children: React.ReactNode;
}

export function PanelHeader({ className, children, ...props }: PanelHeaderProps) {
    return (
        <header
            data-slot="panel-header"
            className={cn("screen-line-after px-6 py-4", className)}
            {...props}
        >
            {children}
        </header>
    );
}

interface PanelTitleProps extends React.ComponentProps<"h2"> {
    children: React.ReactNode;
}

export function PanelTitle({ className, children, ...props }: PanelTitleProps) {
    return (
        <h2
            data-slot="panel-title"
            className={cn("text-2xl font-semibold tracking-tight", className)}
            {...props}
        >
            {children}
        </h2>
    );
}

interface PanelContentProps extends React.ComponentProps<"div"> {
    children: React.ReactNode;
}

export function PanelContent({ className, children, ...props }: PanelContentProps) {
    return (
        <div
            data-slot="panel-content"
            className={cn("p-6", className)}
            {...props}
        >
            {children}
        </div>
    );
}
