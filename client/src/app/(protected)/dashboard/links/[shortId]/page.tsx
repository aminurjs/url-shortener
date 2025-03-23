"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LinkAnalytics } from "@/components/dashboard/analytics/link-analytics";
import apiInstance from "@/utils/apiInstance";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface LinkData {
  _id: string;
  shortId: string;
  title: string;
  redirectURL: string;
  shortURL: string;
  qrCode: string | null;
  totalClicks: number;
  uniqueVisitors: number;
}

export default function LinkPage() {
  const params = useParams();
  const shortId = params.shortId as string;
  const [link, setLink] = useState<LinkData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLink = async () => {
      try {
        setLoading(true);
        const response = await apiInstance.get(`/url/${shortId}`);
        setLink(response.data);
      } catch (error) {
        console.error("Error fetching link:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load link data",
        });
      } finally {
        setLoading(false);
      }
    };

    if (shortId) {
      fetchLink();
    }
  }, [shortId, toast]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-1/3" />
        </div>
        <div className="bg-white shadow-sm rounded-lg p-6">
          <Skeleton className="h-[600px] w-full" />
        </div>
      </div>
    );
  }

  if (!link) {
    return (
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-semibold">Link not found</h1>
        </div>
        <div className="bg-white shadow-sm rounded-lg p-6 text-center py-20">
          <p>
            The link you are looking for does not exist or has been deleted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold">
          {link.title || "Link Details"}
        </h1>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <LinkAnalytics linkId={link._id} shortId={link.shortId} />
      </div>
    </div>
  );
}
