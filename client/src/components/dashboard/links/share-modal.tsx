"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Mail } from "lucide-react";
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

type ShareModalProps = {
  isOpen: boolean;
  closeDialog: () => void;
  shortUrl: string;
};

export function ShareModal({ isOpen, closeDialog, shortUrl }: ShareModalProps) {
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
    <>
      <AlertDialog open={isOpen} onOpenChange={closeDialog}>
        <AlertDialogContent className="sm:max-w-md p-10">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-xl">
              Share your shorten link! 🎉
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
            <div className="flex items-center space-x-2 rounded-md bg-gray-100">
              <div className="flex-1 p-3">
                <p className="text-sm font-medium">{shortUrl}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? "Copied" : <>Copy</>}
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
    </>
  );
}
