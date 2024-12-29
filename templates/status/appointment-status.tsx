import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock4, MapPin, Stethoscope } from "lucide-react";
export default function AppointmentStatus() {
  return (
    <div className="h-screen flex justify-center items-center bg-muted">
      <Card className="w-1/3 py-16 p-5">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-check h-5 w-5 bg-green-600 dark:text-green-400"
            >
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </div>
          <CardTitle className="text-2xl">
            Your appointment is scheduled
          </CardTitle>
          <CardDescription className="text-lg">
            We sent an email with a calendar invitation with the details to
            doctor.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className="flex flex-col gap-3 justify-center items-center mt-5">
            <p className="text-gray-12 font-semibold text-2xl">
              Standard Checkup
            </p>
            <div className="flex items-center text-gray-12">
              <Clock4 className="size-4 mr-2" />
              <p className="text-sm font-semibold">30 mins</p>
            </div>
            <div className="flex items-center text-gray-12">
              <Stethoscope className="size-4 mr-2" />
              <p className="text-sm font-semibold">Dr. Sainath Reddy</p>
            </div>
            <div className="flex items-center text-gray-12">
              <MapPin className="size-4 mr-2" />
              <p className="text-sm font-semibold">WeCare Hospitals</p>
            </div>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="flex flex-col items-center justify-center gap-5">
          <p className="mt-5">
            Need to make a change? &nbsp;{" "}
            <Link href="/appointment/reschedule" className="font-semibold">
              Reschedule
            </Link>
            &nbsp; or &nbsp;
            <Link href="appointent/cancel" className="font-semibold">
              Cancel
            </Link>
          </p>
          <Button variant="outline">Back to appoitments</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
