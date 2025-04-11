"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import ReportsTable from "@/components/Reports/ReportsTable";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { PageLoading } from "@/components/ui/page-loading";
import { Search } from "lucide-react";

interface Report {
  _id: string;
  reportId: string;
  timestamp: string;
  source: string;
  status: string;
  patientId: string;
  doctorId: string;
  type: string;
  isViewed: boolean;
  temperature: string;
  heartRate: string;
  createdAt: string;
  updatedAt: string;
}


export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUnviewed, setShowUnviewed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data } = await axiosInstance.get('/doctor/reports',{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      if (data.status === "Ok") {
        setReports(data.data.reports);
      }
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredReports = reports
    .filter(report => showUnviewed ? !report.isViewed : report.isViewed)
    .filter(report => 
      report.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.timestamp.includes(searchQuery) ||
      report.status.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  if (isLoading) {
    return <PageLoading />;
  }

  const hasReports = reports.length > 0;
  const hasFilteredReports = filteredReports.length > 0;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Reports</p>
              <p className="text-2xl font-bold">{reports.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Unviewed Reports</p>
              <p className="text-2xl font-bold">{reports.filter(r => !r.isViewed).length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Viewed Reports</p>
              <p className="text-2xl font-bold">{reports.filter(r => r.isViewed).length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {hasReports ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={showUnviewed}
                      onCheckedChange={setShowUnviewed}
                    />
                    <span className="text-sm">Show Unviewed</span>
                  </div>
                </div>
                <div className="relative w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              {hasFilteredReports ? (
                <ReportsTable reports={filteredReports} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No reports match your search criteria</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg font-medium mb-2">No Reports Available</p>
              <p className="text-muted-foreground">Reports will appear here once patients submit their measurements</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}