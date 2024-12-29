import { Badge } from "@/components/Badge/Badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { TableHeader } from "@/components/ui/table";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
const TopReports = () => {
  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="text-lg">Patients</CardTitle>
          <CardDescription>Patients with abnormal test reports</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/doctor/patientlist">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead className="text-center">Condition</TableHead>
              <TableHead className="text-center">Note</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className=" font-semibold pl-0">
                Oliva martin
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="error">Critical</Badge>
              </TableCell>
              <TableCell className="text-center">-</TableCell>
              <TableCell className="text-center">
                <Button variant="outline" className="font-normal">
                  Check reports
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className=" font-semibold pl-0">
                Sainath Reddy
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="warning">Abnormal</Badge>
              </TableCell>
              <TableCell className="text-center">Chest pain</TableCell>
              <TableCell className="text-center">
                <Button variant="outline" className="font-normal">
                  Check reports
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className=" font-semibold pl-0">William Kim</TableCell>
              <TableCell className="text-center">
                <Badge variant="warning">Abnormal</Badge>
              </TableCell>
              <TableCell className="text-center">Migrain</TableCell>
              <TableCell className="text-center">
                <Button variant="outline" className="font-normal">
                  Check reports
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopReports;
