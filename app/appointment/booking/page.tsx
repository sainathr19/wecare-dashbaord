import { Appointment } from "@/components/appointment";
import React from "react";
import SelectAppointmentType from "./type";

const BookAppointment = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      {/* <Appointment /> */}
      <SelectAppointmentType />
    </div>
  );
};

export default BookAppointment;
