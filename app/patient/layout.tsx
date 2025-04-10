import DashboardLayout from "@/components/layout/dashboard-layout";
import { patientNavigation } from "@/config/navigation";

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout navigation={patientNavigation}>{children}</DashboardLayout>;
}