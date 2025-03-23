/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
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
import { useToast } from "@/hooks/use-toast";

type LinkData = {
  _id: string;
  title: string;
  logo?: string;
  shortURL: string;
  redirectURL: string;
  createdAt: string;
  shortId: string;
  archived?: boolean;
  qrCode?: boolean;
};

const Links = () => {
  const [data, setData] = useState<LinkData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<string>("active");
  const { isOpen, openDialog, closeDialog } = useDialog();
  const { toast } = useToast();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [urlToDelete, setUrlToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [urlToShare, setUrlToShare] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search query changes
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchData = async (status?: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await apiInstance.get<LinkData[]>("/url/all", {
        params: { status },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load links. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(viewMode);
  }, [viewMode]);

  // Reset document interaction state when component mounts/unmounts
  useEffect(() => {
    const resetInteractions = () => {
      // Force document to be interactive
      document.body.style.pointerEvents = "auto";
      document.body.style.touchAction = "auto";
    };

    // Add a listener to ensure interactions are reset
    document.addEventListener("click", resetInteractions, { capture: true });

    // Reset interactions on mount
    resetInteractions();

    return () => {
      document.removeEventListener("click", resetInteractions, {
        capture: true,
      });
      resetInteractions();
    };
  }, []);

  const handleViewChange = (value: string) => {
    setViewMode(value);
  };

  const toggleArchive = async (id: string) => {
    try {
      const response = await apiInstance.put(`/url/toggle-archive/${id}`);

      if (response.status === 200) {
        // Refresh the data
        fetchData(viewMode);
        toast({
          title: "Success",
          description: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error toggling archive status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update archive status",
      });
    }
  };

  const handleDeleteClick = (id: string) => {
    setUrlToDelete(id);
    setTimeout(() => {
      setDeleteConfirmOpen(true);
    }, 0);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setTimeout(() => {
      setUrlToDelete(null);
    }, 100);
  };

  const confirmDelete = async () => {
    if (!urlToDelete || isDeleting) return;

    try {
      setIsDeleting(true);

      // Close dialog immediately to prevent interaction issues
      setDeleteConfirmOpen(false);

      // Clear body styles that might be stuck
      document.body.style.pointerEvents = "auto";
      document.body.style.touchAction = "auto";

      // Small delay to ensure modal is fully closed
      await new Promise((resolve) => setTimeout(resolve, 50));

      const response = await apiInstance.delete(`/url/delete/${urlToDelete}`);

      if (response.status === 200) {
        // Create a copy of the current data for immutable update
        const newData = data.filter((item) => item._id !== urlToDelete);
        setData(newData);

        toast({
          title: "Success",
          description: "URL deleted successfully",
        });
      }
    } catch (error) {
      console.error("Error deleting URL:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete URL",
      });
    } finally {
      // Reset deletion state
      setIsDeleting(false);
      setUrlToDelete(null);

      // Force unlock UI if it's stuck
      document.body.style.pointerEvents = "auto";
      document.body.style.touchAction = "auto";
    }
  };

  const removeProtocol = (url: string) => {
    return url.replace(/^https?:\/\//, "");
  };

  // Memoize filtered data for better performance
  const filteredData = useMemo(() => {
    setIsSearching(true);
    const result = data.filter((item) => {
      if (!debouncedSearchQuery.trim()) return true;

      const searchLower = debouncedSearchQuery.toLowerCase();
      return (
        (item.title && item.title.toLowerCase().includes(searchLower)) ||
        item.shortURL.toLowerCase().includes(searchLower) ||
        item.redirectURL.toLowerCase().includes(searchLower) ||
        item.shortId.toLowerCase().includes(searchLower)
      );
    });
    setIsSearching(false);
    return result;
  }, [data, debouncedSearchQuery]);

  // Handle share modal open
  const handleShareClick = (url: string) => {
    setUrlToShare(url);
    openDialog();
  };

  return (
    <>
      <div className="flex justify-between items-center mt-8">
        <div className="relative max-w-2xl w-full">
          <Search
            className={`absolute left-2.5 top-1/2 -translate-y-1/2 h-5 w-5 ${
              isSearching
                ? "animate-pulse text-primary"
                : "text-muted-foreground"
            }`}
          />
          <Input
            placeholder="Search by title, URL, or ID..."
            className="pl-10 py-2 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-2"
              onClick={() => setSearchQuery("")}
            >
              Clear
            </Button>
          )}
        </div>
        <Select onValueChange={handleViewChange} defaultValue={viewMode}>
          <SelectTrigger className="w-[180px] h-12 text-lg">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">View Active</SelectItem>
            <SelectItem value="archived">View Archived</SelectItem>
            <SelectItem value="all">View All</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Show search results count when searching */}
      {debouncedSearchQuery.trim() && (
        <div className="mt-4 text-sm text-muted-foreground">
          Found {filteredData.length}{" "}
          {filteredData.length === 1 ? "result" : "results"} for &ldquo;
          {debouncedSearchQuery}&rdquo;
        </div>
      )}

      <div className="mt-8 space-y-5">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredData.length > 0 ? (
          <>
            {filteredData.map((item) => {
              const formattedDate = new Date(
                item.createdAt
              ).toLocaleDateString();
              return (
                <div
                  key={item._id}
                  className="bg-white rounded-md p-5 pb-2 shadow-sm flex  items-start gap-5"
                >
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
                        <Link href={`/dashboard/links/${item.shortId}`}>
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
                            href={`/dashboard/links/${item.shortId}`}
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
                          className={`rounded-sm text-muted-foreground ${
                            item.qrCode ? "hover:text-primary" : ""
                          }`}
                        >
                          {item.qrCode ? (
                            <Link
                              href={`/dashboard/links/qr-code/${item.shortId}`}
                              className="flex items-center gap-2 px-2 py-1"
                            >
                              <QrCodeIcon className="h-3 w-3" />
                              QR Code
                            </Link>
                          ) : (
                            <span className="flex items-center gap-2 px-2 py-1 opacity-60">
                              <QrCodeIcon className="h-3 w-3" />
                              QR Code
                            </span>
                          )}
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
                    <CopyBtn url={item.shortURL} />
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleShareClick(item.shortURL)}
                    >
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
                            href={`/dashboard/links/edit/${item.shortId}`}
                            className="px-4 block"
                          >
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="hover:bg-gray-100 px-4 cursor-pointer"
                          onClick={() => toggleArchive(item._id)}
                        >
                          {item.archived ? "Unarchive" : "Archive"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive hover:bg-gray-100 px-4 cursor-pointer"
                          onClick={() => handleDeleteClick(item._id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </>
        ) : debouncedSearchQuery.trim() ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mb-4 opacity-30" />
            <h3 className="text-lg font-medium">No results found</h3>
            <p className="text-muted-foreground mt-1">
              No links match your search for &ldquo;{debouncedSearchQuery}
              &rdquo;
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSearchQuery("")}
            >
              Clear search
            </Button>
          </div>
        ) : (
          <div className="flex justify-center items-start py-10">
            <p className="text-muted-foreground">
              No links found. Create your first link!
            </p>
          </div>
        )}
      </div>

      {/* Handle alerts with direct conditional rendering instead of dialog component for better interaction handling */}
      {deleteConfirmOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          onClick={handleCancelDelete}
        >
          <div
            className="bg-white rounded-md p-6 shadow-lg max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-2 text-center sm:text-left">
              <h2 className="text-lg font-semibold">
                Are you absolutely sure?
              </h2>
              <p className="text-sm text-muted-foreground">
                This action cannot be undone. This will permanently delete the
                shortened URL and all associated analytics data.
              </p>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-2 sm:mt-0"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2"
                onClick={(e) => {
                  e.stopPropagation();
                  confirmDelete();
                }}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ShareModal
        isOpen={isOpen}
        closeDialog={closeDialog}
        shortUrl={urlToShare}
      />
    </>
  );
};

export default Links;
