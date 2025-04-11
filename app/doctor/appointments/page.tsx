"use client";
import { Suspense } from "react";

export default function AppointmentsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Your existing appointments page content */}
    </Suspense>
  );
}
