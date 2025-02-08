import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const metadata: Metadata = {
  title: "Links | Dashboard",
  description: "Manage and track your shortened links",
};

export default function LinksPage() {
  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold ">Links</h1>
        <Button>
          <Link href="/dashboard/links/create">Create Link</Link>
        </Button>
      </div>
      <div className="flex justify-between items-center mt-8">
        <div className="relative  max-w-2xl w-full">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search links..." className="pl-10 py-2 text-lg" />
        </div>
        <Select>
          <SelectTrigger className="w-[180px] h-12 text-lg">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">View Active</SelectItem>
            <SelectItem value="hidden">View Hidden</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-8">
        <div className="bg-white rounded-md p-5 shadow-sm flex  items-start gap-5">
          <div className="">
            <Image
              src="/assets/dashboard/dashboard_links.png"
              alt="link"
              width={50}
              height={50}
            />
          </div>
          <div className="flex-1">
            <div className="">
              <h2>Link Title</h2>
              <p>shorten link</p>
              <h2>main link</h2>
            </div>
            <ul className="flex gap-5 mt-5">
              <li>
                <Link href="">qr code</Link>
              </li>
              <li>
                <Link href="">analytics</Link>
              </li>
            </ul>
          </div>
          <div className="flex gap-2 items-center justify-end">
            {" "}
            <Button variant="secondary" size="sm">
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button variant="secondary" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="p-2 shadow  min-w-28">
                <DropdownMenuItem className="hover:bg-gray-100 px-4 cursor-pointer">
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-100 px-4 cursor-pointer">
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive hover:bg-gray-100 px-4 cursor-pointer">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { Input } from "@/components/ui/input";
import { Copy, MoreHorizontal, Search, Share2 } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
