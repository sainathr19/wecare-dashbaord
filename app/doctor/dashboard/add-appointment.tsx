import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import React from "react";
const AddAppointment = () => {
  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle className="text-lg">
          Add an appointment to your schedule now
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Add Appointment</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add Appointment</AlertDialogTitle>
              <AlertDialogDescription>Coming Soon...</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={(): void => {
                  toast({
                    title: "Added Appointment : Root Clenaing",
                    description: "Friday, February 10, 2023 at 12:00 PM",
                  });
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default AddAppointment;
