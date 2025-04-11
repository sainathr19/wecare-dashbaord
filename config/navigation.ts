"use client";

import { LayoutDashboard, Users, FileText, ClipboardList, Activity, UserCircle } from "lucide-react";
import React from "react";

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType;
}

export const doctorNavigation: NavigationItem[] = [
  { title: "Dashboard", href: "/doctor/dashboard", icon: LayoutDashboard },
  { title: "Patients", href: "/doctor/patients", icon: Users },
  { title: "Reports", href: "/doctor/reports", icon: ClipboardList }
];

export const patientNavigation: NavigationItem[] = [
  { title: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
  { title: "Reports", href: "/patient/reports", icon: FileText },
  { title: "ECG", href: "/patient/ecg", icon: Activity },
  { title: "Profile", href: "/patient/profile", icon: UserCircle }
];