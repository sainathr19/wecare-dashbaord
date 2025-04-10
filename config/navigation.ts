"use client";

import { LayoutDashboard, Users, Calendar, FileText, Settings, MessageSquare, ClipboardList } from "lucide-react";
import React from "react";

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType;
}

export const doctorNavigation: NavigationItem[] = [
  { title: "Dashboard", href: "/doctor/dashboard", icon: LayoutDashboard },
  // { title: "Appointments", href: "/doctor/appointments", icon: Calendar },
  { title: "Patients", href: "/doctor/patients", icon: Users },
  { title: "Reports", href: "/doctor/reports", icon: FileText }
];

export const patientNavigation: NavigationItem[] = [
  { title: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
  // { title: "Appointments", href: "/patient/appointments", icon: Calendar },
  { title: "Reports", href: "/patient/reports", icon: ClipboardList },
  { title: "Profile", href: "/patient/profile", icon: ClipboardList }
];

export const adminNavigation: NavigationItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Doctors", href: "/admin/doctors", icon: Users },
  { title: "Patients", href: "/admin/patients", icon: Users },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];