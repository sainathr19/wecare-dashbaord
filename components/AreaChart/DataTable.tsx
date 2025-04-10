"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../Badge/Badge";

interface DataPoint {
  date: string;
  time: string;
  value: number;
}

interface DataTableProps {
  data: DataPoint[];
}

export default function DataTable({ data }: DataTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center p-4 text-muted-foreground">
        No data available
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Time</TableHead>
          <TableHead className="text-center">Value</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((point, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium text-center">
              {point.date}
            </TableCell>
            <TableCell className="font-medium text-center">
              {point.time}
            </TableCell>
            <TableCell className="font-medium text-center">
              {point.value}
            </TableCell>
            <TableCell className="text-center">
              <Badge variant="success">Normal</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
