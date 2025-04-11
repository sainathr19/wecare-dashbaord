"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import HeaderCards from "./stats";
import TodaySchedule from "./today-schedule";
import RecentAppointments from "./recent-appointments";
import AddAppointment from "./add-appointment";
import Insights from "./insights";
import TopReports from "./top-reports";
import { NotificationBanner } from "@/components/ui/notification-banner";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import { useUserId } from "@/hooks/useUserId";
export default function DoctorDashboard() {
  const router = useRouter();
  const [unviewedReports, setUnviewedReports] = useState(0);
  const { userId, loading ,LoadingComponent} = useUserId();
  useEffect(() => {
    const fetchUnviewedReports = async () => {
      if (!userId) return;
      try {
        const { data : res} = await axiosInstance.get(`/doctor/reports?doctorId=${userId}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        if (res.error) {
          throw new Error(res.error);
        }
        const unviewed = res.data!.reports.filter((report : any ) => !report.isViewed);
        console.log("Unviwede : ",unviewed.length);
        setUnviewedReports(unviewed.length);
      } catch (error) {
        console.error("Failed to fetch unviewed reports:", error);
      }
    };

    fetchUnviewedReports();
  }, [userId,loading]);

  if (loading && LoadingComponent) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {unviewedReports > 0 && (
          <NotificationBanner
            title="Pending Reports"
            description={`You have ${unviewedReports} unviewed patient report${unviewedReports > 1 ? 's' : ''} that need your attention`}
            buttonText="View Reports"
            onButtonClick={() => router.push("/doctor/reports")}
            icon={<FileText className="h-4 w-4 text-primary" />}
          />
        )}
        <div className="grid gap-4 grid-cols-3">
          <section className="col-span-2 flex flex-col gap-3">
            <HeaderCards />
            <TopReports />
            <Insights />
          </section>
          <section className="col-span-1 flex flex-col gap-3">
            <TodaySchedule />
            <RecentAppointments />
            <AddAppointment />
          </section>
        </div>
      </main>
    </div>
  );
}
