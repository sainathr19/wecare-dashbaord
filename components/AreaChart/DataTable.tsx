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
import { Badge } from "../Badge/Badge";
const invoices = [
  {
    measurement: "99.00",
    date: "22 May",
    time: "9:30",
    source: "Wecare 1",
    status: "Normal",
  },
  {
    measurement: "99.00",
    date: "23 May",
    time: "19:30",
    source: "Wecare 1",
    status: "Normal",
  },
  {
    measurement: "199.00",
    date: "24 May",
    time: "19:03",
    source: "Wecare 1",
    status: "Normal",
  },
  {
    measurement: "9.00",
    date: "25 May",
    time: "2:30",
    source: "Wecare 1",
    status: "Normal",
  },
];

export default function DataTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-center">Measurement</TableHead>
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Time</TableHead>
          <TableHead className="text-center">Source</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.measurement}>
            <TableCell className="font-medium text-center">
              {invoice.measurement}
            </TableCell>
            <TableCell className="font-medium text-center">
              {invoice.date}
            </TableCell>
            <TableCell className="text-center">{invoice.time}</TableCell>
            <TableCell className="text-center">{invoice.source}</TableCell>
            <TableCell className="text-center">
              <Badge variant="success">{invoice.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
