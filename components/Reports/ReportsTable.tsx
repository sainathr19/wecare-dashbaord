"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DotsVerticalIcon,
  EyeOpenIcon,
  DownloadIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Badge } from "../Badge/Badge";
import { useRouter } from "next/navigation";

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

interface ReportsTableProps {
  reports: Report[];
}

export default function ReportsTable({ reports }: ReportsTableProps) {
  const router = useRouter();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px] text-center">Date</TableHead>
          <TableHead className="text-center">Time</TableHead>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
              No reports found
            </TableCell>
          </TableRow>
        ) : (
          reports.map((report) => (
            <TableRow key={report.reportId}>
              <TableCell className="font-medium text-center">{report.date}</TableCell>
              <TableCell className="font-medium text-center">{report.time}</TableCell>
              <TableCell className="font-medium text-center">{report.patientName}</TableCell>
              <TableCell className="text-center">
                <Badge variant={report.status.toLowerCase() === "normal" ? "success" : "warning"}>
                  {report.status}
                </Badge>
              </TableCell>
              <TableCell className="flex gap-2 justify-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/doctor/reports/${report.reportId}`)}
                >
                  <EyeOpenIcon />
                </Button>
                <Button variant="outline">
                  <DownloadIcon />
                </Button>
                <Button variant="outline">
                  <DotsVerticalIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
