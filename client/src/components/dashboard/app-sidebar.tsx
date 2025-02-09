"use client";

import * as React from "react";
import {
  AudioWaveform,
  ChartArea,
  Command,
  GalleryVerticalEnd,
  Home,
  Link,
  QrCode,
} from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { UserSkeleton } from "../skeleton/user";
import NavLogo from "./nav-logo";
import CreateNew from "./create-new-link";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Links",
      url: "/dashboard/links",
      icon: Link,
    },
    {
      title: "QR Codes",
      url: "/dashboard/qr-codes",
      icon: QrCode,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: ChartArea,
    },
    // {
    //   title: "Settings",
    //   url: "/dashboard/settings",
    //   icon: Settings2,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-muted pb-2">
        <NavLogo />
        <CreateNew />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {user ? <NavUser user={user} /> : <UserSkeleton />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
