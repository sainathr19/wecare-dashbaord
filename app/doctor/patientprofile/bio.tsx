import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge/Badge";
function Bio() {
  return (
    <Card className="flex flex-col sm:flex-row items-center justify-center h-full w-full">
      <div className="flex flex-col items-center justify-center p-3">
        <div>
          <img
            src="/Photo.jpg"
            className="h-[90px] w-[90px] rounded-[50%]"
            alt=""
          />
        </div>
        <CardContent className="text-center">
          <CardTitle className="text-[1.6rem] ">Sainath Reddy</CardTitle>
          <CardDescription>gsnr1925@gmail.com</CardDescription>
          <CardDescription>9490863408</CardDescription>
        </CardContent>
        <CardFooter>
          <Button variant="secondary">Set Appointment</Button>
        </CardFooter>
      </div>
      <div className="grid grid-cols-2 w-max justify-center items-center">
        <CardContent className="">
          <p className="text-muted-foreground text-base ">Gender</p>
          <div className="text-base font-semibold">Male</div>
        </CardContent>
        <CardContent className="">
          <p className="text-muted-foreground text-base">Birth Date</p>
          <div className="text-base font-semibold">19 Mar 2004</div>
        </CardContent>
        {/* <CardContent className="">
    <p className="text-muted-foreground text-base">Mobile</p>
    <div className="text-base font-semibold">9490863408</div>
    </CardContent> */}
        <CardContent className="">
          <p className="text-muted-foreground text-base">City</p>
          <div className="text-base font-semibold">Kurnool</div>
        </CardContent>
        {/* <CardContent className="">
    <p className="text-muted-foreground text-base">Address</p>
    <div className="text-base font-semibold">Plot no 631 </div>
  </CardContent> */}
        <CardContent className="">
          <p className="text-muted-foreground text-base">Zip code</p>
          <div className="text-base font-semibold">518002</div>
        </CardContent>
        <CardContent className="flex flex-col gap-1">
          <p className="text-muted-foreground text-base">Membership</p>
          <div className="text-base font-semibold">
            <Badge variant="success" className="">
              Active
            </Badge>
          </div>
        </CardContent>{" "}
        <CardContent className="">
          <p className="text-muted-foreground text-base">Join Date</p>
          <div className="text-base font-semibold">May 2023</div>
        </CardContent>
      </div>
    </Card>
  );
}

export default Bio;
