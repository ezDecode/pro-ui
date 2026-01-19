'use client';

/**
 * Scroll Reveal Text
 * Scroll-locked text reveal animation with word-by-word glassmorphic effects.
 * 
 * @shoutout nvg8.io - The original inspiration for this scroll reveal effect
 * @shoutout Motion (https://motion.dev) - Animation library for scroll-based transitions
 * @author ezDecode(https://github.com/ezDecode)
 */

import { useRef, useMemo, useState, useEffect, memo } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

// ===========================================================================
// TYPES
// ===========================================================================

export interface AnimationConfig {
    leadCount?: number;
    scrollDistance?: number;
    springStiffness?: number;
    springDamping?: number;
}

interface AnimatedWordProps {
    word: string;
    index: number;
    totalWords: number;
    scrollProgress: MotionValue<number>;
    isHighlighted: boolean;
    primaryColor: string;
    leadCount: number;
}

export interface ScrollRevealTextProps {
    /** The text content to be revealed word by word (required) */
    phrase: string;
    /** Optional heading displayed above the text */
    title?: string;
    /** Words to highlight with primary color */
    highlightWords?: string[];
    /** Hex color for highlighted words (e.g., "#ff6b00") */
    primaryColor?: string;
    /** Animation configuration overrides */
    config?: AnimationConfig;
    /** Optional ref to the scrollable container (useful for previews) */
    scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
    /** Optional height of the reveal view (default: "100vh") */
    containerHeight?: string | number;
    /** Optional className for the outer container */
    className?: string;
    /** Optional manual progress for virtual scrolling (Ghost Wheel) */
    manualScrollProgress?: MotionValue<number>;
}


// ===========================================================================
// CONFIGURATION
// ===========================================================================

/**
 * ANIMATION MECHANICS EXPLAINED:
 * 
 * 1. Timeline: The total scroll height is mapped to a 0 to 1 progress value.
 *    0% = Top of container, 100% = Bottom of container.
 * 
 * 2. Word Windows: Each word is assigned a specific "slot" in time (0.0 to 1.0).
 *    The formula is: 1 / (TotalWords + LeadCount + PaddingDuration)
 * 
 * 3. Buffer Logic: We adds 'paddingDuration' to the denominator to ensure the
 *    animation finishes slightly BEFORE the user hits the absolute bottom.
 *    [ Word 1 ... Word N ... | ... Buffer ... ]
 */

const ANIMATION_CONFIG = {
    // How many words "ahead" of the current one should start animating
    // Higher = wider spread of visible words. Lower = more focused one-by-one feel.
    leadCount: { desktop: 12, mobile: 8 },

    // How many pixels of scroll corresponds to one word's animation duration.
    // Higher = Slower scroll/reading speed. Lower = Faster.
    scrollDistance: { desktop: 60, mobile: 40 },

    // Extra "virtual words" of range added to the end. 
    // This creates a static buffer so the text stays pinned/visible for a bit 
    // after the animation completes, preventing it from scrolling away instantly.
    paddingDuration: 0,

    spring: { stiffness: 200, damping: 40, restDelta: 0.001 },
    phases: {
        emergence: { start: 0, end: 0.1 },    // Word starts entering (opacity 0->0.3)
        focus: { start: 0.1, end: 0.5 },      // Word is the "current" one (opacity 1, scale!)
        reveal: { start: 0.5, end: 0.8 }      // Word is finished well before scroll end
    }
} as const;

// ===========================================================================
// UTILITIES
// ===========================================================================

const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return "255, 107, 0";
    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)].join(", ");
};

const isWordHighlighted = (word: string, highlightWords: string[]): boolean => {
    if (!highlightWords?.length) return false;
    return highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase()));
};

// ===========================================================================
// ANIMATED WORD COMPONENT
// ===========================================================================

/**
 * Memoized animated word component for optimal performance.
 * Each word gets its own animation timing based on scroll position.
 */
