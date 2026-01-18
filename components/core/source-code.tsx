import { getSourceCode } from "@/lib/source";
import { SourceCodeClient } from "./source-code-client";

interface SourceCodeProps {
	/** Component name (e.g., "magnetic-button") - will look in registry/new-york/ui/{name}.tsx */
	name?: string;
	/** Full file path relative to project root */
	filePath?: string;
	/** Display title (auto-generated if not provided) */
	title?: string;
	/** Code language for syntax highlighting */
	language?: string;
}

/**
 * Generate a display title from the file path
 */
function generateTitle(filePath: string): string {
	return filePath.replace(/^registry\/[^/]+\//, "components/");
}

/**
 * Server component to display source code from a file
 * 
 * Usage in MDX:
 * ```mdx
 * // By component name (recommended)
 * <SourceCode name="magnetic-button" />
 * 
 * // By full path
 * <SourceCode filePath="registry/new-york/ui/filter-chips.tsx" />
 * ```
 */
export function SourceCode({ name, filePath, title, language }: SourceCodeProps) {
	// Determine file path from name or use provided filePath
	const resolvedPath = filePath || (name ? `registry/new-york/ui/${name}.tsx` : "");

	if (!resolvedPath) {
		return <div className="text-red-500">Error: Provide either name or filePath prop</div>;
	}

	const code = getSourceCode(resolvedPath);
	const lang = language || resolvedPath.split(".").pop() || "tsx";
	const displayTitle = title || generateTitle(resolvedPath);

	return <SourceCodeClient code={code} title={displayTitle} language={lang} />;
}
