import { cn } from "@/lib/utils";

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="w-full">
			{/* Patterned header section like ncdai */}
			<div
				className={cn(
					"h-8 px-2",
					"screen-line-after",
					"grid-pattern-stripe"
				)}
			/>
			{children}
		</div>
	);
}

