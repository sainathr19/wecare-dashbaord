"use client";

import HeaderCards from "./header-cards";
import TodaySchedule from "./today-schedule";
import RecentAppointments from "./recent-appointments";
import AddAppointment from "./add-appointment";
import Insights from "./insights";
import TopReports from "./top-reports";
export default function DoctorDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 grid-cols-3">
          <section className="col-span-2 flex flex-col gap-3">
            <HeaderCards />
            <TopReports />
            <Insights />
          </section>
          <section className="col-span-1 flex flex-col gap-3">
            <AddAppointment />
            <TodaySchedule />
            <RecentAppointments />
          </section>
        </div>
      </main>
    </div>
  );
}
