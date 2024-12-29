import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import AppointmentCell from "./single-cell";

const DoctorAppointments = () => {
  return (
    <Card className="m-3">
      <CardHeader>
        <CardTitle className="text-xl">Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="flex gap-5 w-max">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="unconfirmed">Unconfirmed</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <section className="mt-2">
            <TabsContent value="upcoming" className="w-2/3 flex flex-col gap-3">
              <AppointmentCell />
              <AppointmentCell />
            </TabsContent>
            <TabsContent
              value="unconfirmed"
              className="w-2/3 flex flex-col gap-3"
            >
              <AppointmentCell />
            </TabsContent>
            <TabsContent
              value="completed"
              className="w-2/3 flex flex-col gap-3"
            >
              <AppointmentCell />
            </TabsContent>
            <TabsContent
              value="cancelled"
              className="w-2/3 flex flex-col gap-3"
            >
              <AppointmentCell />
            </TabsContent>
            <TabsContent value="all" className="w-2/3 flex flex-col gap-3">
              <AppointmentCell />
            </TabsContent>
          </section>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DoctorAppointments;
