import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/siteConfig";

// OG Image dimensions
const WIDTH = 1200;
const HEIGHT = 630;

// Shared styles - Using Geist font
const styles = {
	title: {
		display: "flex",
		fontSize: "72px",
		fontWeight: 600,
		fontFamily: "Geist",
		color: "#000000",
		letterSpacing: "-0.03em",
		lineHeight: 1.1,
	},
	subtitle: {
		display: "flex",
		fontSize: "64px",
		fontWeight: 600,
		fontFamily: "Geist",
		color: "#6b7280",
	},
} as const;

// Load font from Google Fonts API for a specific weight
async function loadGoogleFont(font: string, weight: number) {
	const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}`;
	const css = await (await fetch(url)).text();
	const resource = css.match(
		/src: url\((.+)\) format\('(opentype|truetype)'\)/,
	);

	if (resource) {
		const response = await fetch(resource[1]);
		if (response.status === 200) {
			return await response.arrayBuffer();
		}
	}

	throw new Error("failed to load font data");
}

type OGImageType = "default" | "docs" | "component";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	const type = (searchParams.get("type") as OGImageType) || "default";
	const title = searchParams.get("title") || "";
	const componentName = searchParams.get("name") || "";

	// Get base URL from request for local dev, or use siteConfig for production
	const requestUrl = new URL(request.url);
	const baseUrl =
		process.env.NODE_ENV === "development"
			? `${requestUrl.protocol}//${requestUrl.host}`
			: siteConfig.url;

	const iconUrl = `${baseUrl}/media/img_logo.png`;

	try {
		// Load Geist font weights from Google Fonts
		const [fontRegular, fontMedium, fontSemiBold, fontBold] = await Promise.all(
			[
				loadGoogleFont("Geist", 400),
				loadGoogleFont("Geist", 500),
				loadGoogleFont("Geist", 600),
				loadGoogleFont("Geist", 700),
			],
		);

		// Determine title and subtitle based on type
		const displayTitle = getDisplayTitle(type, title, componentName);
		const subtitle = getSubtitle(type);

		return new ImageResponse(
			<OGLayout iconUrl={iconUrl} iconSize={200}>
				<Title>{displayTitle}</Title>
				<Subtitle>{subtitle}</Subtitle>
			</OGLayout>,
			{
				width: WIDTH,
				height: HEIGHT,
				fonts: [
					{ name: "Geist", data: fontRegular, weight: 400, style: "normal" },
					{ name: "Geist", data: fontMedium, weight: 500, style: "normal" },
					{ name: "Geist", data: fontSemiBold, weight: 600, style: "normal" },
					{ name: "Geist", data: fontBold, weight: 700, style: "normal" },
				],
			},
		);
	} catch (e) {
		console.error("OG Image generation error:", e);
		return new Response("Failed to generate the image", { status: 500 });
	}
}

// Helper functions
function getDisplayTitle(
	type: OGImageType,
	title: string,
	componentName: string,
): string {
	switch (type) {
		case "docs":
			return title;
		case "component":
			return componentName
				.split("-")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ");
		default:
			return "Skie — Component Library";
	}
}

function getSubtitle(type: OGImageType): string {
	switch (type) {
		case "docs":
			return "Skie — Design Engineer";
		case "component":
			return "Skie Component";
		default:
			return "ui.creativesky.me";
	}
}

// Reusable components
function OGLayout({
	iconUrl,
	iconSize = 120,
	children,
}: {
	iconUrl: string;
	iconSize?: number;
	children: React.ReactNode;
}) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				justifyContent: "center",
				width: "100%",
				height: "100%",
				backgroundColor: "#ffffff",
				padding: "80px 100px",
			}}
		>
			<img
				src={iconUrl}
				alt="Skie"
				width={iconSize}
				height={iconSize}
				style={{ marginBottom: "30px" }}
			/>
			{children}
		</div>
	);
}

function Title({ children }: { children: React.ReactNode }) {
	return (
		<div style={{ ...styles.title, marginBottom: "10px" }}>{children}</div>
	);
}

function Subtitle({ children }: { children: React.ReactNode }) {
	return <div style={styles.subtitle}>{children}</div>;
}

