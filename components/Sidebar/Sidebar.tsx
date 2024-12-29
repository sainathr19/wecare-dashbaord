import React from "react";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  PersonIcon,
  DashboardIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";

import { Card, CardTitle } from "../ui/card";
import Link from "next/link";
const Sidebar = () => {
  return (
    <div className="hidden sm:block min-w-[210px] shadow-xl px-3">
      <header>
        <Card className="p-4 py-4 shadow-none border-none">
          <CardTitle className="text-[2.5rem]">WeCare</CardTitle>
        </Card>
      </header>
      <Card className="border-none shadow-none font-normal text-muted-foreground">
        <section className="flex flex-col gap-2">
          <Link
            href="/doctor/dashboard"
            className="flex gap-1 items-center text-xl px-3  py-2 hover:bg-muted"
          >
            <DashboardIcon className="mr-2 h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/doctor/patientlist"
            className="flex gap-1 items-center text-xl px-3  py-2 hover:bg-muted"
          >
            <PersonIcon className="mr-2 h-5 w-5" />
            <span>Patient List</span>
          </Link>
          <Link
            href="/doctor/appointments"
            className="flex gap-1 items-center text-xl px-3  py-2 hover:bg-muted"
          >
            <CalendarIcon className="mr-2 h-5 w-5" />
            <span>Appointments</span>
          </Link>
          <Link
            href="/doctor/messages"
            className="flex gap-1 items-center text-xl px-3  py-2 hover:bg-muted"
          >
            <EnvelopeClosedIcon className="mr-2 h-5 w-5" />
            <span>Messages</span>
          </Link>
        </section>
      </Card>
    </div>
  );
};

export default Sidebar;
