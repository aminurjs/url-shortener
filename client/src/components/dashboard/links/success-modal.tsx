"use client";

import { Button } from "@/components/ui/button";
import { Copy, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type LinkAlertDialogProps = {
  isOpen: boolean;
  closeDialog: () => void;
  url: string;
  shortUrl: string;
};

export function LinkAlertDialog({
  isOpen,
  closeDialog,
  url,
  shortUrl,
}: LinkAlertDialogProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      // You might want to show a toast or some feedback here
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={closeDialog}>
        <AlertDialogContent className="sm:max-w-md p-10">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-xl">
              Your link is ready! 🎉
            </AlertDialogTitle>
            <Button
              variant="ghost"
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              onClick={closeDialog}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </AlertDialogHeader>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Copy the link below to share it or choose a platform to share it
              to.
            </p>
            <div className="flex items-center space-x-2">
              <div className="flex-1 rounded-md bg-muted p-3">
                <p className="text-sm font-medium">{shortUrl}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => {}}>
                View link details
              </Button>
              <Button className="flex-1" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Copy link
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() =>
                  window.open(`https://wa.me/?text=${encodeURIComponent(url)}`)
                }
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_117-9RZ6OXb26DZTvZeJgbpjUgLkuVmklz.png"
                  alt="WhatsApp"
                  className="w-6 h-6"
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      url
                    )}`
                  )
                }
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_117-9RZ6OXb26DZTvZeJgbpjUgLkuVmklz.png"
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() =>
                  window.open(
                    `https://www.instagram.com/share?url=${encodeURIComponent(
                      url
                    )}`
                  )
                }
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_117-9RZ6OXb26DZTvZeJgbpjUgLkuVmklz.png"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      url
                    )}`
                  )
                }
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_117-9RZ6OXb26DZTvZeJgbpjUgLkuVmklz.png"
                  alt="X (Twitter)"
                  className="w-6 h-6"
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() =>
                  window.open(
                    `https://www.threads.net/share?url=${encodeURIComponent(
                      url
                    )}`
                  )
                }
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_117-9RZ6OXb26DZTvZeJgbpjUgLkuVmklz.png"
                  alt="Threads"
                  className="w-6 h-6"
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() =>
                  window.open(`mailto:?body=${encodeURIComponent(url)}`)
                }
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_117-9RZ6OXb26DZTvZeJgbpjUgLkuVmklz.png"
                  alt="Email"
                  className="w-6 h-6"
                />
              </Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
