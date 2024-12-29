import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cross1Icon } from "@radix-ui/react-icons";
import { ChevronDown } from "lucide-react";
import React from "react";

const AppointmentCell = () => {
  return (
    <Card className="p-5 grid grid-cols-3">
      <section className="flex flex-col gap-2 justify-between">
        <CardTitle className="">Wed, 12 Jun</CardTitle>
        <CardDescription className="tracking-wide">
          9:45am - 10:00am
        </CardDescription>
      </section>
      <section className="flex flex-col gap-2 justify-between">
        <CardTitle>Standard Checkup for Sainath Reddy</CardTitle>
        <CardDescription>No addional notes provided</CardDescription>
      </section>
      <section className="flex gap-4 justify-end">
        <Button variant="outline" className="flex items-center">
          <Cross1Icon className="mr-2 h-3 w-3" />
          Cancel
        </Button>
        <Button variant="outline" className="flex items-center">
          {" "}
          <ChevronDown className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </section>
    </Card>
  );
};

export default AppointmentCell;
