"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, subDays } from "date-fns";
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
} from 'chart.js';
import { DateRange } from "react-day-picker";
import zoomPlugin from 'chartjs-plugin-zoom';
import { useParams } from "next/navigation";

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

// Add new imports
import { Button } from "@/components/ui/button";
import { addHours, addMinutes, differenceInDays, differenceInHours, isWithinInterval } from "date-fns";

// Add after ECGStats interface
type TimeFilter = '30min' | '1hour' | 'custom';

// Add to component
export default function ECGPage() {
  const params = useParams();
  const patientId = params.patientID as string;
  const [ecgData, setEcgData] = useState<ECGData[]>([]);
  const [stats, setStats] = useState<ECGStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('1hour');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [latestTimestamp, setLatestTimestamp] = useState<string>('');

  // Add this function after state declarations
  // Update the calculateStats function to use filtered data
  const calculateStats = (data: ECGData[]) => {
    const visibleData = getVisibleData(data);
    if (visibleData.length === 0) return null;
    
    const values = visibleData.map(reading => reading.ecg_value);
    return {
      averageHeartRate: Math.round(values.reduce((a, b) => a + b, 0) / values.length),
      maxHeartRate: Math.max(...values),
      minHeartRate: Math.min(...values),
      abnormalCount: values.filter(v => v > 2000 || v < 1800).length,
      totalReadings: visibleData.length
    };
  };

  // Update useEffect to recalculate stats when data changes
  useEffect(() => {
    const fetchECGData = async () => {
      if (!patientId || !dateRange.from || !dateRange.to) return;
      
      try {
        const startTime = format(dateRange.from, "yyyy-MM-dd'T'HH:mm:ss'Z'");
        const endTime = format(dateRange.to, "yyyy-MM-dd'T'HH:mm:ss'Z'");
        
        const { data: res } = await axiosInstance.get(
          `/patient/ecg?patientId=${patientId}&startTime=${startTime}&endTime=${endTime}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );

        if (res.error) {
          throw new Error(res.error);
        }

        setEcgData(res.data.ecgData);
        setLatestTimestamp(res.data.ecgData[res.data.ecgData.length - 1].timestamp);
      } catch (error) {
        console.error("Failed to fetch ECG data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchECGData();
    const intervalId = setInterval(fetchECGData, 3000);
    return () => clearInterval(intervalId);
  }, [patientId, dateRange, timeFilter]);

  useEffect(() => {
    setStats(calculateStats(ecgData));
  }, [ecgData, timeFilter, dateRange]);

  const aggregateData = (data: ECGData[]) => {
    if (!dateRange.from || !dateRange.to) return data;
    
    const daysDiff = differenceInDays(dateRange.to, dateRange.from);
    const hoursDiff = differenceInHours(dateRange.to, dateRange.from);

    if (timeFilter === '30min') {
      return data.filter(reading => 
        isWithinInterval(new Date(reading.timestamp), {
          start: addMinutes(new Date(), -30),
          end: new Date()
        })
      );
    }

    if (timeFilter === '1hour') {
      return data.filter(reading => 
        isWithinInterval(new Date(reading.timestamp), {
          start: addHours(new Date(), -1),
          end: new Date()
        })
      );
    }

    // Aggregate if data span is more than a day
    if (daysDiff > 1) {
      const aggregated: ECGData[] = [];
      const groupedByDay = data.reduce((acc, reading) => {
        const day = format(new Date(reading.timestamp), 'yyyy-MM-dd');
        if (!acc[day]) acc[day] = [];
        acc[day].push(reading);
        return acc;
      }, {} as Record<string, ECGData[]>);

      Object.entries(groupedByDay).forEach(([day, readings]) => {
        const avgValue = Math.round(readings.reduce((sum, r) => sum + r.ecg_value, 0) / readings.length);
        aggregated.push({
          ...readings[0],
          timestamp: `${day}T12:00:00Z`,
          ecg_value: avgValue
        });
      });
      return aggregated;
    }

    // Aggregate by hour if data span is more than 6 hours
    if (hoursDiff > 6) {
      const aggregated: ECGData[] = [];
      const groupedByHour = data.reduce((acc, reading) => {
        const hour = format(new Date(reading.timestamp), 'yyyy-MM-dd HH');
        if (!acc[hour]) acc[hour] = [];
        acc[hour].push(reading);
        return acc;
      }, {} as Record<string, ECGData[]>);

      Object.entries(groupedByHour).forEach(([hour, readings]) => {
        const avgValue = Math.round(readings.reduce((sum, r) => sum + r.ecg_value, 0) / readings.length);
        aggregated.push({
          ...readings[0],
          timestamp: `${hour}:00:00Z`,
          ecg_value: avgValue
        });
      });
      return aggregated;
    }

    return data;
  };

  // Add this state for pagination
  const [visibleDataCount] = useState(30);

  const getVisibleData = (data: ECGData[]) => {
    const aggregatedData = aggregateData(data);
    return aggregatedData.slice(Math.max(aggregatedData.length - visibleDataCount, 0));
  };

  // Update chart data section
  const chartData = {
    labels: getVisibleData(ecgData).map(reading => 
      format(new Date(reading.timestamp), 
        timeFilter === 'custom' ? 'MMM dd, HH:mm' : 'HH:mm:ss'
      )
    ),
    datasets: [
      {
        label: 'ECG Reading',
        data: getVisibleData(ecgData).map(reading => reading.ecg_value),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        pointBackgroundColor: getVisibleData(ecgData).map(reading => 
          (reading.ecg_value >= 1800 && reading.ecg_value <= 2000) 
            ? 'rgb(75, 192, 192)' 
            : 'rgb(255, 99, 132)'
        ),
      }
    ]
  };

  // Add time filter buttons in the return JSX after the DateRangePicker
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">ECG Monitoring</h1>
        {latestTimestamp && (
          <div className="text-sm text-muted-foreground ml-5 mt-2">
            Last updated: {format(new Date(latestTimestamp), 'MMM dd, yyyy HH:mm:ss')}
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
            <div className="text-2xl font-bold">{stats?.averageHeartRate} mV</div>
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
                    text: 'ECG Reading (mV)'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Time'
                  }
                }
              }
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}