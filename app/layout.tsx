import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { NavbarWrapper } from "@/components/core/navbar-wrapper";
import { QueryProvider } from "@/components/providers/query-provider";
import {
	generateOrganizationSchema,
	generateSEO,
	generateWebsiteSchema,
} from "@/lib/seo";

const instrumentSerif = Instrument_Serif({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-instrument-serif",
	display: "swap",
});

export const metadata: Metadata = {
	...generateSEO(),
	metadataBase: new URL("https://skie.dev"),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const organizationSchema = generateOrganizationSchema();
	const websiteSchema = generateWebsiteSchema();

	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={instrumentSerif.variable}
		>
			<head>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
				/>
				{/* JSON-LD Structured Data for better SEO */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(organizationSchema),
					}}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
				/>
			</head>
			<body className="min-h-screen bg-background font-sans antialiased overflow-x-hidden">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<QueryProvider>
						{/* Navbar - handles its own grid lines */}
						<NavbarWrapper />
						{/* Main content area with grid container for consistent alignment */}
						<main className="max-w-screen overflow-x-hidden px-2">
							<div className="mx-auto max-w-3xl border-x border-edge min-h-[calc(100vh-4rem)] px-4">
								{children}
							</div>
						</main>
					</QueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
