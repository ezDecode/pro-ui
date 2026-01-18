import { cn } from "@/lib/utils";

/**
 * Kbd - Simple keyboard shortcut indicator
 * Clean, minimal design that works standalone or inside buttons
 */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
	return (
		<kbd
			data-slot="kbd"
			className={cn(
				"pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded px-1.5 font-mono text-[11px] font-medium select-none",
				"bg-black/10 dark:bg-white/10 text-current",
				className,
			)}
			{...props}
		/>
	);
}

export { Kbd };
