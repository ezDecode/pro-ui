'use client';

import MagneticButton from "@/registry/new-york/ui/magnetic-button";

export default function MagneticButtonDemo() {
  return (
    <div className="flex items-center justify-center w-full p-12">
      <MagneticButton
        customColor="#ea580c"
        className="px-6 py-3 bg-zinc-900 border border-zinc-800 text-white rounded-full font-medium"
      >
        Hover over me
      </MagneticButton>
    </div>
  );
}
