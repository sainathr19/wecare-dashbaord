"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/Badge/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { EyeOpenIcon, DownloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useUserId } from "@/hooks/useUserId";
import { PageLoading } from "@/components/ui/page-loading";
import { ApiResponse } from "@/types/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

interface Report {
  reportId: string;
  timestamp : string
  doctorId: string;
  status: string;
  type: string;
  isViewed: boolean;
}

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit'
  });
};

const getStatusVariant = (isViewed: boolean) => {
  return isViewed ? 'success' : 'warning';
};

const getStatusText = (isViewed: boolean) => {
  return isViewed ? 'Reviewed' : 'Under Review';
};

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId, loading, LoadingComponent } = useUserId();
  const router = useRouter();

  useEffect(() => {
    const fetchReports = async () => {
      if (!userId) return;
      try {
        const { data: res } = await axiosInstance.get<ApiResponse<{reports: Report[], total: number}>>(`/patient/reports?patientId=${userId}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        if (res.error) {
          throw new Error(res.error);
        }
        setReports(res.data!.reports || []);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
        setReports([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [userId]);

  if (loading && LoadingComponent) {
    return <LoadingComponent />;
  }

  if (isLoading) {
    return <PageLoading />;
  }

  const handleDownload = async (reportId: string): Promise<void> => {
    try {
      // Show loading toast
      toast.loading("Preparing report for download...");

      const reportWindow = window.open(`/patient/reports/${reportId}`, '_blank');
      if (!reportWindow) {
        toast.error("Failed to open report. Please check your popup settings.");
        return;
      }

      reportWindow.onload = () => {
        const reportElement = reportWindow.document.querySelector(".report");
        if (!reportElement) {
          toast.error("Could not find report content");
          reportWindow.close();
          return;
        }

        html2canvas(reportElement as HTMLElement)
          .then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const doc = new jsPDF("p", "mm", "a4");
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
            doc.save(`report-${reportId}.pdf`);
            reportWindow.close();
            toast.success("Report downloaded successfully!");
          })
          .catch((error) => {
            console.error('Error generating PDF:', error);
            toast.error("Failed to generate PDF");
            reportWindow.close();
          });
      };

      reportWindow.onerror = () => {
        toast.error("Failed to load report content");
        reportWindow.close();
      };
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.error("Failed to download report");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Medical Reports</CardTitle>
          {reports.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Total Reports: {reports.length}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead className="text-center">Time</TableHead>
                  <TableHead className="text-center">Type</TableHead>
                  <TableHead className="text-center">Doctor Id</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No medical reports found
                    </TableCell>
                  </TableRow>
                ) : (
                  reports.map((report) => (
                    <TableRow key={report.reportId}>
                      <TableCell className="text-center">{formatDate(report.timestamp)}</TableCell>
                      <TableCell className="text-center">{formatTime(report.timestamp)}</TableCell>
                      <TableCell className="text-center">{report.type}</TableCell>
                      <TableCell className="text-center">{report.doctorId}</TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant={getStatusVariant(report.isViewed)}
                        >
                          {getStatusText(report.isViewed)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/patient/reports/${report.reportId}`)}
                          >
                            <EyeOpenIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownload(report.reportId)}
                          >
                            <DownloadIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}