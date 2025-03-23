"use client";

import React from "react";
import OverallAnalytics from "@/components/dashboard/analytics/overall-analytics";

const Analytics = () => {
  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold">Analytics Dashboard</h1>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <OverallAnalytics />
      </div>
    </div>
  );
};

export default Analytics;
