import type { Metadata } from "next";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { doctorNavigation } from "@/config/navigation";

export const metadata: Metadata = {
  title: "Doctor",
  description: "Remote Patient Monitoring System",
};

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout navigation={doctorNavigation}>{children}</DashboardLayout>;
}
