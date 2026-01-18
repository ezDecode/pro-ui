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
import { Kbd, KbdGroup } from "./kbd";
import { RaisedButton } from "@/registry/new-york/ui/raised-button";

interface NavbarProps {
  navigation: NavSection[];
}

export function Navbar({ navigation }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background px-2 py-3">
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
              src="/media/img_logo.png"
              alt="Logo"
              width={36}
              height={36}
              className="aspect-square"
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
            {/* Search Button */}
            <RaisedButton
              type="button"
              onClick={() => setOpen(true)}
              size="sm"
              color="#27272a"
              className="px-3 text-muted-foreground hover:text-foreground font-normal"
            >
              <span className="hidden sm:inline-flex mr-2">Search...</span>
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </RaisedButton>

            <ThemeToggle />
          </div>
        </div>
      </div>
      <CommandMenu open={open} setOpen={setOpen} navigation={navigation} />
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
