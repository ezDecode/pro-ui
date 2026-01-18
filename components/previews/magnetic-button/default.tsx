'use client';

import MagneticButton from "@/registry/new-york/ui/magnetic-button";

export default function MagneticButtonDemo() {
  return (
    <div className="flex items-center justify-center w-full p-12">
      <MagneticButton
        hoverVariant="light"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
      >
        Hover over me
      </MagneticButton>
    </div>
  );
}
