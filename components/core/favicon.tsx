"use client";

import { useState } from "react";
import Image from "next/image";

interface FaviconProps {
    url: string;
    alt: string;
    size?: number;
    className?: string;
}

/**
 * Extracts the base URL from a full URL
 */
function getBaseUrl(url: string): string {
    try {
        const urlObj = new URL(url);
        return `${urlObj.protocol}//${urlObj.hostname}`;
    } catch {
        return url;
    }
}

/**
 * Smart Favicon Component
 * 
 * Fetches favicons with priority order:
 * 1. SVG (highest quality, scalable)
 * 2. PNG (good quality)
 * 3. Google Favicon API (fallback, always works)
 * 
 * Usage:
 * ```tsx
 * <Favicon url="https://gsap.com" alt="GSAP" size={16} />
 * ```
 */
export function Favicon({ url, alt, size = 16, className }: FaviconProps) {
    const [fallbackLevel, setFallbackLevel] = useState(0);
    const baseUrl = getBaseUrl(url);
    const domain = new URL(url).hostname;

    // Priority order: SVG > PNG > Google API
    const faviconSources = [
        `${baseUrl}/favicon.svg`,
        `${baseUrl}/favicon.png`,
        `${baseUrl}/favicon.ico`,
        `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
    ];

    const currentSrc = faviconSources[Math.min(fallbackLevel, faviconSources.length - 1)];

    const handleError = () => {
        if (fallbackLevel < faviconSources.length - 1) {
            setFallbackLevel((prev) => prev + 1);
        }
    };

    return (
        <Image
            src={currentSrc}
            alt={alt}
            width={size}
            height={size}
            className={className}
            onError={handleError}
            unoptimized
        />
    );
}

export default Favicon;
