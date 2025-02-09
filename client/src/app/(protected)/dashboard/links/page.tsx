import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Links from "@/components/dashboard/links/links";

export const metadata: Metadata = {
  title: "Links | Dashboard",
  description: "Manage and track your shortened links",
};

export default function LinksPage() {
  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold ">Links</h1>
        <Button>
          <Link href="/dashboard/links/create">Create Link</Link>
        </Button>
      </div>
      <Links />
    </div>
  );
}
