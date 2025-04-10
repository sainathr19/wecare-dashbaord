"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AppointmentCell from "./single-cell";
import DateSelector from "@/components/dashboard/DateSelector";
import { format, parse } from "date-fns";

const DoctorAppointments = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Get initial date from URL or use current date
  const getInitialDate = () => {
    const dateParam = searchParams.get('date');
    if (dateParam) {
      try {
        return parse(dateParam, 'yyyy-MM-dd', new Date());
      } catch (e) {
        return new Date();
      }
    }
    return new Date();
  };

  const [selectedDate, setSelectedDate] = useState<Date>(getInitialDate());

  const handleDateChange = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const params = new URLSearchParams(searchParams.toString());
    params.set('date', formattedDate);
    router.push(`?${params.toString()}`);
    setSelectedDate(date);
  };

  // Update date when URL changes
  useEffect(() => {
    const dateParam = searchParams.get('date');
    if (dateParam) {
      try {
        const parsedDate = parse(dateParam, 'yyyy-MM-dd', new Date());
        setSelectedDate(parsedDate);
      } catch (e) {
        console.error('Invalid date in URL');
      }
    }
  }, [searchParams]);

  return (
    <div className="space-y-4 p-4">
      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Appointments</CardTitle>
          </div>
          <div className="flex flex-col gap-4">
            <DateSelector onDateChange={handleDateChange} />
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search appointments..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="flex gap-5 w-max mb-4">
              <TabsTrigger value="upcoming">Upcoming (3)</TabsTrigger>
              <TabsTrigger value="unconfirmed">Unconfirmed (1)</TabsTrigger>
              <TabsTrigger value="completed">Completed (12)</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled (0)</TabsTrigger>
              <TabsTrigger value="all">All Appointments</TabsTrigger>
            </TabsList>
            <section>
              <TabsContent value="upcoming" className="flex flex-col gap-3">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <AppointmentCell />
                  <AppointmentCell />
                  <AppointmentCell />
                </div>
              </TabsContent>
              <TabsContent value="unconfirmed" className="flex flex-col gap-3">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <AppointmentCell />
                </div>
              </TabsContent>
              <TabsContent value="completed" className="flex flex-col gap-3">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <AppointmentCell />
                </div>
              </TabsContent>
              <TabsContent value="cancelled" className="flex flex-col gap-3">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <AppointmentCell />
                </div>
              </TabsContent>
              <TabsContent value="all" className="flex flex-col gap-3">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <AppointmentCell />
                </div>
              </TabsContent>
            </section>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorAppointments;
