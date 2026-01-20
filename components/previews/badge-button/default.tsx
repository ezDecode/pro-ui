'use client';

import { BadgeButton } from "@/registry/new-york/ui/badge-button";

export default function BadgeButtonDemo() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4 w-full p-8">
            {/* Default size with color */}
            <BadgeButton color="#FDAC16">
                Primary Action
            </BadgeButton>

            {/* Small size */}
            <BadgeButton size="sm" color="#1e3a5f">
                Small
            </BadgeButton>

            {/* Icon button */}
            <BadgeButton size="icon" color="#3b3b3b">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                </svg>
            </BadgeButton>

            {/* Without color (neutral) */}
            <BadgeButton>
                Neutral
            </BadgeButton>
        </div>
    );
}
