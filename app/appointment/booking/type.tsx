"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TimerIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const SelectAppointmentType = () => {
  type AppointmentTypes = "Quick" | "Standard" | "Comprehensive";
  const [Type, setType] = useState("Quick");
  const TypeList = [
    {
      name: "Quick Checkup",
      tag: "Quick",
      time: 15,
    },
    {
      name: "Standard Checkup",
      tag: "Standard",
      time: 30,
    },
    {
      name: "Comprehensive Checkup",
      tag: "Comprehensive",
      time: 45,
    },
  ];
  return (
    <Card className="p-5 w-[600px] h-max">
      <CardHeader className="flex flex-col items-center">
        <img
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          className="rounded-[50%] h-[100px]"
        />
        <CardTitle className="text-[2.5rem]">Dr. Sainath Reddy</CardTitle>
        <CardDescription>WeCare Hospitals</CardDescription>
      </CardHeader>
      <CardContent className="p-0 w-full grid grid-rows-3 gap-4">
        {TypeList.map((type) => {
          return (
            <Button
              variant={type.tag === Type ? "secondary" : "outline"}
              className="h-[10vh] flex flex-col gap-2"
              onClick={() => setType(type.tag)}
            >
              <CardTitle className="text-xl">{type.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <TimerIcon />
                {type.time}mins
              </CardDescription>
            </Button>
          );
        })}
        <section className="flex justify-center gap-5 mt-2">
          <Button variant="default">Back</Button>
          <Link href="/appointment/booking/Ex5Gv8">
            <Button variant="default">Continue</Button>
          </Link>
        </section>
      </CardContent>
    </Card>
  );
};

export default SelectAppointmentType;
