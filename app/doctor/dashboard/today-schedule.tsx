import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const TodaySchedule = () => {
  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle>Today's Schedule</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="flex items-center gap-4">
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              10:30am - 11:00am
            </p>
            <p className="text-sm text-muted-foreground">Genaral Checkup</p>
          </div>
          <div className="ml-auto font-medium">
            <Button variant="outline">View details</Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              11:00am - 11:30am
            </p>
            <p className="text-sm text-muted-foreground">Root cleaning</p>
          </div>
          <div className="ml-auto font-medium">
            <Button variant="outline">View Details</Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              12:00pm - 12:30pm
            </p>
            <p className="text-sm text-muted-foreground">Bleaching</p>
          </div>
          <div className="ml-auto font-medium">
            <Button variant="outline">View Details</Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">12:30pm - 1:00pm</p>
            <p className="text-sm text-muted-foreground">Genaral Checkup</p>
          </div>
          <div></div>
          <div className="ml-auto font-medium">
            <Button variant="outline">View Details</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaySchedule;
