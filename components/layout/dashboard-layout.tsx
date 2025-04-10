"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, LucideProps } from "lucide-react";
import React from "react";
import { Card, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useAuth } from "@/context/auth-context";

interface DashboardLayoutProps {
  children: React.ReactNode;
  navigation: {
    title: string;
    href: string;
    icon: React.ComponentType<LucideProps>;
  }[];
}

export default function DashboardLayout({
  children,
  navigation,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/signin');
  };

  return (
    <div className="flex h-screen">
      <div className="hidden sm:flex flex-col min-w-[240px] p-4 border-r gap-6">
        <header>
          <Link href="/">
            <Card className="p-4 py-4 shadow-none border-none">
              <CardTitle className="text-[2.5rem] bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
                WeCare
              </CardTitle>
            </Card>
          </Link>
        </header>
        <div className="flex flex-col justify-between h-full">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary hover:bg-primary/15"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {React.createElement(item.icon, { size: 16 })}
                {item.title}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-y-auto bg-muted/40 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
