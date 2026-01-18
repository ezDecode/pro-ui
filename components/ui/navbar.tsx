"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { CommandMenu } from "@/components/core/command-menu";
// import { HugeiconsIcon, StarIcon } from "@/components/icons";
// import { GitHub } from "@/components/icons/github";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useGitHubStars } from "@/hooks/use-github-stars";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import type { NavSection } from "@/types/nav-item";
import { Kbd, KbdGroup } from "./kbd";

interface NavbarProps {
  navigation: NavSection[];
}

export function Navbar({ navigation }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const { data: stars } = useGitHubStars();

  return (
    <header className="sticky top-0 z-50 w-full py-4">
      <div className={cn(
        "mx-auto flex items-center gap-4 rounded-xl bg-background/60 backdrop-blur-md shadow-md border border-border/40 px-4 py-2.5 supporting-backdrop-blur",
        pathname?.startsWith("/docs") ? "max-w-2xl" : "max-w-[52rem]"
      )}>
        <div className="mr-4 flex">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2 hover:bg-muted-foreground/20 rounded-lg"
          >
            <Image
              src={"/media/img_logo.png"}
              alt="Logo"
              width={40}
              height={40}
              className="aspect-auto"
            />
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {!pathname?.startsWith("/docs") && (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/docs"
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-transparent hover:bg-transparent focus:bg-transparent",
                          pathname?.startsWith("/docs") && !pathname?.startsWith("/docs/components")
                            ? "text-foreground"
                            : "text-foreground/60"
                        )}
                      >
                        Documentation
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button
              variant="secondary"
              onClick={() => setOpen(true)}
              className="py-0! h-9 text-sm"
            >
              <span className="hidden lg:inline-flex">
                Search documentation...
              </span>
              <span className="inline-flex lg:hidden">Search...</span>
              <KbdGroup>
                <Kbd className="outline-muted-foreground/20 outline-1">⌘</Kbd>
                <Kbd className="outline-muted-foreground/20 outline-1">K</Kbd>
              </KbdGroup>
            </Button>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <nav className="flex items-center gap-1">
            <ThemeToggle />
          </nav>
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
