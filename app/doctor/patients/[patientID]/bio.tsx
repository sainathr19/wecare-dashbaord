"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/Badge/Badge";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { ApiResponse } from "@/types/api";

type EmergencyContact = {
  name: string;
  relation: string;
  phone: string;
}

type PatientProfile = {
  patientId: string;
  doctorId: string;
  name: string;
  email: string;
  phone: string;
  bloodGroup: string;
  gender: string;
  birthDate: string;
  age: number;
  address: {
    city: string;
    zipCode: string;
  };
  membership: string;
  joinDate: string;
  emergencyContacts: EmergencyContact[];
}

function Bio() {
  const params = useParams();
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {data : res} = await axiosInstance.get<ApiResponse<PatientProfile>>(
          `/patient/profile?patientId=${params.patientID}`,{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        if (res.error) {
          throw new Error(res.error);
        }
        
        setProfile(res.data!);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [params.patientID]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-48">Loading...</div>;
  }

  if (!profile) {
    return <div className="text-center text-muted-foreground">Profile not found</div>;
  }

  return (
    <Card className="flex flex-col sm:flex-row items-center justify-around h-full w-full p-4">
      <div className="flex flex-col items-center justify-center mb-4 sm:mb-0">
        <div>
          <img
            src="/dp.png"
            className="h-[80px] w-[80px] rounded-[50%]"
            alt={profile?.name}
          />
        </div>
        <CardContent className="text-center p-2">
          <CardTitle className="text-lg sm:text-xl">{profile?.name}</CardTitle>
          <CardDescription className="text-sm">{profile?.email}</CardDescription>
          <CardDescription className="text-sm">{profile?.phone}</CardDescription>
        </CardContent>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 justify-center items-center gap-2 w-full sm:w-auto">
        <CardContent className="p-2">
          <p className="text-muted-foreground text-sm">Gender</p>
          <div className="text-sm font-semibold">{profile?.gender}</div>
        </CardContent>
        <CardContent className="p-2">
          <p className="text-muted-foreground text-sm">Birth Date</p>
          <div className="text-sm font-semibold">{profile?.birthDate}</div>
        </CardContent>
        <CardContent className="p-2">
          <p className="text-muted-foreground text-sm">Blood Group</p>
          <div className="text-sm font-semibold">{profile?.bloodGroup}</div>
        </CardContent>
        <CardContent className="p-2">
          <p className="text-muted-foreground text-sm">Age</p>
          <div className="text-sm font-semibold">{profile?.age} years</div>
        </CardContent>
        <CardContent className="p-2">
          <p className="text-muted-foreground text-sm">City</p>
          <div className="text-sm font-semibold">{profile?.address.city}</div>
        </CardContent>
        <CardContent className="p-2">
          <p className="text-muted-foreground text-sm">Zip code</p>
          <div className="text-sm font-semibold">{profile?.address.zipCode}</div>
        </CardContent>
        <CardContent className="p-2">
          <p className="text-muted-foreground text-sm">Join Date</p>
          <div className="text-sm font-semibold">{profile?.joinDate}</div>
        </CardContent>
        <CardContent className="flex flex-col gap-1 p-2">
          <p className="text-muted-foreground text-sm">Membership</p>
          <div className="text-sm font-semibold">
            <Badge 
              variant={profile?.membership.toLowerCase() === "active" ? "success" : "error"}
            >
              {profile?.membership}
            </Badge>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default Bio;
