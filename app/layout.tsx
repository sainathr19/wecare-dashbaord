import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });
import { AuthProvider } from "@/context/auth-context";

export const metadata: Metadata = {
  title: "WeCare",
  description: "Remote Patient Monitoring System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Toaster />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
