import * as React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import PatientNotes from "./note";
import PatientReports from "./reports";
import Biometrics from "./biometrics";
import Bio from "./bio";
import Appointments from "./appointments";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 p-3 gap-4">
      <div className="">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex pb-4">
            <BreadcrumbList className="text-lg">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/doctor/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/doctor/patientlist">Patients List</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Sainath Reddy</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="sm:flex gap-4">
          <section className="flex sm:w-[45%]">
            <Bio />
          </section>
          <section className="sm:w-[55%] p-3 border-2 ">
            <Appointments />
          </section>
        </div>
      </div>

      <main className="flex flex-col gap-3">
        <Biometrics />
        <section className="flex gap-3">
          <PatientReports />
          <PatientNotes />
        </section>
      </main>
    </div>
  );
}
