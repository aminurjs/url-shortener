"use client";
import React from "react";
import { SidebarMenu, SidebarMenuItem } from "../ui/sidebar";
import { Button } from "../ui/button";
import Link from "next/link";

const CreateNew = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="px-3 py-2 mt-2">
          <Button className="w-full" asChild>
            <Link href="/dashboard/links/create">create new</Link>
          </Button>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default CreateNew;
