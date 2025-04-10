"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Thermometer, Octagon } from "lucide-react";
import { PageLoading } from "@/components/ui/page-loading";
import AreaChartComponent from "@/components/AreaChart/AreaChart";
import { useUserId } from "@/hooks/useUserId";

export default function PatientDashboard() {
  const { loading, LoadingComponent } = useUserId();
  const { auth } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

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

  const heartRateData = [
    { date: "Mon", time: "9:00 AM", value: 75 },
    { date: "Tue", time: "9:00 AM", value: 78 },
    { date: "Wed", time: "9:00 AM", value: 71 },
    { date: "Thu", time: "9:00 AM", value: 73 },
    { date: "Fri", time: "9:00 AM", value: 76 },
    { date: "Sat", time: "9:00 AM", value: 74 },
    { date: "Sun", time: "9:00 AM", value: 72 },
  ];

  const temperatureData = [
    { date: "Mon", time: "9:00 AM", value: 98.4 },
    { date: "Tue", time: "9:00 AM", value: 98.7 },
    { date: "Wed", time: "9:00 AM", value: 98.5 },
    { date: "Thu", time: "9:00 AM", value: 98.8 },
    { date: "Fri", time: "9:00 AM", value: 98.3 },
    { date: "Sat", time: "9:00 AM", value: 98.6 },
    { date: "Sun", time: "9:00 AM", value: 98.5 },
  ];

  const spo2Data = [
    { date: "Mon", time: "9:00 AM", value: 98 },
    { date: "Tue", time: "9:00 AM", value: 97 },
    { date: "Wed", time: "9:00 AM", value: 99 },
    { date: "Thu", time: "9:00 AM", value: 96 },
    { date: "Fri", time: "9:00 AM", value: 97 },
    { date: "Sat", time: "9:00 AM", value: 98 },
    { date: "Sun", time: "9:00 AM", value: 97 },
  ];

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
            <div className="text-2xl font-bold">72 BPM</div>
            <p className="text-xs text-muted-foreground">Normal range</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.6°F</div>
            <p className="text-xs text-muted-foreground">Normal range</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">SpO2</CardTitle>
            <Octagon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97%</div>
            <p className="text-xs text-muted-foreground">Normal range</p>
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
              data={heartRateData}
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
              data={temperatureData}
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
              data={spo2Data}
              category="SpO2"
              color="blue"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}