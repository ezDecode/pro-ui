'use client';

import { useState } from "react";
import { FilterChips } from "@/registry/new-york/ui/filter-chips";

type Category = "all" | "design" | "development" | "marketing";

export default function FilterChipsDemo() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  const filters: Array<{ value: Category; label: string }> = [
    { value: "all", label: "All" },
    { value: "design", label: "Design" },
    { value: "development", label: "Development" },
    { value: "marketing", label: "Marketing" },
  ];

  return (
    <div className="flex items-center justify-center w-full p-8">
      <FilterChips
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        variant="default"
      />
    </div>
  );
}
