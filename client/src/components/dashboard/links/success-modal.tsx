"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Copy, X, Mail } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Importing social icons from react-icons
import {
  FaFacebook,
  FaXTwitter,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa6";

type LinkAlertDialogProps = {
  isOpen: boolean;
  closeDialog: () => void;
  shortUrl: string;
};

export function LinkAlertDialog({
  isOpen,
  closeDialog,
  shortUrl,
}: LinkAlertDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={closeDialog}>
      <AlertDialogContent className="sm:max-w-md p-10">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-xl">
            Your link is ready! 🎉
          </AlertDialogTitle>
          <Button
            variant="ghost"
            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={closeDialog}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </AlertDialogHeader>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Copy the link below to share it or choose a platform to share it.
          </p>
          <div className="flex items-center space-x-2">
            <div className="flex-1 rounded-md bg-muted p-3">
              <p className="text-sm font-medium">{shortUrl}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/dashboard/analytics">View link details</Link>
            </Button>
            <Button className="flex-1" onClick={handleCopy}>
              {copied ? (
                "Copied!"
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy link
                </>
              )}
            </Button>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-md border p-2 flex justify-center items-center w-14 h-14 border-gray-300 hover:bg-green-100 transition"
              onClick={() =>
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(shortUrl)}`
                )
              }
              aria-label="Share on WhatsApp"
            >
              <FaWhatsapp className="w-6 h-6 text-green-500" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-md border p-2 flex justify-center items-center w-14 h-14 border-gray-300 hover:bg-blue-100 transition"
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    shortUrl
                  )}`
                )
              }
              aria-label="Share on Facebook"
            >
              <FaFacebook className="w-6 h-6 text-blue-600" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-md border p-2 flex justify-center items-center w-14 h-14 border-gray-300 hover:bg-blue-100 transition"
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    shortUrl
                  )}`
                )
              }
              aria-label="Share on X (Twitter)"
            >
              <FaXTwitter className="w-6 h-6 text-blue-400" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-md border p-2 flex justify-center items-center w-14 h-14 border-gray-300 hover:bg-blue-100 transition"
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    shortUrl
                  )}`
                )
              }
              aria-label="Share on LinkedIn"
            >
              <FaLinkedin className="w-6 h-6 text-blue-700" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-md border p-2 flex justify-center items-center w-14 h-14 border-gray-300 hover:bg-gray-100 transition"
              onClick={() =>
                window.open(
                  `mailto:?subject=Check this out&body=${encodeURIComponent(
                    shortUrl
                  )}`
                )
              }
              aria-label="Share via Email"
            >
              <Mail className="w-6 h-6 text-gray-500" />
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
