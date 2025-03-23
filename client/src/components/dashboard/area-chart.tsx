/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  TooltipProps,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Default data if none is provided
const defaultChartData = [
  { date: "2023-01-01", clicks: 0 },
  { date: "2023-02-01", clicks: 0 },
  { date: "2023-03-01", clicks: 0 },
  { date: "2023-04-01", clicks: 0 },
  { date: "2023-05-01", clicks: 0 },
  { date: "2023-06-01", clicks: 0 },
  { date: "2023-07-01", clicks: 0 },
];

interface ChartData {
  date: string;
  clicks: number;
}

interface LinearAreaChartProps {
  data?: ChartData[] | Record<string, number> | undefined;
}

export function LinearAreaChart({
  data = defaultChartData,
}: LinearAreaChartProps) {
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Generate default data for the last 30 days if no data is provided
  const generateLastThirtyDaysData = () => {
    const result = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      result.push({
        date: formatDate(date),
        clicks: 0,
      });
    }

    return result;
  };

  // Process data to ensure it's in the right format
  const chartData = React.useMemo(() => {
    // If it's undefined, use the default
    if (!data) return defaultChartData;

    // If it's already an array, use it directly (assuming it has the right shape)
    if (Array.isArray(data)) {
      // Make sure we have data with actual clicks (non-zero)
      if (data.length > 0 && data.some((item) => item.clicks > 0)) {
        return data;
      }
      return generateLastThirtyDaysData();
    }

    // If it's an object (Record<string, number>), convert to array format
    const processedData = Object.entries(data)
      .map(([date, clicks]) => ({
        date,
        clicks: typeof clicks === "number" ? clicks : 0,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Make sure we have data with actual clicks (non-zero)
    if (
      processedData.length > 0 &&
      processedData.some((item) => item.clicks > 0)
    ) {
      return processedData;
    }

    return generateLastThirtyDaysData();
  }, [data]);

  const currentDate = new Date();
  const lastThirtyDaysDate = new Date();
  lastThirtyDaysDate.setDate(currentDate.getDate() - 30);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as ChartData;
      const date = new Date(data.date);
      const formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;

      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="text-xs font-medium">{formattedDate}</p>
          <p className="text-xs text-gray-700">
            <span className="font-medium">Clicks:</span> {data.clicks}
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate total clicks
  const totalClicks = chartData.reduce((sum, item) => sum + item.clicks, 0);

  // Format data for better display - ensure we always show 30 days
  const visibleData = chartData.length > 30 ? chartData.slice(-30) : chartData;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle>Link Traffic</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-[hsl(var(--primary))]" />
              <span className="text-xs font-medium">Clicks</span>
            </div>
          </div>
        </div>
        <CardDescription>
          {`${formatDate(lastThirtyDaysDate)} - ${formatDate(currentDate)}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={visibleData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}
                angle={-30}
                height={50}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={5}
                domain={[0, (dataMax: number) => Math.max(1, dataMax)]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                dataKey="clicks"
                type="monotone"
                strokeWidth={2}
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary) / 20%)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center gap-2">
          <TrendingUp className="h-4 w-4 text-gray-500" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Total Clicks:</span>
            <span className="text-sm text-gray-500">{totalClicks}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
