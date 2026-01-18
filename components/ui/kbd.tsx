import { cn } from "@/lib/utils";

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
	return (
		<kbd
			data-slot="kbd"
			className={cn(
				"bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium select-none",
				"[&_svg:not([class*='size-'])]:size-3",
				"[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
				className,
			)}
			{...props}
		/>
	);
}

/**
 * KbdGroup - Groups keyboard shortcuts with RaisedButton-like styling
 * Has gradient overlay, subtle border, and shadow similar to RaisedButton
 */
function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<kbd
			data-slot="kbd-group"
			className={cn(
				// Base layout
				"inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md",
				// RaisedButton-like styling
				"bg-black/20 dark:bg-white/10",
				"border border-white/20",
				"shadow-sm",
				// Gradient overlay effect
				"relative overflow-hidden",
				"before:absolute before:inset-0 before:rounded-md",
				"before:border-t before:border-white/20",
				"before:bg-gradient-to-b before:from-white/10 before:to-transparent",
				"before:pointer-events-none",
				className
			)}
			{...props}
		/>
	);
}

export { Kbd, KbdGroup };
