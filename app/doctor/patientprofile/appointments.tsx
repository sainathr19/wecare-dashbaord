import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
  TableFooter,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/Badge/Badge";
const DummyData = [
  {
    date: "19 Jan 2023",
    time: "9:30",
    type: "Regular Checkup",
    comments: "",
    status: "Upcoming",
  },
  {
    date: "20 Jan 2023",
    time: "10:30",
    type: "Report",
    comments: "severe",
    status: "Completed",
  },
  {
    date: "19 Jan 2023",
    time: "9:30",
    type: "Checkup",
    comments: "not bad",
    status: "Completed",
  },
];

const Appointments = () => {
  return (
    <Tabs defaultValue="week" className="">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="week">All Appointments</TabsTrigger>
          <TabsTrigger value="month">Upcoming</TabsTrigger>
          <TabsTrigger value="year">Completed</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="week">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead className="hidden sm:table-cell text-center">
                    Treatment Type
                  </TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DummyData.map(
                  ({ date, time, type, comments, status }, index) => {
                    return (
                      <TableRow key={index} className="bg-accent">
                        <TableCell className="hidden md:table-cell text-center">
                          {date}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="font-medium">{type}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-center">
                          <Badge className="text-xs" variant="success">
                            {status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default Appointments;
