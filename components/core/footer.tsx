"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import type { NavSection } from "@/types/nav-item";

interface FooterProps {
  navigation?: NavSection[];
}

/**
 * Footer - Dynamic universal site footer
 * Renders all sections (Socials, Welcome, Components) from navigation data
 */
export function Footer({ navigation = [] }: FooterProps) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTime(istTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Helper to check if a link is external
  const isExternalLink = (href: string) => {
    return href.startsWith("http://") || href.startsWith("https://");
  };

  // Calculate grid columns based on number of sections
  const gridCols = navigation.length === 0 ? 1 : Math.min(navigation.length, 3);
  const gridColsClass =
    gridCols === 1
      ? "grid-cols-1"
      : gridCols === 2
        ? "grid-cols-2"
        : "grid-cols-2 sm:grid-cols-3";

  return (
    <footer className="w-full border-t border-border pt-10 pb-8 mt-16">
      <div className="flex flex-col gap-10">
        {/* Navigation Grid - Dynamic Sections */}
        {navigation.length > 0 && (
          <div className={`grid ${gridColsClass} gap-8`}>
            {navigation.map((section, sectionIndex) => (
              <div
                key={section.title}
                className={`space-y-4 ${sectionIndex === navigation.length - 1 && navigation.length > 2
                  ? "col-span-2 sm:col-span-1"
                  : ""
                  }`}
              >
                <h3 className="text-sm font-medium text-foreground">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        {...(isExternalLink(item.href)
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Copyright + Time */}
        <div className="flex flex-col items-center gap-2 pt-6 border-t border-border/50">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="tabular-nums font-mono">{time || "00:00:00"} IST</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
