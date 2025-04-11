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
          <TableHead className="text-center">Patient Id</TableHead>
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
              <TableCell className="font-medium text-center">
                {new Date(report.timestamp).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </TableCell>
              <TableCell className="font-medium text-center">
                {new Date(report.timestamp).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </TableCell>
              <TableCell className="font-medium text-center">{report.patientId}</TableCell>
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
