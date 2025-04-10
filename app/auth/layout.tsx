import { Button } from "@/components/ui/button";
import { ChevronLeft, Home } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative">
      <div className="absolute top-4 left-4 flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <Home className="h-5 w-5" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href="javascript:history.back()">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
      </div>
      {children}
    </div>
  );
}