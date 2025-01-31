import { AppSidebar } from "@/components/dashboard/app-sidebar";
import Breadcrumbs from "@/components/dashboard/breadcrumbs";
import DashboardNav from "@/components/dashboard/dashboard-nav";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ProtectedContext from "@/contexts/ProtectedContext";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedContext>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardNav />
          <div className="flex flex-1 flex-col gap-4 py-5 px-8 bg-gray-50">
            <Breadcrumbs />
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedContext>
  );
}
