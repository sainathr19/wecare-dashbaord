import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  const { auth, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/signin');
  };

  return (
    <div className="hidden sm:flex min-w-[210px] shadow-xl px-3 flex-col h-screen">
      <header>
        <Link href="/">
          <Card className="p-4 py-4 shadow-none border-none">
            <CardTitle className="text-[2.5rem] bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
              WeCare
            </CardTitle>
          </Card>
        </Link>
      </header>

      {/* Navigation items will go here */}
      <div className="flex-1">
        {/* Existing navigation content */}
      </div>

      {/* Logout section at bottom */}
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
  );
};

export default Sidebar;