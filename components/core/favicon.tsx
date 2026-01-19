"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

interface FaviconProps {
    url: string;
    alt: string;
    size?: number;
    className?: string;
}

/**
 * Smart Favicon Component
 * 
 * Fetches favicons with priority order:
 * 1. SVG (highest quality, scalable)
 * 2. PNG (good quality)
 * 3. Google Favicon API (fallback, always works)
 * 
 * @example
 * ```tsx
 * <Favicon url="https://gsap.com" alt="GSAP" size={16} />
 * ```
 */
export function Favicon({ url, alt, size = 16, className }: FaviconProps) {
    const [fallbackLevel, setFallbackLevel] = useState(0);

    // Safely parse URL with fallback
    const { baseUrl, domain } = useMemo(() => {
        try {
            const urlObj = new URL(url);
            return {
                baseUrl: `${urlObj.protocol}//${urlObj.hostname}`,
                domain: urlObj.hostname
            };
        } catch {
            // Invalid URL - use Google API as fallback
            return {
                baseUrl: "",
                domain: url.replace(/^https?:\/\//, "").split("/")[0] || "example.com"
            };
        }
    }, [url]);

    // Priority order: SVG > PNG > ICO > Google API
    const faviconSources = useMemo(() => {
        if (!baseUrl) {
            // If we couldn't parse the URL, go straight to Google API
            return [`https://www.google.com/s2/favicons?domain=${domain}&sz=64`];
        }
        return [
            `${baseUrl}/favicon.svg`,
            `${baseUrl}/favicon.png`,
            `${baseUrl}/favicon.ico`,
            `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        ];
    }, [baseUrl, domain]);

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
