'use client';

import { AdaptiveTooltip } from "@/registry/new-york/ui/adaptive-tooltip";

export default function AdaptiveTooltipDemo() {
  const items = [
    {
      icon: <span>🔍</span>,
      label: "Search",
      shortcut: [<kbd key="cmd">⌘</kbd>, <kbd key="k">K</kbd>],
    },
    {
      icon: <span>⚙️</span>,
      label: "Settings",
      hasBadge: true,
    },
    {
      icon: <span>❓</span>,
      label: "Help",
    },
  ];

  return (
    <div className="flex items-center justify-center w-full p-8">
      <AdaptiveTooltip items={items} />
    </div>
  );
}
