import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Phone, Mail, MapPin } from "lucide-react";
import React, { useState } from "react";

interface Appointment {
  time: string;
  endTime: string;
  type: string;
  patient: {
    name: string;
    age: number;
    gender: string;
    phone: string;
    email: string;
    address: string;
    avatar?: string;
  };
}

const TodaySchedule = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const appointments: Appointment[] = [
    {
      time: "10:30am",
      endTime: "11:00am",
      type: "General Checkup",
      patient: {
        name: "John Smith",
        age: 35,
        gender: "Male",
        phone: "+91 9876543210",
        email: "john.smith@example.com",
        address: "123 Main St, City",
      }
    },
    // Add more appointments...
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8">
          {appointments.map((appointment, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {appointment.time} - {appointment.endTime}
                </p>
                <p className="text-sm text-muted-foreground">{appointment.type}</p>
              </div>
              <div className="ml-auto font-medium">
                <Button 
                  variant="outline"
                  onClick={() => setSelectedAppointment(appointment)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedAppointment.patient.avatar} />
                  <AvatarFallback>
                    {selectedAppointment.patient.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedAppointment.patient.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedAppointment.patient.age} years • {selectedAppointment.patient.gender}
                  </p>
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Today</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedAppointment.time} - {selectedAppointment.endTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedAppointment.patient.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedAppointment.patient.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedAppointment.patient.address}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedAppointment(null)}>
                  Close
                </Button>
                <Button>
                  Start Consultation
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodaySchedule;
