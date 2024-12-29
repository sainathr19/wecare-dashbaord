import AppointmentStatusEmail from "@/templates/emails/appointment-scheduled";
import AppointmentStatus from "@/templates/status/appointment-status";
import React from "react";
const page = () => {
  return (
    <div>
      <AppointmentStatus />
      {/* <AppointmentStatusEmail /> */}
    </div>
  );
};

export default page;
