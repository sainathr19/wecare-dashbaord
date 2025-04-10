"use client";

import ReportsTable from "@/components/Reports/ReportsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axios";

interface Report {
  reportId: string;
  measurement: string;
  date: string;
  time: string;
  source: string;
  status: string;
  patientId: string;
  patientName: string;
}

const PatientReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { patientID } = useParams();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await axiosInstance.get(`/patient/reports?patientId=${patientID}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        
        if (data.status === "Ok" && Array.isArray(data.data.reports)) {
          setReports(data.data.reports);
        } else {
          setReports([]);
          console.error("Invalid data format received:", data);
        }
      } catch (error) {
        console.error("Failed to fetch reports:", error);
        setReports([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [patientID]);

  return (
    <Card className="w-2/3">
      <CardHeader>
        <CardTitle className="text-2xl">Reports</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">Loading...</div>
        ) : (
          <ReportsTable reports={reports}/>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientReports;
