import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
export const metadata: Metadata = {
  title: "Doctor",
  description: "Remote Patient Monitoring System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TooltipProvider>
        <body className="">
          <main className="flex h-screen overflow-hidden w-full">
            <Sidebar />
            <div className="flex flex-col h-screen w-full">
              <Navbar />
              <ScrollArea className="pt-3">{children}</ScrollArea>
            </div>
          </main>
        </body>
      </TooltipProvider>
    </html>
  );
}
