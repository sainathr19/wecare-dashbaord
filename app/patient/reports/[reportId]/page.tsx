"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import PatientReportTemplate from "@/templates/reports/patient-report";
import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { PageLoading } from "@/components/ui/page-loading";
import { ApiResponse } from "@/types/api";
import { ArrowLeft, Download } from "lucide-react";
import { Report } from "@/types/report";

interface PatientBio {
  _id: string;
  patientId: string;
  name: string;
  gender: string;
  age: number;
  bloodGroup: string;
  address: {
    city: string;
    zipCode: string;
  };
  membership: string;
  joinDate: string;
  emergencyContacts: {
    name: string;
    phone: string;
    relation: string;
  }[],
  birthDate: string;
}

const ReportPage = () => {
  const [report, setReport] = useState<Report | null>(null);
  const [patientBio, setPatientBio] = useState<PatientBio>();
  const [isLoading, setIsLoading] = useState(true);
  const { reportId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data: res } = await axiosInstance.get(`/doctor/reports/${reportId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        if (res.error) {
          throw new Error(res.error);
        }
        setReport(res.data!.report);
        setPatientBio(res.data!.patientBio);
      } catch (error) {
        console.error("Failed to fetch report:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  const downloadReport = (): void => {
    const reportElement = document.querySelector(".report");
    if (!reportElement) return;

    html2canvas(reportElement as HTMLElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      doc.save(`report-${reportId}.pdf`);
    });
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (!report || !patientBio) {
    return <div>Report not found</div>;
  }

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={() => router.back()}
            variant="ghost"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <Button 
            onClick={downloadReport} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>

        <div className="bg-background rounded-lg shadow-lg pt-8">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="max-w-3xl mx-auto report">
              <PatientReportTemplate report={report} patientBio={patientBio} />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
