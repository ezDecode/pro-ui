"use client";

import React, { useRef } from 'react';
import { ScrollRevealTextFramer } from "@/registry/new-york/ui/scroll-reveal-text";

/**
 * ScrollRevealTextDemo
 * 
 * Demonstrates the ScrollRevealText component within a scrollable frame.
 * Includes a local scroll container to ensure the "sticky reveal" effect works 
 * perfectly within the component preview box.
 */
export default function ScrollRevealTextDemo() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollContainerRef}
      className="h-[400px] w-full overflow-y-auto bg-zinc-900 rounded-lg relative"
      // @ts-ignore
      style={{ "--reveal-view-height": "400px" }}
    >

      <ScrollRevealTextFramer
        phrase="Beneath yesterday's dreams, possibility whispers to those who listen. Every moment becomes a doorway, inviting us to discover what we never knew we were searching for. Buy pro to get the code!!"
        highlightWords={["possibility", "doorway", "invitation"]}
        primaryColor="#ff6b00"
        scrollContainerRef={scrollContainerRef}
        containerHeight="400px"
      />
    </div>
  );
}
