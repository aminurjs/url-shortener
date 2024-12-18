import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Rocket, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const DashboardNav = () => {
  return (
    <header className=" flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-muted">
      <div className="w-full flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="w-full flex items-center justify-end flex-1 gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input type="text" placeholder="Search..." className="pl-10 w-64" />
          </div>

          {/* Upgrade Button */}
          <Button className="flex items-center space-x-2">
            <Rocket size={20} />
            <span>Upgrade</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardNav;
