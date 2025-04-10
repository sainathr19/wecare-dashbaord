"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Command, CommandInput } from "@/components/ui/command";
import { PersonIcon, GearIcon } from "@radix-ui/react-icons";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import React from "react";
import { Card, CardDescription, CardTitle } from "../ui/card";

const Navbar = () => {
  const { auth, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/signin');
  };

  const getProfileLink = () => {
    return auth?.user?.role === 'DOCTOR' ? '/doctor/profile' : '/patient/profile';
  };

  const getSettingsLink = () => {
    return auth?.user?.role === 'DOCTOR' ? '/doctor/settings' : '/patient/settings';
  };

  return (
    <div className="flex justify-between items-center shadow-sm border-b px-6 py-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Command className="rounded-lg border shadow-sm w-[400px]">
        <CommandInput 
          placeholder={auth?.user?.role === 'DOCTOR' ? "Search patients..." : "Search doctors..."} 
          className="h-9" 
        />
      </Command>
      
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-accent rounded-lg transition-colors">
          <Card className="flex gap-3 items-center px-3 py-2 shadow-none border-none bg-transparent">
            <img 
              src={"/Photo.jpg"} 
              alt="Profile" 
              className="rounded-full h-8 w-8 object-cover" 
            />
            <div>
              <CardTitle className="text-sm">
                {auth?.user?.role === 'DOCTOR' ? `Dr. ${auth?.user?.name}` : auth?.user?.name}
              </CardTitle>
              <CardDescription className="text-xs">
                {auth?.user?.role === 'DOCTOR' ? auth?.user?.role || 'Doctor' : 'Patient'}
              </CardDescription>
            </div>
          </Card>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => router.push(getProfileLink())}>
            <PersonIcon className="h-4 w-4" />Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => router.push(getSettingsLink())}>
            <GearIcon className="h-4 w-4" />Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2 cursor-pointer text-red-600" onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
