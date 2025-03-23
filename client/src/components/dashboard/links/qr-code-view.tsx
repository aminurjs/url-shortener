/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import apiInstance from "@/utils/apiInstance";
import { Loader2, Download, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDialog } from "@/hooks/use-dialog";
import { ShareModal } from "./share-modal";

interface QRCodeViewProps {
  id: string;
}

export default function QRCodeView({ id }: QRCodeViewProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [qrCodeData, setQrCodeData] = useState<{
    title: string;
    shortURL: string;
    qrCode: string | null;
    redirectURL: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, openDialog, closeDialog } = useDialog();

  useEffect(() => {
    const fetchQRCode = async () => {
      setIsLoading(true);
      try {
        const response = await apiInstance.get(`/url/${id}`);
        const data = response.data;

        if (!data.qrCode) {
          // Generate QR code if not present
          try {
            const updateResponse = await apiInstance.put(`/url/${id}`, {
              isQrCode: true,
            });
            setQrCodeData({
              title: updateResponse.data.data.title || "Untitled Link",
              shortURL: updateResponse.data.data.shortURL,
              qrCode: updateResponse.data.data.qrCode,
              redirectURL: updateResponse.data.data.redirectURL,
            });
          } catch (updateError) {
            console.error("Error generating QR code:", updateError);
            setError("Failed to generate QR code for this link");
          }
        } else {
          setQrCodeData({
            title: data.title || "Untitled Link",
            shortURL: data.shortURL,
            qrCode: data.qrCode,
            redirectURL: data.redirectURL,
          });
        }
      } catch (error) {
        console.error("Error fetching QR code:", error);
        setError("Failed to load QR code data");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load QR code",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchQRCode();
    }
  }, [id, toast]);

  const handleDownload = () => {
    if (!qrCodeData?.qrCode) return;

    try {
      // Convert SVG to PNG for download
      const svgImage = qrCodeData.qrCode;
      const fileName = `${qrCodeData.title.replace(/\s+/g, "-")}-qrcode.png`;

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
        <p className="mt-4 text-muted-foreground">Loading QR code...</p>
      </div>
    );
  }

  if (error || !qrCodeData) {
    return (
      <div className="py-8 text-center text-destructive">
        <p>{error || "Unable to load QR code data"}</p>
        <Button
          className="mt-4"
          onClick={() => router.push("/dashboard/links")}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <ShareModal
        isOpen={isOpen}
        closeDialog={closeDialog}
        shortUrl={qrCodeData.shortURL}
      />

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-2 text-center">
          {qrCodeData.title}
        </h2>
        <p className="text-center text-primary mb-6 break-all">
          <a
            href={qrCodeData.shortURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {qrCodeData.shortURL}
          </a>
        </p>

        <div className="flex justify-center mb-6">
          <div className="border border-gray-200 p-4 rounded-lg">
            {qrCodeData.qrCode && (
              <div className="w-64 h-64">
                <img
                  src={qrCodeData.qrCode}
                  alt={`QR Code for ${qrCodeData.title}`}
                  className="w-full h-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button onClick={handleDownload} className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Download PNG
          </Button>
          <Button
            variant="outline"
            onClick={openDialog}
            className="flex items-center"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            This QR code redirects to:
          </p>
          <p className="text-sm break-all">
            <a
              href={qrCodeData.redirectURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {qrCodeData.redirectURL}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
