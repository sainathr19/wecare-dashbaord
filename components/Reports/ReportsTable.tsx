"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
import { CardDescription } from "../ui/card";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

const reports: any[] = [
  {
    measurement: "99.00",
    date: "22 May 2023",
    time: "9:30",
    source: "Wecare 1",
    status: "Normal",
  },
  {
    measurement: "99.00",
    date: "23 May 2023",
    time: "19:30",
    source: "Wecare 1",
    status: "Normal",
  },
  {
    measurement: "199.00",
    date: "24 May 2023",
    time: "19:03",
    source: "Wecare 1",
    status: "Normal",
  },
  {
    measurement: "9.00",
    date: "25 May 2023",
    time: "2:30",
    source: "Wecare 1",
    status: "Normal",
  },
];

export default function ReportsTable() {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px] text-center">Date</TableHead>
          <TableHead className="text-center">Time</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.date}>
            <TableCell className="font-medium text-center">
              {report.date}
            </TableCell>
            <TableCell className="font-medium text-center">
              {report.time}
            </TableCell>
            <TableCell className="text-center">
              <Badge variant="success">{report.status}</Badge>
            </TableCell>
            <TableCell className="flex gap-2 justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/doctor/reports/Az8b9")}
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
        ))}
      </TableBody>
    </Table>
  );
}
