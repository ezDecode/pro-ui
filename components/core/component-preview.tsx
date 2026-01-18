import type * as React from "react";
import { getPreviewComponent } from "@/components/previews";
import { getSourceCode } from "@/lib/source";
import { ComponentPreviewClient } from "./component-preview-client";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Component path in previews folder (e.g., "magnetic-button/default") */
	name?: string;
	/** Direct code string (alternative to name) */
	code?: string;
	/** Custom filename for download (defaults to component name) */
	filename?: string;
	/** Children to render if no name is provided */
	children?: React.ReactNode;
}

/**
 * Server component for component preview
 * Reads source code and dynamically loads preview component
 * 
 * Usage:
 * - With name: <ComponentPreview name="magnetic-button/default" />
 * - With code: <ComponentPreview code={`const x = 1;`} />
 */
export async function ComponentPreview({
	name,
	code,
	filename,
	children,
	...props
}: ComponentPreviewProps) {
	let sourceCode = code || "";
	let PreviewComponent = null;
	let downloadFilename = filename || "component.tsx";

	// If name is provided, read code and dynamically load component
	// Name format: component/variant (e.g., "magnetic-button/default")
	if (name) {
		const previewPath = `components/previews/${name}.tsx`;
		sourceCode = getSourceCode(previewPath);
		PreviewComponent = await getPreviewComponent(name);

		// Generate filename from path if not provided
		if (!filename) {
			const parts = name.split("/");
			downloadFilename = `${parts[parts.length - 1] || parts[0]}.tsx`;
		}
	}

	return (
		<ComponentPreviewClient
			code={sourceCode}
			filename={downloadFilename}
			{...props}
		>
			{PreviewComponent ? <PreviewComponent /> : children}
		</ComponentPreviewClient>
	);
}
