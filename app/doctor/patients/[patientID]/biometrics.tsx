"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AreaChartComponent from "@/components/AreaChart/AreaChart";
import DataTable from "@/components/AreaChart/DataTable";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { ApiResponse } from "@/types/api";

const metricsConfig = {
  heartRate: {
    title: "Heart Rate",
    color: "grey",
    unit: "bpm"
  },
  oxygen: {
    title: "SpO2",
    color: "grey",
    unit: "%"
  },
  temperature: {
    title: "Temperature",
    color: "grey",
    unit: "°F"
  }
};

type BiometricsData = {
  timestamp: string;
  heartRate: number;
  oxygen: number;
  temperature: number;
}

const Biometrics = () => {
  const params = useParams();
  const [biometricsData, setBiometricsData] = useState<BiometricsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBiometrics = async () => {
      try {
        const {data : res} = await axiosInstance.get<ApiResponse<BiometricsData[]>>(
          `/patient/biometrics?patientId=${params.patientID}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            } 
          }
        );
        if (res.error) {
          throw new Error(res.error);
        }
        setBiometricsData(res.data!);
      } catch (error) {
        console.error('Error fetching biometrics:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBiometrics();
  }, [params.patientID]);

  const biometricData = Object.entries(metricsConfig).reduce((acc, [key, config]) => {
    const data = biometricsData.map(day => ({
      date: format(new Date(day.timestamp), "MMM dd"),
      time: format(new Date(day.timestamp), "hh:mm a"),
      value: day[key as keyof typeof biometricsData[0]]
    }));

    return {
      ...acc,
      [key]: {
        ...config,
        data
      }
    };
  }, {} as Record<keyof typeof metricsConfig, typeof metricsConfig[keyof typeof metricsConfig] & { data: { date: string; time: string; value: number }[] }>);

  if (isLoading) {
    return <div className="flex justify-center items-center h-48">Loading...</div>;
  }

  return (
    <Tabs defaultValue="heartRate" className="">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Biometrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <TabsList className="gap-5">
              <TabsTrigger value="heartRate">Heart Rate</TabsTrigger>
              <TabsTrigger value="oxygen">SpO2</TabsTrigger>
              <TabsTrigger value="temperature">Temperature</TabsTrigger>
            </TabsList>
          </div>
          
          {Object.entries(biometricData).map(([key, metric]) => (
            <TabsContent key={key} value={key} className="flex flex-col gap-5">
              <AreaChartComponent 
                data={metric.data}
                category={metric.title}
                color={metric.color}
              />
              <div className="p-3">
                <DataTable data={metric.data} />
              </div>
            </TabsContent>
          ))}
        </CardContent>
      </Card>
    </Tabs>
  );
};

export default Biometrics;
