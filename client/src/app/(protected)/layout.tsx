import { AppSidebar } from "@/components/dashboard/app-sidebar";
import DashboardNav from "@/components/dashboard/dashboard-nav";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardNav />
        <div className="flex flex-1 flex-col gap-4 p-5 bg-gray-50">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
