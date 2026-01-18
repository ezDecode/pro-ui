import { DocsSidebar } from "@/components/core/docs-sidebar";

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="border-b">
			<div className="items-start md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:gap-4 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-6 px-4">
				<DocsSidebar />
				{children}
			</div>
		</div>
	);
}
