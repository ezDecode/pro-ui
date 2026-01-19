"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ScrollRevealTextFramer } from "@/registry/new-york/ui/scroll-reveal-text";

/**
 * ScrollRevealTextDemo
 * 
 * Demonstrates the ScrollRevealText component within a scrollable frame.
 * Includes a local scroll container to ensure the "sticky reveal" effect works 
 * perfectly within the component preview box.
 */
export default function ScrollRevealTextDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Ghost Wheel: Track virtual scroll progress (0.0 to 1.0)
  const progress = useMotionValue(0);

  React.useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      // SENSITIVITY: Adjusts how fast the "ghost wheel" spins.
      const SENSITIVITY = 0.0005;

      const current = progress.get();
      const delta = e.deltaY;
      let newProgress = current + (delta * SENSITIVITY);
      newProgress = Math.max(0, Math.min(1, newProgress));

      // SMART SCROLL CAPTURE Logic
      const isAtStart = current <= 0;
      const isAtEnd = current >= 1;
      const isScrollingDown = delta > 0;
      const isScrollingUp = delta < 0;

      // We want to capture the scroll (lock the page) if:
      // 1. We are in the middle of the animation
      // 2. We are at the start and trying to scroll DOWN (enter animation)
      // 3. We are at the end and trying to scroll UP (re-enter animation)
      const shouldCapture =
        (current > 0 && current < 1) ||
        (isAtStart && isScrollingDown) ||
        (isAtEnd && isScrollingUp);

      if (shouldCapture) {
        // This is the magic line. It physically stops the browser window from scrolling.
        e.preventDefault();
        e.stopPropagation();
        progress.set(newProgress);
      }
    };

    // { passive: false } is REQUIRED for preventDefault to work on wheel events
    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [progress]);

  return (
    <div
      ref={containerRef}
      className="h-[400px] w-full bg-[#0d0d0d] rounded-lg relative overflow-hidden cursor-ns-resize"
      // @ts-ignore
      style={{ "--reveal-view-height": "400px" }}
    >
      <ScrollRevealTextFramer
        phrase="Beneath yesterday's dreams, possibility whispers to those who listen. Every moment becomes a doorway, inviting us to discover what we never knew we were searching for. Buy pro to get the code!!"
        highlightWords={["possibility", "doorway", "invitation"]}
        primaryColor="#ff6b00"
        containerHeight="400px"
        manualScrollProgress={progress}
      />

      {/* Optional: Visual Scroll Indicator (Subtle) */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 h-24 w-1 bg-white/10 rounded-full">
        <motion.div
          className="w-full bg-white/50 rounded-full"
          style={{
            height: "20%",
            top: useTransform(progress, [0, 1], ["0%", "80%"]),
            position: "absolute"
          }}
        />
      </div>
    </div>
  );
}
