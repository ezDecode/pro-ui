"use client";

import { Shoutout } from "@/components/core/shoutout";

interface Credit {
    url: string;
    label: string;
    color?: string;
}

interface CreditNoteProps {
    /** Credits to display as badges */
    credits?: Credit[];
}

/**
 * CreditNote - A simple note for component docs with inline credit badges
 * 
 * Usage in MDX:
 * ```mdx
 * <CreditNote credits={[
 *   { url: "https://gsap.com", label: "GSAP", color: "#88ce02" }
 * ]} />
 * ```
 */
export function CreditNote({ credits = [] }: CreditNoteProps) {
    return (
        <div className="mt-12 pt-6 border-t border-border/50 text-sm text-muted-foreground leading-relaxed">
            <p className="mb-4">
                <strong className="text-foreground/70">Note:</strong> Most components here are recreations of the best out there. I don't claim to be the original creator. This is my attempt to reverse-engineer, replicate, and often add a few extra features. I've tried to credit everyone, but if I missed something, let me know.
            </p>

            {credits.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {credits.map((credit) => (
                        <Shoutout
                            key={credit.url}
                            url={credit.url}
                            label={credit.label}
                            color={credit.color}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CreditNote;
