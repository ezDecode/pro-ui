"use client";

import Link from "next/link";
import { RaisedButton } from "@/registry/new-york/ui/raised-button";
import { Favicon } from "./favicon";

interface ShoutoutProps {
    /** The URL to link to (favicon will be auto-fetched) */
    url: string;
    /** Label text to display */
    label: string;
    /** Optional additional text */
    description?: string;
    /** Button color (hex) - defaults to a neutral dark */
    color?: string;
    className?: string;
}

/**
 * Shoutout - Premium "Credit Chip" using RaisedButton styling
 * Uses smart Favicon component with SVG > PNG > Google API fallback
 * 
 * Features:
 * - Uses the signature RaisedButton 3D effect
 * - Auto-fetched favicon with multi-format support
 * - Consistent with the rest of the UI library
 * 
 * Usage:
 * ```tsx
 * <Shoutout 
 *   url="https://gsap.com" 
 *   label="GSAP" 
 *   description="Animation library"
 *   color="#88ce02"
 * />
 * ```
 */
export function Shoutout({ url, label, description, color = "#27272a", className }: ShoutoutProps) {
    return (
        <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block ${className ?? ""}`}
        >
            <RaisedButton
                size="sm"
                color={color}
                className="rounded-full pl-1.5 pr-3 py-1 h-auto gap-2 font-normal"
            >
                {/* Favicon Container */}
                <span className="
					flex items-center justify-center
					w-5 h-5 rounded-full
					overflow-hidden
					shrink-0
				">
                    <Favicon
                        url={url}
                        alt={`${label} icon`}
                        size={14}
                        className="object-contain"
                    />
                </span>

                {/* Text Content */}
                <span className="flex items-center gap-1.5 text-xs">
                    <span className="opacity-70">Inspired by</span>
                    <span className="font-semibold">{label}</span>
                    {description && (
                        <span className="opacity-50 hidden sm:inline">— {description}</span>
                    )}
                </span>

                {/* Arrow Icon */}
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-60 ml-0.5"
                >
                    <path
                        d="M6 3L11 8L6 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </RaisedButton>
        </Link>
    );
}

export default Shoutout;
