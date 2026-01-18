"use client";

import { inspirations, type Inspiration } from "@/lib/inspirations";
import { cn } from "@/lib/utils";
import { RaisedButton } from "@/registry/new-york/ui/raised-button";
import Image from "next/image";
import Link from "next/link";

// X/Twitter icon
function XIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={cn("size-3.5", className)}
            fill="currentColor"
        >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

interface InspirationPillProps {
    inspiration: Inspiration;
}

function InspirationPill({ inspiration }: InspirationPillProps) {
    // Use unavatar.io to fetch Twitter profile pictures
    const avatarUrl = `https://unavatar.io/twitter/${inspiration.handle}`;

    return (
        <Link
            href={inspiration.url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <RaisedButton
                size="sm"
                color="#FDAC16"
                className="rounded-full px-2 pr-3 gap-2"
            >
                {/* Profile Picture */}
                <Image
                    src={avatarUrl}
                    alt={inspiration.name}
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                    unoptimized
                />
                <span>{inspiration.name}</span>
                {/* <XIcon className="opacity-60" /> */}
            </RaisedButton>
        </Link>
    );
}

interface InspirationsSectionProps {
    className?: string;
    title?: string;
    description?: string;
}

export function InspirationsSection({
    className,
    title = "Inspirations & Legends",
    description = "I am inspired by the best designers and developers on the web. (The Absolute best out there!)",
}: InspirationsSectionProps) {
    if (inspirations.length === 0) return null;

    return (
        <section className={cn("space-y-4", className)}>
            <div className="space-y-1">
                <h2 className="text-lg font-semibold">{title}</h2>
                {description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
            <div className="flex flex-wrap gap-2">
                {inspirations.map((inspiration) => (
                    <InspirationPill key={inspiration.handle} inspiration={inspiration} />
                ))}
            </div>
        </section>
    );
}
