"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import PatientReportTemplate from "@/templates/reports/patient-report";
import Link from "next/link";
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const page = () => {
  const downloadReport = (): void => {
    console.log("Downloadingg");
    const reportelement = document.querySelector(".report");
    html2canvas(reportelement as HTMLElement).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      doc.save("patient-report.pdf");
    });
  };
  return (
    <ScrollArea>
      <div className="flex justify-around my-3 w-full">
        {/* <section className="flex flex-col gap-3">
          <Link href="/doctor/patientprofile" className="border-2 p-3">
            Back to profile
          </Link>
          <Button onClick={downloadReport} variant="outline">
            Download
          </Button>
        </section> */}
        <section className="report w-1/2" id="report">
          <PatientReportTemplate />
        </section>
      </div>
    </ScrollArea>
  );
};
export default page;
