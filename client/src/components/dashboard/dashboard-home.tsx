/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { LinearAreaChart } from "./area-chart";
import apiInstance from "@/utils/apiInstance";

export const DashboardHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<{
    totalLinks: number;
    totalClicks: number;
    linksThisMonth: number;
    clicksData: { date: string; clicks: number }[] | undefined;
    topLinks?: {
      _id: string;
      shortId: string;
      title: string;
      clicks: number;
      logo?: string;
    }[];
  }>({
    totalLinks: 0,
    totalClicks: 0,
    linksThisMonth: 0,
    clicksData: undefined,
    topLinks: [],
  });
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardStats = async () => {
    try {
      setError(null);
      const response = await apiInstance.get("/url/analytics");

      if (response.data) {
        const {
          totalLinks,
          totalClicks,
          linksThisMonth,
          clicksData,
          clicksPerDay,
          topLinks,
        } = response.data;

        // Process clicksData from API response
        let processedClicksData = clicksData;

        // If we have clicksPerDay but not clicksData, convert it
        if (!processedClicksData && clicksPerDay) {
          processedClicksData = Object.entries(clicksPerDay)
            .map(([date, clicks]) => ({
              date,
              clicks: Number(clicks),
            }))
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );
        }

        // If we still don't have data, create empty data with the last 30 days
        if (!processedClicksData || processedClicksData.length === 0) {
          processedClicksData = generateLastThirtyDaysData();
        }

        setStats({
          totalLinks: totalLinks || 0,
          totalClicks: totalClicks || 0,
          linksThisMonth: linksThisMonth || 0,
          clicksData: processedClicksData,
          topLinks: topLinks || [],
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setError("Failed to load dashboard data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Generate default data for the last 30 days if no data is provided
  const generateLastThirtyDaysData = () => {
    const result = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      result.push({
        date: `${year}-${month}-${day}`,
        clicks: 0,
      });
    }

    return result;
  };

  // Initial data fetch
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Set up polling for real-time updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchDashboardStats();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <div className="px-1">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin mr-2 h-6 w-6" />
          <span>Loading dashboard data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm text-center">
        <div className="text-destructive mb-2">⚠️ {error}</div>
        <Button variant="outline" onClick={fetchDashboardStats}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="px-1">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalLinks.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Clicks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalClicks.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Links Added This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.linksThisMonth.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-6">
        <div className="w-2/3">
          <LinearAreaChart data={stats.clicksData} />
        </div>
        <div className="w-1/3">
          <div className="bg-white rounded-md p-5 shadow-sm">
            <h2 className="font-medium text-xl mb-4">Top Links</h2>
            <div className="space-y-4">
              {stats.topLinks && stats.topLinks.length > 0 ? (
                stats.topLinks.map((link, index) => (
                  <div
                    key={link._id || index}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 p-1">
                      {link?.logo ? (
                        <Image
                          src={`/api/proxyImage?imageUrl=${encodeURIComponent(
                            link.logo
                          )}`}
                          alt="link"
                          width={20}
                          height={20}
                          className="rounded-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/assets/favicon.png";
                            (e.target as HTMLImageElement).className =
                              "opacity-70";
                          }}
                        />
                      ) : (
                        <Image
                          src="/assets/favicon.png"
                          alt="link"
                          className="opacity-70"
                          width={20}
                          height={20}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/dashboard/links/${link.shortId}`}
                        className="block font-medium text-sm truncate hover:underline"
                        title={link.title}
                      >
                        {link.title}
                      </Link>
                      <p className="text-xs text-muted-foreground truncate">
                        {link.clicks.toLocaleString()} clicks
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">
                  No links created yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
