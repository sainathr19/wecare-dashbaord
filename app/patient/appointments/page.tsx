"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DateSelector from "@/components/dashboard/DateSelector";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import PatientAppointmentCell from "./PatientAppointmentCell";

const PatientAppointments = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

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
            <CardTitle className="text-2xl">My Appointments</CardTitle>
            <Button 
              className="gap-2" 
              onClick={() => router.push('/patient/book-appointment')}
            >
              <Plus className="h-4 w-4" />
              Book Appointment
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <DateSelector onDateChange={handleDateChange} />
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search doctors or specializations..." 
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
              <TabsTrigger value="upcoming">Upcoming (2)</TabsTrigger>
              <TabsTrigger value="pending">Pending (1)</TabsTrigger>
              <TabsTrigger value="past">Past Visits (8)</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled (0)</TabsTrigger>
            </TabsList>
            <section>
              <TabsContent value="upcoming" className="flex flex-col gap-3">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <PatientAppointmentCell />
                  <PatientAppointmentCell />
                </div>
              </TabsContent>
              <TabsContent value="pending" className="flex flex-col gap-3">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <PatientAppointmentCell />
                </div>
              </TabsContent>
              <TabsContent value="past" className="flex flex-col gap-3">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <PatientAppointmentCell />
                </div>
              </TabsContent>
              <TabsContent value="cancelled" className="flex flex-col gap-3">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <PatientAppointmentCell />
                </div>
              </TabsContent>
            </section>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientAppointments;