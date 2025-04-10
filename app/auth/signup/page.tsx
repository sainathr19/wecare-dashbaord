"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { ApiResponse } from "@/types/api";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  type: 'patient' | 'doctor';
}

interface SignUpResponse {
  message : string;
  requestId : string;
}
export default function SignUp() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const type = formData.get('type') as 'patient' | 'doctor';
    
    const contactData: ContactFormData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string,
      type
    };

    try {
      const { data: res } = await axiosInstance.post<ApiResponse<SignUpResponse>>('/auth/signup-request', contactData);
      console.log(res);
      if (res.error) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: `Request ID : ${res.data?.requestId}`,
        description: "We'll contact you soon to complete your registration. Thank you!",
      });
      (e.target as HTMLFormElement).reset();
    } catch (errorRes: any) {
      console.error("Failed to submit your request:", errorRes);
      const errorMessage = errorRes.error? errorRes.error : "Failed to submit your request. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const ContactForm = ({ type }: { type: 'patient' | 'doctor' }) => (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <input type="hidden" name="type" value={type} />
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-balance text-muted-foreground">
          {type === 'patient' 
            ? "Leave your details and we'll help you get started with your healthcare journey"
            : "Interested in joining our network? Let's discuss how we can work together"}
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First name</Label>
            <Input name="firstName" placeholder="John" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input name="lastName" placeholder="Doe" required />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input
            name="location"
            placeholder="City, State"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Submitting..." : `Submit`}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center p-4 min-h-screen col-span-1">
        <div className="mx-auto max-w-full">
          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="patient">Patient Inquiry</TabsTrigger>
              <TabsTrigger value="doctor">Doctor Inquiry</TabsTrigger>
            </TabsList>

            <TabsContent value="patient">
              <ContactForm type="patient" />
            </TabsContent>

            <TabsContent value="doctor">
              <ContactForm type="doctor" />
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm">
            Already registered?{" "}
            <Link href="/auth/signin" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-full h-screen overflow-hidden col-span-1">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/doctor.svg"
            alt="Image"
            className="w-full h-full object-cover object-center dark:brightness-[0.2] dark:grayscale scale-x-[-1]"
          />
        </div>
      </div>
    </div>
  );
}
