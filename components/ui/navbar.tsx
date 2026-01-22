"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { CommandMenu } from "@/components/core/command-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import type { NavSection } from "@/types/nav-item";
import { Kbd } from "./kbd";

interface NavbarProps {
  navigation: NavSection[];
}

export function Navbar({ navigation }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background px-2">
      {/* Outer container with grid lines */}
      <div
        className={cn(
          "screen-line-before screen-line-after",
          "mx-auto flex h-14 items-center justify-center border-x border-edge px-3",
          "md:max-w-3xl"
        )}
      >
        {/* Inner navbar container */}
        <div className="flex w-full items-center justify-between gap-4 px-2">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity shrink-0"
            aria-label="Home"
          >
            <Image
              src="/media/Lumino.png"
              alt="Logo"
              width={36}
              height={36}
              className="aspect-square active:scale-[0.97]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {!pathname?.startsWith("/docs") && (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/docs"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-muted/50 focus:bg-transparent h-9 px-4 text-sm",
                        pathname?.startsWith("/docs")
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      Documentation
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right side: Search + Theme */}
          <div className="flex items-center gap-2">
            {/* Search Button - Simple styled for both themes */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={cn(
                "inline-flex items-center gap-3 h-9 px-3 rounded-lg",
                "text-sm font-normal text-muted-foreground",
                "bg-muted/50 hover:bg-muted",
                "border border-border/50 hover:border-border",
                "transition-colors duration-150",
                "cursor-pointer"
              )}
            >
              <span className="hidden sm:inline-flex">Search...</span>
              <span className="inline-flex items-center gap-1">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </span>
            </button>

            <ThemeToggle />
          </div>
        </div>
      </div>
      <CommandMenu open={open} setOpen={setOpen} navigation={navigation} />
    </header>
  );
}
