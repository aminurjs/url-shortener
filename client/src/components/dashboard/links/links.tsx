"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import {
  Calendar,
  ChartNoAxesCombined,
  MoreHorizontal,
  QrCodeIcon,
  Search,
  Share2,
} from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Badge } from "@/components/ui/badge";
import apiInstance from "@/utils/apiInstance";
import CopyBtn from "./copy-btn";
import { useDialog } from "@/hooks/use-dialog";
import { ShareModal } from "./share-modal";

type LinkData = {
  _id: string;
  title: string;
  logo?: string;
  shortURL: string;
  redirectURL: string;
  createdAt: string;
};

const Links = () => {
  const [data, setData] = useState<LinkData[]>([]);
  const { isOpen, openDialog, closeDialog } = useDialog();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await apiInstance.get<LinkData[]>("/url/all");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const removeProtocol = (url: string) => {
    return url.replace(/^https?:\/\//, "");
  };
  return (
    <>
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
      <div className="mt-8 space-y-5">
        {data.length > 0 ? (
          <>
            {data.map((item) => {
              const formattedDate = new Date(
                item.createdAt
              ).toLocaleDateString();
              return (
                <div
                  key={item._id}
                  className="bg-white rounded-md p-5 pb-2 shadow-sm flex  items-start gap-5"
                >
                  {" "}
                  <ShareModal
                    isOpen={isOpen}
                    closeDialog={closeDialog}
                    shortUrl={item.shortURL}
                  />
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 p-1">
                    {item?.logo ? (
                      <Image
                        src={`/api/proxyImage?imageUrl=${encodeURIComponent(
                          item.logo
                        )}`}
                        alt="link"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <Image
                        src="/assets/favicon.png"
                        alt="link"
                        className="opacity-70"
                        width={50}
                        height={50}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="">
                      <h2 className="text-2xl font-semibold mb-2 hover:underline ellipsis-clamp">
                        <Link href={`/dashboard/links/${item._id}`}>
                          {item.title}
                        </Link>
                      </h2>
                      <a
                        href={item.shortURL}
                        className=" hover:underline text-primary font-medium block mb-1"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {removeProtocol(item.shortURL)}
                      </a>
                      <a
                        href={item.redirectURL}
                        className="text-sm hover:underline text-muted-foreground block"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.redirectURL}
                      </a>
                    </div>
                    <ul className="flex gap-3 mt-8">
                      <li>
                        <Badge
                          variant="outline"
                          className="rounded-sm text-muted-foreground hover:text-primary "
                        >
                          <Link
                            href=""
                            className="flex items-center gap-2 px-2 py-1"
                          >
                            <ChartNoAxesCombined className="h-4 w-4" />
                            Analytics
                          </Link>
                        </Badge>
                      </li>
                      <li>
                        <Badge
                          variant="outline"
                          className="rounded-sm  text-muted-foreground  hover:text-primary"
                        >
                          <Link
                            href=""
                            className="flex items-center gap-2 px-2 py-1"
                          >
                            <QrCodeIcon className="h-3 w-3" />
                            QrCode
                          </Link>
                        </Badge>
                      </li>
                      <li>
                        {" "}
                        <Badge
                          variant="outline"
                          className="rounded-sm text-muted-foreground"
                        >
                          <p className="flex items-center gap-2 px-2 py-1">
                            <Calendar className="h-3 w-3" />
                            {formattedDate}
                          </p>
                        </Badge>
                      </li>
                    </ul>
                  </div>
                  <div className="flex gap-2 items-center justify-end">
                    <CopyBtn url={item.shortURL} />{" "}
                    <Button variant="secondary" size="sm" onClick={openDialog}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="p-2 shadow  min-w-28"
                      >
                        <DropdownMenuItem className="hover:bg-gray-100">
                          <Link
                            href={`/dashboard/links/edit/${item._id}`}
                            className="px-4 block"
                          >
                            Edit
                          </Link>
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
              );
            })}
          </>
        ) : (
          <div className="  flex justify-center items-start">
            <p>No data found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Links;
