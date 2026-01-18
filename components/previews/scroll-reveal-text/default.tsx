'use client';

import { useRef } from "react";
import { ScrollRevealTextFramer } from "@/registry/new-york/ui/scroll-reveal-text";

export default function ScrollRevealTextDemo() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollContainerRef}
      className="h-[600px] w-full overflow-y-auto bg-background"
    >
      <ScrollRevealTextFramer
        phrase="This text will reveal word by word as you scroll down through the content creating a beautiful and engaging reading experience"
        highlightWords={["reveal", "scroll", "beautiful"]}
        primaryColor="#ff6b00"
        scrollContainerRef={scrollContainerRef}
      />
    </div>
  );
}
