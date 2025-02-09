"use client";

import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url;

          return (
            <SidebarMenuItem
              key={item.title}
              className={`pl-1 hover:bg-gray-100 ${
                isActive ? "bg-gray-100" : ""
              }`}
            >
              <SidebarMenuButton tooltip={item.title} asChild size="lg">
                <Link href={item.url}>
                  <span>{item.icon && <item.icon />}</span>
                  <p className="text-lg">{item.title}</p>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
