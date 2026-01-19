import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
    title: "Browse Components — Skie",
    description:
        "Explore all available React components. Beautiful, accessible UI components with motion design and smooth interactions.",
    keywords: [
        "React Components",
        "UI Library",
        "Component Gallery",
        "Motion Design",
        "Free Components",
    ],
    url: "/browse",
});

export default function BrowseLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
