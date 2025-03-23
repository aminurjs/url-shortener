"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Copy, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import apiInstance from "@/utils/apiInstance";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import React from "react";

interface LinkAnalyticsProps {
  linkId: string;
  shortId: string;
}

interface LinkAnalyticsData {
  linkId: string;
  shortId: string;
  title: string;
  totalClicks: number;
  uniqueVisitors: number;
  clicksData?: Array<{ date: string; clicks: number }>;
  clicksPerDay: Record<string, number>;
  deviceData: Record<string, number>;
  browserData: Record<string, number>;
  locationData: Record<string, number>;
  refererData: Record<string, number>;
  logo?: string;
}

const initialData: LinkAnalyticsData = {
  linkId: "",
  shortId: "",
  title: "",
  totalClicks: 0,
  uniqueVisitors: 0,
  clicksPerDay: {},
  deviceData: {},
  browserData: {},
  locationData: {},
  refererData: {},
};

export function LinkAnalytics({ linkId, shortId }: LinkAnalyticsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<LinkAnalyticsData>(initialData);
  const { toast } = useToast();

  const chartConfig = {
    clicks: {
      label: "Clicks",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    const fetchLinkAnalytics = async () => {
      try {
        setIsLoading(true);
        const response = await apiInstance.get(`/url/${linkId}/analytics`);
        const responseData = response.data;

        // Check if we have the new format (clicksData array) or old format (clicksPerDay object)
        if (responseData.clicksData && !responseData.clicksPerDay) {
          // Convert clicksData array to clicksPerDay object format
          const clicksPerDay: Record<string, number> = {};
          responseData.clicksData.forEach(
            (item: { date: string; clicks: number }) => {
              clicksPerDay[item.date] = item.clicks;
            }
          );
          responseData.clicksPerDay = clicksPerDay;
        }

        setData(responseData);
      } catch (error) {
        console.error("Error fetching link analytics:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load link analytics data",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (linkId) {
      // Initial fetch
      fetchLinkAnalytics();

      // Set up polling for real-time updates (every minute)
      const intervalId = setInterval(() => {
        fetchLinkAnalytics();
      }, 60000);

      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [linkId, toast]);

  const copyToClipboard = () => {
    const shortUrl = `${window.location.origin}/${shortId}`;
    navigator.clipboard.writeText(shortUrl);
    toast({
      title: "Link copied to clipboard",
      description: "You can now paste it anywhere",
    });
  };

  // Transform clicks per day to chart format
  const clicksChartData = React.useMemo(() => {
    // If we have clicksData array, use it
    if (data.clicksData && data.clicksData.length > 0) {
      return data.clicksData
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(-30); // Last 30 days
    }

    // Otherwise use clicksPerDay object
    return Object.entries(data.clicksPerDay || {})
      .map(([date, clicks]) => ({
        date,
        clicks: typeof clicks === "number" ? clicks : 0,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data.clicksData, data.clicksPerDay]);

  // Transform device data to chart format
  const deviceChartData = React.useMemo(() => {
    return Object.entries(data.deviceData || {})
      .map(([name, value]) => ({
        name: name || "Unknown",
        value: typeof value === "number" ? value : 0,
      }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [data.deviceData]);

  // Transform browser data to chart format
  const browserChartData = React.useMemo(() => {
    return Object.entries(data.browserData || {})
      .map(([name, value]) => ({
        name: name || "Unknown",
        value: typeof value === "number" ? value : 0,
      }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [data.browserData]);

  // Transform location data to chart format
  const locationChartData = React.useMemo(() => {
    return Object.entries(data.locationData || {})
      .map(([name, value]) => ({
        name: name || "Unknown",
        value: typeof value === "number" ? value : 0,
      }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 10); // Top 10 locations
  }, [data.locationData]);

  // Transform referrer data to chart format
  const referrerChartData = React.useMemo(() => {
    return Object.entries(data.refererData || {})
      .map(([name, value]) => ({
        name: name || "Direct",
        value: typeof value === "number" ? value : 0,
      }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 10); // Top 10 referrers
  }, [data.refererData]);

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const shortUrl =
    typeof window !== "undefined" ? `${window.location.origin}/${shortId}` : "";

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 p-1 shrink-0">
                {data.logo ? (
                  <img
                    src={`/api/proxyImage?imageUrl=${encodeURIComponent(
                      data.logo
                    )}`}
                    alt="link logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/assets/favicon.png";
                      (e.target as HTMLImageElement).className = "opacity-70";
                    }}
                  />
                ) : (
                  <img
                    src="/assets/favicon.png"
                    alt="default logo"
                    className="opacity-70 w-full h-full object-contain"
                  />
                )}
              </div>
              <div>
                <h2 className="text-xl font-medium mb-2">{data.title}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{shortUrl}</span>
                  <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    shortUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Clicks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.totalClicks}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Unique Visitors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.uniqueVisitors}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Click Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.uniqueVisitors > 0
                    ? `${(
                        (data.totalClicks / data.uniqueVisitors) *
                        100
                      ).toFixed(2)}%`
                    : "0%"}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="clicks">
            <TabsList className="mb-4 w-full overflow-x-auto flex-nowrap">
              <TabsTrigger value="clicks">Clicks Over Time</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
              <TabsTrigger value="browsers">Browsers</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
              <TabsTrigger value="referrers">Referrers</TabsTrigger>
            </TabsList>

            <TabsContent
              value="clicks"
              className="bg-white p-4 rounded-lg border"
            >
              <div className="h-[400px] w-full overflow-hidden">
                <ChartContainer config={chartConfig}>
                  <AreaChart
                    data={clicksChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorClicks"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-clicks)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-clicks)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={50}
                    />
                    <YAxis
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      allowDecimals={false}
                      domain={[0, (dataMax: number) => Math.max(1, dataMax)]}
                    />
                    <Tooltip
                      content={<ChartTooltipContent />}
                      formatter={(value) => [value, "Clicks"]}
                      labelFormatter={(label) => {
                        const date = new Date(label);
                        return date.toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        });
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="clicks"
                      stroke="var(--color-clicks)"
                      fillOpacity={1}
                      fill="url(#colorClicks)"
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground text-center">
                Click activity over the last 30 days
              </div>
            </TabsContent>

            <TabsContent
              value="devices"
              className="bg-white p-4 rounded-lg border"
            >
              <div className="h-[400px] w-full overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={
                        deviceChartData.length > 0
                          ? deviceChartData
                          : [{ name: "No Data", value: 1 }]
                      }
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) =>
                        deviceChartData.length > 0
                          ? `${name}: ${(percent * 100).toFixed(0)}%`
                          : "No data available"
                      }
                      labelLine={deviceChartData.length > 0}
                    >
                      {deviceChartData.length > 0 ? (
                        deviceChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))
                      ) : (
                        <Cell fill="#cccccc" />
                      )}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground text-center">
                Distribution of visitors by device type
              </div>
            </TabsContent>

            <TabsContent
              value="browsers"
              className="bg-white p-4 rounded-lg border"
            >
              <div className="h-[400px] w-full overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={
                        browserChartData.length > 0
                          ? browserChartData
                          : [{ name: "No Data", value: 1 }]
                      }
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) =>
                        browserChartData.length > 0
                          ? `${name}: ${(percent * 100).toFixed(0)}%`
                          : "No data available"
                      }
                      labelLine={browserChartData.length > 0}
                    >
                      {browserChartData.length > 0 ? (
                        browserChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))
                      ) : (
                        <Cell fill="#cccccc" />
                      )}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground text-center">
                Distribution of visitors by browser
              </div>
            </TabsContent>

            <TabsContent
              value="locations"
              className="bg-white p-4 rounded-lg border"
            >
              <div className="h-[400px] w-full overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={
                      locationChartData.length > 0
                        ? locationChartData
                        : [{ name: "No Data", value: 0 }]
                    }
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 12 }}
                      allowDecimals={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={100}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip formatter={(value) => [value, "Visitors"]} />
                    <Bar dataKey="value" fill={COLORS[0]} minPointSize={3}>
                      {locationChartData.length > 0 ? (
                        locationChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))
                      ) : (
                        <Cell fill="#cccccc" />
                      )}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground text-center">
                Top visitor locations by country
              </div>
            </TabsContent>

            <TabsContent
              value="referrers"
              className="bg-white p-4 rounded-lg border"
            >
              <div className="h-[400px] w-full overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={
                      referrerChartData.length > 0
                        ? referrerChartData
                        : [{ name: "No Data", value: 0 }]
                    }
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 12 }}
                      allowDecimals={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={100}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip formatter={(value) => [value, "Visitors"]} />
                    <Bar dataKey="value" fill={COLORS[0]} minPointSize={3}>
                      {referrerChartData.length > 0 ? (
                        referrerChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))
                      ) : (
                        <Cell fill="#cccccc" />
                      )}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground text-center">
                Top referrers that sent visitors to this link
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
