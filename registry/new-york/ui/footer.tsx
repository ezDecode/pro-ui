"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NavSection } from "@/types/nav-item";

interface FooterProps {
  navigation?: NavSection[];
}

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

  // Extract sections from navigation
  const welcomeSection = navigation.find((s) => s.title === "Welcome");
  const componentsSection = navigation.find((s) => s.title === "Components");
  const socialsSection = navigation.find((s) => s.title === "Socials");

  return (
    <footer className="w-full border-t border-border pt-10 pb-8 mt-16">
      <div className="flex flex-col gap-10">
        {/* Three Column Navigation Grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {/* Socials Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Socials</h3>
            <ul className="space-y-2.5">
              {socialsSection?.items && socialsSection.items.length > 0 ? (
                socialsSection.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link
                      href="https://github.com/ezDecode"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      GitHub
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://x.com/ezDecode"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Twitter
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Welcome Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Welcome</h3>
            <ul className="space-y-2.5">
              {welcomeSection?.items && welcomeSection.items.length > 0 ? (
                welcomeSection.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Introduction
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/contributors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Contributors
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/installation" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Installation
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Components Column */}
          <div className="space-y-4 col-span-2 sm:col-span-1">
            <h3 className="text-sm font-semibold text-foreground">Components</h3>
            <ul className="space-y-2.5">
              {componentsSection?.items && componentsSection.items.length > 0 ? (
                componentsSection.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))
              ) : (
                <>

                  <li>
                    <Link href="/docs/components/filter-chips" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Filter Chips
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/components/magnetic-button" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Magnetic Button
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/components/scroll-reveal-text" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Scroll Reveal Text
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Row: Copyright + Live Time */}
        <div className="flex flex-col items-center gap-2 pt-6 border-t border-border/50">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} CreativeSky Media. All rights reserved.</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="tabular-nums font-mono">{time || "00:00:00"} IST</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
