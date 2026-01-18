import { DocsSidebar } from "@/components/core/docs-sidebar";

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="border-b">
			{/* Docs: 3-column grid centered to match navbar alignment */}
			{/* Total: 15rem (sidebar) + 52rem (content) + 15rem (TOC) = 82rem */}
			<div className="mx-auto max-w-[82rem] grid grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)_15rem]">
				{/* Left column: Sidebar */}
				<DocsSidebar />

				{/* Center + Right columns: handled by doc-page-layout */}
				{children}
			</div>
		</div>
	);
}
