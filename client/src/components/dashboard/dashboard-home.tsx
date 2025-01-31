"use client";
import {
  CalendarCheck,
  Check,
  LinkIcon,
  MousePointerClick,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { LinearAreaChart } from "./area-chart";
import Link from "next/link";

export const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-md p-5 grid grid-cols-2 gap-5 shadow-sm">
        <div className="rounded-md  flex items-center border border-muted">
          <div className="w-1/2 px-2 bg-gray-100">
            <Image
              src="/assets/dashboard/dashboard_links.png"
              alt="link"
              width={600}
              height={400}
            />
          </div>
          <div className="flex items-center justify-center flex-col gap-3 w-1/2 ">
            <h4 className="font-medium">Make URL is short</h4>
            <Button
              variant={"outline"}
              size={"sm"}
              className="text-xs px-8 border-primary text-primary"
              asChild
            >
              <Link href="/dashboard/links"> Go to link</Link>
            </Button>
          </div>
        </div>
        <div className="rounded-md  flex items-center border border-muted">
          <div className="w-1/2 px-2 bg-gray-100">
            <Image
              src="/assets/dashboard/dashboard_qrcs.png"
              alt="link"
              width={600}
              height={400}
            />
          </div>
          <div className="flex items-center justify-center flex-col gap-3 w-1/2 ">
            <h4 className="font-medium">Make it scannable</h4>
            <Button
              variant={"outline"}
              size={"sm"}
              className="text-xs px-8 border-primary text-primary"
              asChild
            >
              <Link href="/dashboard/qr-codes"> Go to qr-codes</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-md p-5 grid grid-cols-3 gap-5 shadow-sm">
        <div className="bg-slate-50 rounded-md p-5">
          <h3 className="font-medium text-lg">All URls</h3>
          <div className="flex items-center justify-between">
            <h4 className="text-primary text-xl">0</h4>
            <span className="rounded-full p-2 bg-white">
              <LinkIcon className="h-4 w-4" />
            </span>
          </div>
        </div>
        <div className="bg-green-50 rounded-md p-5">
          <h3 className="font-medium text-lg">Total Clicks</h3>
          <div className="flex items-center justify-between">
            <h4 className="text-primary text-xl">0</h4>
            <span className="rounded-full p-2 bg-white">
              <MousePointerClick className="h-4 w-4" />
            </span>
          </div>
        </div>
        <div className="bg-blue-50 rounded-md p-5">
          <h3 className="font-medium text-lg">Links added this month</h3>
          <div className="flex items-center justify-between">
            <h4 className="text-primary text-xl">0</h4>
            <span className="rounded-full p-2 bg-white">
              <CalendarCheck className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="w-2/3">
          <LinearAreaChart />
        </div>
        <div className="w-1/3">
          <div className="bg-white rounded-md p-5 shadow-sm">
            {" "}
            <h2 className="text-lg font-semibold text-primary mb-2">
              Upgrade Your Plan
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Get access to premium features and enhance your experience.
            </p>
            <div className="flex justify-center items-baseline mb-4">
              <span className="text-2xl font-bold text-primary">$19.99</span>
              <span className="text-sm text-gray-500 ml-1">/month</span>
            </div>{" "}
            <ul className="text-left mb-4">
              <li className="flex items-center text-sm text-gray-700 mb-2">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Custom Branded URLs
              </li>
              <li className="flex items-center text-sm text-gray-700 mb-2">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Dynamic QR Codes
              </li>
              <li className="flex items-center text-sm text-gray-700 mb-2">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Advanced Link Analytics
              </li>
              <li className="flex items-center text-sm text-gray-700 mb-2">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Password Protection for Links
              </li>
              <li className="flex items-center text-sm text-gray-700 mb-2">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Link Expiration Settings
              </li>
              <li className="flex items-center text-sm text-gray-700 mb-2">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Bulk URL Shortening
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                API Access for Automation
              </li>
            </ul>
            <Button className="w-full">Upgrade Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
