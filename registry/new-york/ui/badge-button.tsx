"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import {
    getContrastColor,
    getLuminance,
    parseColor,
} from "@/lib/utils/colorUtils";

const badgeButtonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.97] gap-2",
    {
        variants: {
            variant: {
                default: "",
            },
            size: {
                default: "h-10 px-4 py-2 rounded-xl",
                sm: "h-9 rounded-lg px-3",
                lg: "h-11 rounded-lg px-8",
                icon: "h-10 w-10 rounded-lg",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface BadgeButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof badgeButtonVariants> {
    color?: string;
}

const BadgeButton = React.forwardRef<HTMLButtonElement, BadgeButtonProps>(
    ({ className, variant, size, color, style = {}, ...props }, ref) => {
        const dynamicStyles = React.useMemo(() => {
            if (!color) {
                // Default neutral style (dark theme friendly)
                return {
                    backgroundColor: "var(--badge-button-bg, rgba(255, 255, 255, 0.08))",
                    color: "var(--badge-button-text, rgba(255, 255, 255, 0.9))",
                    border: "1px solid rgba(255, 255, 255, 0)",
                    boxShadow: `
						0px 1px 0.6px 0px rgba(255, 255, 255, 0.14) inset,
						0px 0.6px 3.5px rgba(0, 0, 0, 0.44)
					`.trim(),
                };
            }

            try {
                const rgb = parseColor(color);
                if (!rgb) return {};

                const luminance = getLuminance(rgb);
                const textColor = getContrastColor(luminance);

                // Adjust inner shine based on luminance (lighter colors get stronger shine)
                const shineColor = luminance > 0.5
                    ? `rgba(255, 255, 255, 0.28)`
                    : `rgba(255, 255, 255, 0.14)`;

                const shadowColor = `rgba(${Math.max(0, rgb.r - 30)}, ${Math.max(0, rgb.g - 30)}, ${Math.max(0, rgb.b - 30)}, 0.44)`;

                return {
                    backgroundColor: color,
                    color: textColor,
                    border: "1px solid rgba(255, 255, 255, 0)",
                    boxShadow: `
						0px 1px 0.6px 0px ${shineColor} inset,
						0px 0.6px 3.5px ${shadowColor}
					`.trim(),
                };
            } catch (e) {
                console.error("Error processing color:", e);
                return {};
            }
        }, [color]);

        return (
            <button
                className={cn(badgeButtonVariants({ variant, size, className }))}
                ref={ref}
                style={{
                    ...style,
                    ...dynamicStyles,
                }}
                {...props}
            />
        );
    },
);
BadgeButton.displayName = "BadgeButton";

export { badgeButtonVariants, BadgeButton };
