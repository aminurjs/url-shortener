import React from "react";
import QRCodeView from "@/components/dashboard/links/qr-code-view";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface QRCodePageProps {
  params: {
    id: string;
  };
}

const QRCodePage = ({ params }: QRCodePageProps) => {
  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-primary text-4xl font-semibold">QR Code</h1>
          <Button variant="outline">
            <Link href="/dashboard/links">Back to Links</Link>
          </Button>
        </div>
        <div className="p-10 bg-white shadow rounded-md">
          <QRCodeView id={params.id} />
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;
