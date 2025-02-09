"use client";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import React, { useState } from "react";

const CopyBtn = ({ url }: { url: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <>
      <Button variant="secondary" size="sm" onClick={handleCopy}>
        {copied ? (
          "Copied!"
        ) : (
          <>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </>
        )}
      </Button>
    </>
  );
};

export default CopyBtn;
