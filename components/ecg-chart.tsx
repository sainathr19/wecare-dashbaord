"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserId } from "@/hooks/useUserId";
import {
  format,
  subDays,
  addHours,
  addMinutes,
  differenceInDays,
  differenceInHours,
  isWithinInterval,
} from "date-fns";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { Heart } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DateRange } from "react-day-picker";
import zoomPlugin from "chartjs-plugin-zoom";

// Add to ChartJS registration
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

// Update the interface to match the API response
interface ECGData {
  timestamp: string;
  patientId: string;
  ecg_value: number;
  _id: string;
  __v: number;
}

interface ECGStats {
  averageHeartRate: number;
  maxHeartRate: number;
  minHeartRate: number;
  abnormalCount: number;
  totalReadings: number;
}
export default function ECGPage() {
  const { userId, loading, LoadingComponent } = useUserId();
  const [ecgData, setEcgData] = useState<ECGData[]>([]);
  const [stats, setStats] = useState<ECGStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [latestTimestamp, setLatestTimestamp] = useState<string>("");

  const calculateStats = (data: ECGData[]) => {
    if (data.length === 0) return null;

    const values = data.map((reading) => reading.ecg_value);
    return {
      averageHeartRate: Math.round(
        values.reduce((a, b) => a + b, 0) / values.length
      ),
      maxHeartRate: Math.max(...values),
      minHeartRate: Math.min(...values),
      abnormalCount: values.filter((v) => v > 2000 || v < 1800).length,
      totalReadings: values.length,
    };
  };

  useEffect(() => {
    const fetchECGData = async () => {
      if (!userId) return;

      try {
        const { data: res } = await axiosInstance.get(
          `/patient/ecg?patientId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.error) {
          throw new Error(res.error);
        }
        setEcgData(res.data.ecgData);
        if (res.data.ecgData.length > 0) {
          setLatestTimestamp(
            res.data.ecgData[res.data.ecgData.length - 1].timestamp
          );
        }
      } catch (error) {
        console.error("Failed to fetch ECG data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchECGData();
    const intervalId = setInterval(fetchECGData, 3000);
    return () => clearInterval(intervalId);
  }, [userId]);

  useEffect(() => {
    setStats(calculateStats(ecgData));
  }, [ecgData]);

  const chartData = {
    labels: ecgData
      .slice(-20)
      .map((reading) => format(new Date(reading.timestamp), "HH:mm:ss")),
    datasets: [
      {
        label: "ECG Reading",
        data: ecgData.slice(-20).map((reading) => reading.ecg_value),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        pointBackgroundColor: ecgData
          .slice(-20)
          .map((reading) =>
            reading.ecg_value >= 1800 && reading.ecg_value <= 2000
              ? "rgb(75, 192, 192)"
              : "rgb(255, 99, 132)"
          ),
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">ECG Monitoring</h1>
          {latestTimestamp && (
            <div className="text-sm text-muted-foreground ml-5 mt-2">
              Last updated:{" "}
              {format(new Date(latestTimestamp), "MMM dd, yyyy HH:mm:ss")}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average</CardTitle>
            <Heart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.averageHeartRate} mV
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Max</CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.maxHeartRate} mV</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Min</CardTitle>
            <Heart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.minHeartRate} mV</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ECG Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[500px]">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: false,
                  title: {
                    display: true,
                    text: "ECG Reading (mV)",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Time",
                  },
                  ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                    autoSkip: true,
                    maxTicksLimit: 10,
                    callback: function (val, index) {
                      return chartData.labels[index];
                    },
                  },
                },
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
