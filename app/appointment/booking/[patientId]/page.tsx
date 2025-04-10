"use client";

import { Appointment } from "@/components/appointment";
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axiosInstance from '@/lib/axios';
import { ApiResponse } from '@/types/api';
import { Appointment as AppointmentType } from '@/types/appointment';

interface Props {
  params: {
    patientId: string;
  }
}

export default function BookingPage({ params }: Props) {
  const { scheduleAppointment, isLoading } = useGoogleCalendar();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAppointmentSubmit = async (appointmentData: AppointmentType) => {
    try {
      setIsSubmitting(true);
      
      // Only create meet details if it's a remote appointment
      const meetDetails = appointmentData.mode === 'REMOTE' 
        ? await scheduleAppointment(appointmentData)
        : undefined;

      const updatedAppointment = {
        ...appointmentData,
        patientId: params.patientId,
        meetDetails,
      };

      const { data: response } = await axiosInstance.post<ApiResponse<AppointmentType>>(
        '/appointments/create',
        updatedAppointment
      );

      if (response.error) {
        throw new Error(response.error);
      }

      toast({
        title: "Success",
        description: appointmentData.mode === 'REMOTE'
          ? "Appointment scheduled. Calendar invite has been sent."
          : "In-person appointment has been scheduled.",
      });

      router.push('/appointment/status');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to schedule",
        description: error.message || "Could not schedule appointment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Appointment 
        // onSubmit={handleAppointmentSubmit} 
        // isLoading={isLoading || isSubmitting} 
        // patientId={params.patientId}
      />
    </div>
  );
}
