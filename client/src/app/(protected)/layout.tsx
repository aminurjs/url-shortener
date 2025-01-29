"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import DashboardNav from "@/components/dashboard/dashboard-nav";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return router.push("/");
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardNav />
        <div className="flex flex-1 flex-col gap-4 p-5 bg-gray-50">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