const AnimatedWord = memo(function AnimatedWord({
    word, index, totalWords, scrollProgress, isHighlighted, primaryColor, leadCount,
}: AnimatedWordProps) {
    const rgb = hexToRgb(primaryColor);
    const { phases } = ANIMATION_CONFIG;

    // Calculate this word's animation window within the total scroll
    // detailed: logic ensures last word finishes BEFORE scroll ends (buffer = paddingDuration)
    const wordWindowSize = 1 / (totalWords + leadCount + ANIMATION_CONFIG.paddingDuration);
    const wordStart = index * wordWindowSize;
    const wordEnd = (index + leadCount + 1) * wordWindowSize;
    const phaseToScroll = (phase: number) => wordStart + (wordEnd - wordStart) * phase;

    const boxOpacity = useTransform(scrollProgress,
        [phaseToScroll(phases.emergence.start), phaseToScroll(phases.emergence.end), phaseToScroll(phases.focus.end), phaseToScroll(phases.reveal.end)],
        [0, 0.3, 1, 0]
    );

    const boxScale = useTransform(scrollProgress,
        [phaseToScroll(phases.emergence.start), phaseToScroll(phases.emergence.end), phaseToScroll(phases.focus.end), phaseToScroll(phases.reveal.end)],
        [0.92, 0.97, 1, 1.03]
    );

    const boxBlur = useTransform(scrollProgress,
        [phaseToScroll(phases.reveal.start), phaseToScroll(phases.reveal.end)],
        [0, 10]
    );

    const bgOpacity = useTransform(scrollProgress,
        [phaseToScroll(phases.emergence.start), phaseToScroll(phases.focus.start), phaseToScroll(phases.focus.end)],
        [0.08, 0.25, isHighlighted ? 0.5 : 0.4]
    );

    const textOpacity = useTransform(scrollProgress,
        [phaseToScroll(phases.reveal.start), phaseToScroll(phases.reveal.end)],
        [0, 1]
    );

    const textY = useTransform(scrollProgress,
        [phaseToScroll(phases.reveal.start), phaseToScroll(phases.reveal.end)],
        [4, 0]
    );

    return (
        <span className="relative inline-block align-middle mx-[0.12em]">
            <motion.span
                className="relative z-[2] whitespace-nowrap"
                style={{
                    opacity: textOpacity,
                    y: textY,
                    color: isHighlighted ? primaryColor : undefined,
                    textShadow: isHighlighted ? `0 0 20px ${primaryColor}40` : undefined,
                }}
            >
                {word}
            </motion.span>
            <motion.span
                aria-hidden="true"
                className="absolute z-[1] left-1/2 top-1/2 pointer-events-none rounded-full backdrop-blur-[6px]"
                style={{
                    width: '102%',
                    height: '72%',
                    x: "-50%",
                    y: "-50%",
                    opacity: boxOpacity,
                    scale: boxScale,
                    filter: useTransform(boxBlur, (v) => `blur(${v}px)`),
                    backgroundColor: useTransform(bgOpacity, (v) =>
                        isHighlighted ? `rgba(${rgb}, ${v})` : `rgba(255, 255, 255, ${v})`
                    ),
                    border: isHighlighted ? `1px solid rgba(${rgb}, 0.3)` : '1px solid rgba(255, 255, 255, 0.1)',
                }}
            />
        </span>
    );
});


// ===========================================================================
// MAIN COMPONENT
// ===========================================================================

export function ScrollRevealTextFramer({
    phrase = "",
    highlightWords = [],
    title = "",
    primaryColor = "#ff6b00",
    config = {},
    scrollContainerRef,
    containerHeight = "100vh",
    className = "",
    manualScrollProgress,
}: ScrollRevealTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const words = useMemo(() => phrase.split(" "), [phrase]);

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 800);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const leadCount = config.leadCount ?? (isMobile ? ANIMATION_CONFIG.leadCount.mobile : ANIMATION_CONFIG.leadCount.desktop);
    const scrollDistance = config.scrollDistance ?? (isMobile ? ANIMATION_CONFIG.scrollDistance.mobile : ANIMATION_CONFIG.scrollDistance.desktop);

    const springConfig = {
        stiffness: config.springStiffness ?? ANIMATION_CONFIG.spring.stiffness,
        damping: config.springDamping ?? ANIMATION_CONFIG.spring.damping,
        restDelta: ANIMATION_CONFIG.spring.restDelta
    };

    const totalScrollDistance = (words.length + leadCount) * scrollDistance + (ANIMATION_CONFIG.paddingDuration * scrollDistance);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        container: scrollContainerRef,
        offset: ["start start", "end end"]
    });

    const activeProgress = manualScrollProgress || scrollYProgress;
    const smoothProgress = useSpring(activeProgress, springConfig);

    return (
        <div
            ref={containerRef}
            className={`w-full max-w-[100vw] relative isolate ${className}`}
            style={{
                "--reveal-view-height": typeof containerHeight === 'number' ? `${containerHeight}px` : containerHeight,
                height: manualScrollProgress
                    ? "var(--reveal-view-height)"
                    : `calc(${totalScrollDistance}px + var(--reveal-view-height))`,
                backgroundColor: 'var(--color-bg, #0d0d0d)',
                color: 'var(--color-text, #fff)'
            } as React.CSSProperties}
        >
            <div
                className="w-full flex items-center justify-center sticky top-0 z-[1]"
                style={{
                    height: "var(--reveal-view-height)",
                    backgroundColor: 'var(--color-bg, #0d0d0d)'
                }}
            >
                <div
                    className="w-full mx-auto"
                    style={{
                        maxWidth: isMobile ? '100%' : '680px',
                        padding: isMobile ? '0 1rem' : '0 2rem',
                    }}
                >
                    {title && (
                        <h1
                            className="font-bold leading-[1.15]"
                            style={{
                                fontFamily: 'var(--font-poly)',
                                fontSize: isMobile ? 'clamp(1.25rem, 6.8vw, 1.9rem)' : 'clamp(2.15rem, 4.25vw, 4.25rem)',
                                marginBottom: isMobile ? '1.25rem' : '2rem',
                                letterSpacing: '-0.03em',
                                background: 'linear-gradient(to bottom, #fff 40%, #555)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            {title}
                        </h1>
                    )}

                    <div
                        className="flex flex-wrap max-w-full"
                        style={{
                            fontFamily: 'var(--font-poly)',
                            fontSize: isMobile ? 'clamp(0.92rem, 4.1vw, 1.12rem)' : 'clamp(1.22rem, 2.24vw, 1.89rem)',
                            fontWeight: 600,
                            lineHeight: isMobile ? 1.75 : 1.42,
                            rowGap: isMobile ? '0.3em' : '0.18em',
                        }}
                    >
                        {words.map((word, index) => (
                            <AnimatedWord
                                key={index}
                                word={word}
                                index={index}
                                totalWords={words.length}
                                scrollProgress={smoothProgress}
                                isHighlighted={isWordHighlighted(word, highlightWords)}
                                primaryColor={primaryColor}
                                leadCount={leadCount}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScrollRevealTextFramer;
