import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/Badge/Badge";
import { format } from "date-fns";

const DummyData = [
  {
    timestamp: "2024-01-19T09:30:00.000Z",
    type: "Regular Checkup",
    status: "Upcoming",
  },
  {
    timestamp: "2024-01-25T14:30:00.000Z",
    type: "Follow-up",
    status: "Upcoming",
  },
  {
    timestamp: "2024-01-28T11:00:00.000Z",
    type: "Regular Checkup",
    status: "Upcoming",
  },
  {
    timestamp: "2024-02-01T15:45:00.000Z",
    type: "Report Review",
    status: "Upcoming",
  }
];

const Appointments = () => {
  const getFilteredData = (tab: string) => {
    let filteredData;
    switch (tab) {
      case "month":
        filteredData = DummyData.filter(app => app.status === "Upcoming");
        break;
      case "year":
        filteredData = DummyData.filter(app => app.status === "Completed");
        break;
      default:
        filteredData = DummyData;
    }
    return filteredData.slice(0, 3); // Limit to 3 entries
  };

  return (
    <Tabs defaultValue="week" className="rounded-lg h-full">
      <div className="flex items-center mb-2">
        <TabsList>
          <TabsTrigger value="week">All Appointments</TabsTrigger>
          <TabsTrigger value="month">Upcoming</TabsTrigger>
          <TabsTrigger value="year">Completed</TabsTrigger>
        </TabsList>
      </div>

      {["week", "month", "year"].map((tab) => (
        <TabsContent key={tab} value={tab} className="h-full">
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-center">Time</TableHead>
                    <TableHead className="text-center">Type</TableHead>
                    {tab === "week" && (
                      <TableHead className="text-center">Status</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredData(tab).length === 0 ? (
                    <TableRow>
                      <TableCell 
                        colSpan={tab === "week" ? 4 : 3} 
                        className="text-center h-24 text-muted-foreground"
                      >
                        <p className="text-lg mb-1">No appointments found</p>
                        <p className="text-sm">
                          {tab === "year" 
                            ? "No completed appointments available" 
                            : tab === "month"
                            ? "No upcoming appointments scheduled"
                            : "No appointments to display"}
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    getFilteredData(tab).map((appointment, index) => {
                      const date = format(new Date(appointment.timestamp), "MMM dd, yyyy");
                      const time = format(new Date(appointment.timestamp), "hh:mm a");
                      
                      return (
                        <TableRow key={index}>
                          <TableCell className="text-center">{date}</TableCell>
                          <TableCell className="text-center">{time}</TableCell>
                          <TableCell className="text-center">
                            <div className="font-medium">{appointment.type}</div>
                          </TableCell>
                          {tab === "week" && (
                            <TableCell className="text-center">
                              <Badge 
                                variant={appointment.status === "Completed" ? "success" : "warning"}
                                className="text-xs"
                              >
                                {appointment.status}
                              </Badge>
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default Appointments;
