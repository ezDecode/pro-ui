"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { HugeiconsIcon, Moon02Icon, Sun03Icon } from "@/components/icons";
import { BadgeButton } from "@/registry/new-york/ui/badge-button";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const isDark = theme === "dark";

	return (
		<BadgeButton
			aria-label="Toggle theme"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			className="h-9 w-9 rounded-lg"
			size="icon"
			color={isDark ? "#27272a" : "#18181b"}
		>
			{isDark ? (
				<HugeiconsIcon icon={Moon02Icon} size={18} />
			) : (
				<HugeiconsIcon icon={Sun03Icon} size={18} />
			)}
		</BadgeButton>
	);
}
