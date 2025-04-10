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
  inPersonVisits: number;
  remoteCheckups: number;
  missedCheckups: number;
}

interface InsightsResponse {
  insights: InsightData[];
  total: number;
}

interface TransformedInsightData {
  name: string;
  "In-person Visits": number;
  "Remote Checkups": number;
  "Missed Checkups": number;
}

const CHART_CATEGORIES = [
  "In-person Visits",
  "Remote Checkups",
  "Missed Checkups",
];

const CHART_COLORS = ["blue", "yellow", "red"];

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
          "In-person Visits": item.inPersonVisits,
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

  const dataFormatter = (number: number) =>
    Intl.NumberFormat("us").format(number).toString();

  const renderContent = () => {
    if (isLoading) {
      return <Skeleton className="h-[300px] w-full" />;
    }

    if (error || !chartData.length) {
      return (
        <div className="flex items-center justify-center h-[300px] text-muted-foreground">
          {error || "No data available"}
        </div>
      );
    }

    return (
      <BarChart
        className="mt-6"
        data={chartData}
        index="name"
        categories={CHART_CATEGORIES}
        colors={CHART_COLORS}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    );
  };

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="text-lg">Insights</CardTitle>
          <CardDescription>Information about patient checkups</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default Insights;
