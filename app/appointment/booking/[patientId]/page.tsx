"use client";

import { Appointment } from "@/components/appointment";

interface Props {
  params: {
    patientId: string;
  }
}

export default function BookingPage({ params }: Props) {
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
