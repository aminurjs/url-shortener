import React from "react";
import { QrCode } from "lucide-react";
import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";

const QRCode = () => {
  return (
    <MaxWidthWrapper className="my-20">
      <div className="flex w-full justify-between items-center gap-10 max-md:flex-col">
        {/* Left Content */}
        <div className="space-y-6 md:w-1/2">
          <div className="inline-block">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
              <QrCode className="w-4 h-4" />
              <span className="text-sm font-medium">QR code generator</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Create stylish and <span className="text-emerald-400 italic">branded</span>
            <br />
            <span className="text-emerald-400 italic">QR codes</span>{" "}
            <span>to grow your business</span>
            <span className="text-emerald-400 italic">.</span>
          </h1>

          <p className="text-gray-600 text-lg max-w-xl">
            Generate and customize QR codes for short links, link-in-bio pages, and surveys to match
            your {"brand's"} style. Easily edit QR codes by tweaking shapes, colors, and adding your
            logo. Increase engagement and track clicks with ease.
          </p>
          <Image
            className="hidden md:block"
            src="/assets/img_qr_1.png"
            height={300}
            width={500}
            alt="qr"
          />
        </div>
        <div className="md:w-1/2 flex flex-col ">
          <p className=" text-center text-gray-600">See it in action ↓</p>{" "}
          <Image
            className="mx-auto mt-3 w-full h-auto max-h-full max-w-[180px] p-4 rounded-lg shadow-[0_25px_50px_-20px_rgba(17,17,17,0.2),0_16px_32px_-16px_rgba(17,17,17,0.2),inset_0_-2px_5px_0_rgba(0,0,0,0.2)]"
            src="/assets/Shortener.webp"
            height={300}
            width={300}
            alt="qr"
          />
        </div>{" "}
      </div>
    </MaxWidthWrapper>
  );
};

export default QRCode;
