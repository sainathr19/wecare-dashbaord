"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import axiosInstance from '@/lib/axios';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { User } from "@/types/auth";

interface LoginResponse {
  token: string,
  message : string,
  user : User
}

export default function SignIn() {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "PATIENT"
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleFromUrl = params.get('role')?.toUpperCase() || 'PATIENT';
    setFormData(prev => ({
      ...prev,
      role: roleFromUrl
    }));
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const validateForm = () => {
    if (!formData.email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Email is required",
      });
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address",
      });
      return false;
    }

    if (!formData.password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password is required",
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password must be at least 6 characters",
      });
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTabChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      role: value.toUpperCase()
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!validateForm()) return;
  
      try {
        setIsLoading(true);
        const response = await axiosInstance.post('/auth/signin', formData);
        
        if (response.data.status === "Error") {
          throw response.data;
        }
  
        const { token, user } = response.data.data;
        console.log(user);
        console.log(token);
        login(user, token);
        
        toast({
          title: "Success",
          description: response.data.data.message || `Logged in successfully as ${user.role.toLowerCase()}`,
        });
  
        switch (user.role) {
          case "DOCTOR":
            router.push("/doctor/dashboard");
            break;
          case "PATIENT":
            router.push("/patient/dashboard");
            break;
          case "ADMIN":
            router.push("/admin/dashboard");
            break;
          default:
            throw new Error("Invalid user role");
        }
      } catch (error: any) {
        console.error('Login error:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.error || "An unexpected error occurred",
        });
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center p-4 min-h-screen col-span-1">
        <div className="mx-auto max-w-full">
          <div className="grid gap-2 text-center mb-6">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          
          <Tabs defaultValue={formData.role.toLowerCase()} className="w-full" onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="patient">Patient</TabsTrigger>
              <TabsTrigger value="doctor">Doctor</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleLogin} className="grid gap-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="m@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="#" className="underline">
                  Contact Us
                </Link>
              </div>
            </form>
          </Tabs>
        </div>
      </div>
      <div className="hidden lg:block relative w-full h-screen overflow-hidden">
        <img
          src="/image.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover object-center dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      </div>
  );
}
