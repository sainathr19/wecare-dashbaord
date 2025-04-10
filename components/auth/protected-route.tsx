"use client";

import { useAuth } from "@/context/auth-context";
import { UserRole } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}) {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      router.push("/auth/signin");
    } else if (
      !auth.isLoading &&
      auth.user &&
      !allowedRoles.includes(auth.user.role)
    ) {
      // Redirect to appropriate dashboard based on role
      switch (auth.user.role) {
        case "DOCTOR":
          router.push("/doctor/dashboard");
          break;
        case "PATIENT":
          router.push("/patient/dashboard");
          break;
        case "ADMIN":
          router.push("/admin/dashboard");
          break;
      }
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.user, router, allowedRoles]);

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth.isAuthenticated) {
    return null;
  }

  if (auth.user && !allowedRoles.includes(auth.user.role)) {
    return null;
  }

  return <>{children}</>;
}