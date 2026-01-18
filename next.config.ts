import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// Pro icon toggle removed; default to free icons without logging

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
			{
				protocol: "http",
				hostname: "**",
			},
		],
	},
	webpack: (config) => {
		return config;
	},
};

// MDX config with serializable plugin references (for Turbopack compatibility)
const withMDX = createMDX({
	options: {
		remarkPlugins: ["remark-gfm", "remark-frontmatter"],
		rehypePlugins: [
			"rehype-slug",
			[
				"rehype-pretty-code",
				{
					theme: {
						dark: "github-dark",
						light: "github-light",
					},
					keepBackground: false,
				},
			],
			[
				"rehype-autolink-headings",
				{
					properties: {
						className: ["anchor"],
						ariaLabel: "Link to section",
					},
				},
			],
		],
	},
});

export default withMDX(nextConfig);
