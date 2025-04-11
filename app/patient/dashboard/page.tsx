"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Thermometer, Octagon } from "lucide-react";
import { PageLoading } from "@/components/ui/page-loading";
import AreaChartComponent from "@/components/AreaChart/AreaChart";
import { useUserId } from "@/hooks/useUserId";
import axiosInstance from "@/lib/axios";

interface Report {
  timestamp: string;
  temperature: string;
  bloodOxygen: number;
  heartRate: number;
}

export default function PatientDashboard() {
  const { loading, LoadingComponent, userId } = useUserId();
  const { auth } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [latestReport, setLatestReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      if (!userId) return;
      try {
        const { data: res } = await axiosInstance.get(
          `/patient/reports?patientId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );
        if (res.error) {
          throw new Error(res.error);
        }
        setReports(res.data.reports);
        setLatestReport(res.data.reports[res.data.reports.length - 1]);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading && isReady) {
      fetchReports();
    }
  }, [userId, loading, isReady]);

  useEffect(() => {
    if (!auth.isLoading) {
      if (!auth.isAuthenticated || !auth.user?.userId || auth.user?.role !== "PATIENT") {
        router.push("/auth/signin");
      } else {
        setIsReady(true);
      }
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.user, router]);

  if (auth.isLoading || !isReady) {
    return <PageLoading />;
  }

  if (loading && LoadingComponent) {
    return <LoadingComponent />;
  }

  const formatChartData = (reports: Report[], metric: 'heartRate' | 'temperature' | 'bloodOxygen') => {
    return reports.map(report => ({
      date: new Date(report.timestamp).toLocaleDateString('en-US', { weekday: 'short' }),
      time: new Date(report.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }),
      value: metric === 'temperature' ? parseFloat(report.temperature) : report[metric]
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome Back, {auth?.user?.name}</h1>
        
      <div className="grid gap-6 md:grid-cols-3 my-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <Heart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestReport ? `${latestReport.heartRate.toFixed(2)} BPM` : "-- BPM"}
            </div>
            <p className="text-xs text-muted-foreground">Latest reading</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestReport ? `${parseFloat(latestReport.temperature).toFixed(2)}°F` : "-- °F"}
            </div>
            <p className="text-xs text-muted-foreground">Latest reading</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">SpO2</CardTitle>
            <Octagon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestReport ? `${latestReport.bloodOxygen.toFixed(2)}%` : "--%"}
            </div>
            <p className="text-xs text-muted-foreground">Latest reading</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Heart Rate Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <AreaChartComponent
              data={formatChartData(reports, 'heartRate')}
              category="Heart Rate"
              color="grey"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Temperature Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <AreaChartComponent
              data={formatChartData(reports, 'temperature')}
              category="Temperature"
              color="amber"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SpO2 Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <AreaChartComponent
              data={formatChartData(reports, 'bloodOxygen')}
              category="SpO2"
              color="blue"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}