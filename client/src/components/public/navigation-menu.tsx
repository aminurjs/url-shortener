"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const features: { title: string; href: string; description: string }[] = [
  {
    title: "URL Shortening",
    href: "/dashboard/links",
    description: "Create shortened URLs that are easier to share and track.",
  },
  {
    title: "QR Codes",
    href: "/dashboard/qr-codes",
    description:
      "Generate QR codes for your shortened URLs for easy mobile access.",
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    description:
      "Track clicks, geographic data, and other metrics for your shortened URLs.",
  },
  {
    title: "Custom Links",
    href: "/dashboard/links",
    description: "Create branded and memorable custom short links.",
  },
  {
    title: "Link Management",
    href: "/dashboard/links",
    description:
      "Organize, edit, and manage all your shortened URLs in one place.",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    description: "Customize your account preferences and profile settings.",
  },
];

const resources: { title: string; href: string; description: string }[] = [
  {
    title: "Documentation",
    href: "/docs",
    description: "Learn how to use our URL shortener service effectively.",
  },
  {
    title: "Terms of Service",
    href: "/terms",
    description: "Read our terms and conditions for using the service.",
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
    description: "Understand how we collect and use your data.",
  },
];

export function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      URL Shortener
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Create, manage, and track shortened URLs with powerful
                      analytics and customization options.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/dashboard" title="Dashboard">
                Access your personalized dashboard to manage all your shortened
                URLs.
              </ListItem>
              <ListItem href="/dashboard/links" title="Link Management">
                Create and manage all your shortened URLs in one place.
              </ListItem>
              <ListItem href="/dashboard/analytics" title="Analytics">
                Track performance metrics for all your shortened links.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {features.map((feature) => (
                <ListItem
                  key={feature.title}
                  title={feature.title}
                  href={feature.href}
                >
                  {feature.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px] ">
              {resources.map((resource) => (
                <ListItem
                  key={resource.title}
                  title={resource.title}
                  href={resource.href}
                >
                  {resource.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
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
