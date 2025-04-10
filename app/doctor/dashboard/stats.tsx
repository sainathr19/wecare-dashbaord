import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";
import { LapTimerIcon } from "@radix-ui/react-icons";
import { Users, Activity, CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useUserId } from "@/hooks/useUserId";

interface StatsData {
  totalPatients: number;
  abnormalCases: number;
  // appointments: number;
  pendingToday: number;
}

const Stats = () => {
  const [stats, setStats] = useState<StatsData>({
    totalPatients: 0,
    abnormalCases: 0,
    // appointments: 0,
    pendingToday: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const { userId, loading } = useUserId();

  useEffect(() => {
    const fetchStats = async () => {
      if (!userId) return;
      
      try {
        const { data } = await axiosInstance.get(`/doctor/stats?doctorId=${userId}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        if (data.status === "Ok") {
          setStats(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      fetchStats();
    }
  }, [userId, loading]);

  return (
    <div className="grid gap-4 grid-cols-3 h-max">
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoading ? "..." : stats.totalPatients}</div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Abnormal</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoading ? "..." : stats.abnormalCases}</div>
        </CardContent>
      </Card>
      {/* <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Appointments</CardTitle>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoading ? "..." : stats.appointments}</div>
        </CardContent>
      </Card> */}
      <Card x-chunk="dashboard-01-chunk-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Today</CardTitle>
          <LapTimerIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{isLoading ? "..." : stats.pendingToday}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
