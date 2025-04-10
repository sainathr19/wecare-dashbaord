import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PageLoading } from "@/components/ui/page-loading";

export const useUserId = () => {
  const { auth } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!auth.isLoading) {
      if (!auth.isAuthenticated || !auth.user?.userId) {
        router.push('/auth/signin');
      } else {
        setIsReady(true);
      }
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.user?.userId, router]);

  return {
    userId: auth.user?.userId || null,
    loading: auth.isLoading || !isReady,
    LoadingComponent: PageLoading
  };
};