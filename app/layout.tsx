import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { NavbarWrapper } from "@/components/core/navbar-wrapper";
import { QueryProvider } from "@/components/providers/query-provider";
import {
	generateOrganizationSchema,
	generateSEO,
	generateWebsiteSchema,
} from "@/lib/seo";

// Geist Sans - Primary font
const geistSans = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
	display: "swap",
});

// Geist Mono - Monospace font
const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono",
	display: "swap",
});

export const metadata: Metadata = {
	...generateSEO(),
	metadataBase: new URL("https://ui.creativesky.me"),
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
			className={`${geistSans.variable} ${geistMono.variable}`}
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
			<body className={`${geistSans.className} min-h-screen bg-background antialiased overflow-x-hidden`}>
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



