import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
const Navbar = () => {
  return (
    <div className="flex justify-center items-center shadow-md">
      <Command className="rounded-lg border shadow-md mx-9 h-max">
        <CommandInput placeholder="Search anything..." />
      </Command>
      <DropdownMenu>
        <DropdownMenuTrigger className="mx-3 mr-6 p-3">
          <Card className="text-left flex gap-3 items-center min-w-[12rem] shadow-none rounded-none border-none bg-inherit">
            <img src="/Photo.jpg" alt="" className="rounded-[50%] h-10 w-10" />
            <div>
              <CardTitle className="tracking-wide">Dr. Sainath</CardTitle>
              <CardDescription>Dentist</CardDescription>
            </div>
          </Card>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
