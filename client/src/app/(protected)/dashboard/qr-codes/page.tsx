"use client";
import React from "react";
import QRCodesGrid from "@/components/dashboard/qr-codes/qr-codes-grid";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const QrCodes = () => {
  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold">QR Codes</h1>
        <Button>
          <Link href="/dashboard/links/create?qrcode=true">
            Create New QR Code
          </Link>
        </Button>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <QRCodesGrid />
      </div>
    </div>
  );
};

export default QrCodes;
