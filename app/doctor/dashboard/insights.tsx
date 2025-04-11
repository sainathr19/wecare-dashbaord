import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart } from "@tremor/react";
import React, { useEffect, useState } from "react";
import { useUserId } from "@/hooks/useUserId";
import axiosInstance from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { Skeleton } from "@/components/ui/skeleton";

interface InsightData {
  date: string;
  remoteCheckups: number;
  missedCheckups: number;
}

interface InsightsResponse {
  insights: InsightData[];
  total: number;
}

interface TransformedInsightData {
  name: string;
  "Remote Checkups": number;
  "Missed Checkups": number;
}

const CHART_CATEGORIES = [
  "Remote Checkups",
  "Missed Checkups",
];

const CHART_COLORS = ["yellow", "red"];

const Insights = () => {
  const [chartData, setChartData] = useState<TransformedInsightData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId, loading } = useUserId();

  useEffect(() => {
    const fetchInsights = async () => {
      if (!userId) return;
      
      try {
        setError(null);
        const { data: res } = await axiosInstance.get<ApiResponse<InsightsResponse>>(
          `/doctor/insights?doctorId=${userId}`
        ,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },  
      });

        if (!res || res.status === "Error") {
          throw new Error(res?.error || "Failed to fetch insights");
        }

        if (!res.data?.insights) {
          setChartData([]);
          return;
        }

        const transformedData = res.data.insights.map((item) => ({
          name: new Date(item.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          }),
          "Remote Checkups": item.remoteCheckups,
          "Missed Checkups": item.missedCheckups,
        }));

        setChartData(transformedData);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch insights";
        setError(errorMessage);
        console.error("Failed to fetch insights:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      fetchInsights();
    }
  }, [userId, loading]);

  const dataFormatter = (number: number) => Math.round(number).toString();
  return (
    <BarChart
      className="mt-6"
      data={chartData}
      index="name"
      categories={CHART_CATEGORIES}
      colors={CHART_COLORS}
      valueFormatter={dataFormatter}
      showLegend
      minValue={0}
      maxValue={3}
      showGridLines
      showYAxis
      autoMinValue={false}
      yAxisWidth={30}
    />
  );
};

export default Insights;
