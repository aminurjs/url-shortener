"use client";
import React from "react";
import { SidebarMenu, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "../ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

const CreateNew = () => {
  const { state } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className={`${state === "collapsed" ? "p-0" : "p-3"} py-2 mt-2`}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="w-full" asChild>
                  <Link href="/dashboard/links/create">
                    {state === "collapsed" ? (
                      <span>
                        <PlusIcon />
                      </span>
                    ) : (
                      <span>Create new</span>
                    )}
                  </Link>
                </Button>
              </TooltipTrigger>
              {state === "collapsed" && (
                <TooltipContent side="right">
                  <span>Create New</span>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default CreateNew;
