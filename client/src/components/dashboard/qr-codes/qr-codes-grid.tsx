"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import apiInstance from "@/utils/apiInstance";
import { Loader2, Download, ExternalLink, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

interface QRCodeData {
  _id: string;
  title: string;
  shortURL: string;
  shortId: string;
  qrCode: string;
  redirectURL: string;
  createdAt: string;
}

export default function QRCodesGrid() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [qrCodes, setQRCodes] = useState<QRCodeData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // Debounce search query changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchQRCodes = async () => {
      setIsLoading(true);
      try {
        // Fetch all URLs that have QR codes
        const response = await apiInstance.get("/url/all");
        const allUrls = response.data;

        // Filter URLs that have QR codes
        const urlsWithQrCodes = allUrls.filter((url: QRCodeData) => url.qrCode);

        setQRCodes(urlsWithQrCodes);
      } catch (error) {
        console.error("Error fetching QR codes:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load QR codes",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchQRCodes();
  }, [toast]);

  // Memoize filtered data for better performance
  const filteredQRCodes = useMemo(() => {
    return qrCodes.filter((qrCode) => {
      if (!debouncedSearchQuery.trim()) return true;

      const searchLower = debouncedSearchQuery.toLowerCase();
      return (
        (qrCode.title && qrCode.title.toLowerCase().includes(searchLower)) ||
        qrCode.shortURL.toLowerCase().includes(searchLower) ||
        qrCode.redirectURL.toLowerCase().includes(searchLower) ||
        qrCode.shortId.toLowerCase().includes(searchLower)
      );
    });
  }, [qrCodes, debouncedSearchQuery]);

  const handleDownload = (qrCode: QRCodeData) => {
    try {
      // Convert SVG to PNG for download
      const svgImage = qrCode.qrCode;
      const fileName = `${qrCode.title.replace(/\s+/g, "-")}-qrcode.png`;

      // Create a temporary image element
      const img = new Image();
      img.onload = () => {
        // Create a canvas to draw the image
        const canvas = document.createElement("canvas");
        // Set canvas size to be larger for higher quality
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          // Fill white background
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Draw the image centered
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Convert to PNG
          const pngUrl = canvas.toDataURL("image/png");

          // Download the PNG
          const link = document.createElement("a");
          link.href = pngUrl;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          toast({
            title: "Success",
            description: "QR code downloaded as PNG",
          });
        }
      };
      img.onerror = () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to convert QR code to PNG",
        });
      };
      img.src = svgImage;
    } catch (error) {
      console.error("Error downloading QR code:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to download QR code",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading QR codes...</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="w-full">
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by title, URL, or ID..."
          className="pl-10 py-2 text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Show search results count when searching */}
      {debouncedSearchQuery.trim() && (
        <div className="mt-2 mb-4 text-sm text-muted-foreground">
          Found {filteredQRCodes.length}{" "}
          {filteredQRCodes.length === 1 ? "result" : "results"} for:{" "}
          {debouncedSearchQuery}
        </div>
      )}

      {filteredQRCodes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          {debouncedSearchQuery.trim() ? (
            <>
              <Search className="h-12 w-12 text-muted-foreground mb-4 opacity-30" />
              <h3 className="text-lg font-medium">No results found</h3>
              <p className="text-muted-foreground mt-1">
                No QR codes match your search: {debouncedSearchQuery}
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </Button>
            </>
          ) : (
            <>
              <p className="text-muted-foreground">
                You don't have any QR codes yet. Create shortened URLs with QR
                codes enabled to see them here.
              </p>
              <Button className="mt-4" asChild>
                <Link href="/dashboard/links/create?qrcode=true">
                  Create Link with QR Code
                </Link>
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQRCodes.map((qrCode) => (
            <div
              key={qrCode._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4 flex items-center justify-center bg-gray-50 border-b">
                <div className="w-40 h-40">
                  <img
                    src={qrCode.qrCode}
                    alt={`QR Code for ${qrCode.title}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="p-4">
                <h3
                  className="font-semibold text-lg mb-1 truncate"
                  title={qrCode.title}
                >
                  {qrCode.title || "Untitled Link"}
                </h3>
                <p
                  className="text-sm text-primary mb-2 truncate"
                  title={qrCode.shortURL}
                >
                  <a
                    href={qrCode.shortURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {qrCode.shortURL}
                  </a>
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  Created on {formatDate(qrCode.createdAt)}
                </p>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleDownload(qrCode)}
                    className="flex-1"
                  >
                    <Download className="mr-1 h-4 w-4" />
                    Download PNG
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    asChild
                  >
                    <Link href={`/dashboard/links/qr-code/${qrCode.shortId}`}>
                      <ExternalLink className="mr-1 h-4 w-4" />
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
