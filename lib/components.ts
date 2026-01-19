import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface ComponentInfo {
    name: string;
    title: string;
    description: string;
    href: string;
}

const PREVIEWS_PATH = path.join(process.cwd(), "components/previews");
const DOCS_PATH = path.join(process.cwd(), "content/docs/components");

/**
 * Auto-discover all components by scanning the previews directory
 * and reading metadata from corresponding MDX docs
 */
export function getComponents(): ComponentInfo[] {
    const components: ComponentInfo[] = [];

    // Scan previews directory for component folders
    if (!fs.existsSync(PREVIEWS_PATH)) {
        return components;
    }

    const entries = fs.readdirSync(PREVIEWS_PATH, { withFileTypes: true });

    for (const entry of entries) {
        // Skip files (like index.tsx), only process directories
        if (!entry.isDirectory()) continue;

        const componentName = entry.name;
        const previewPath = path.join(PREVIEWS_PATH, componentName, "default.tsx");

        // Check if default.tsx exists
        if (!fs.existsSync(previewPath)) continue;

        // Try to get metadata from MDX docs
        let title = formatTitle(componentName);
        let description = "";

        const mdxPath = path.join(DOCS_PATH, `${componentName}.mdx`);
        if (fs.existsSync(mdxPath)) {
            try {
                const fileContent = fs.readFileSync(mdxPath, "utf8");
                const { data } = matter(fileContent);
                title = data.title || title;
                description = data.description || "";
            } catch {
                // Use defaults if MDX parsing fails
            }
        }

        components.push({
            name: componentName,
            title,
            description,
            href: `/docs/components/${componentName}`,
        });
    }

    // Sort alphabetically by title
    return components.sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Convert kebab-case to Title Case
 */
function formatTitle(name: string): string {
    return name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
