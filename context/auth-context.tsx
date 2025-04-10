"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthState, User } from "@/types/auth";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const AuthContext = createContext<{
  auth: AuthState;
  login: (user: User, token: string) => void;
  logout: () => Promise<void>;
}>({
  auth: {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    token: null 
  },
  login: () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    token: null
  });

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("token");
        console.log('Token:', token);
        if (!token) {
          setAuth({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            token: null
          });
          return;
        }

        const decoded = jwtDecode<{
          userId: string;
          email: string;
          name: string;
          role: 'DOCTOR' | 'PATIENT' | 'ADMIN';
          exp: number;
        }>(token);

        console.log('Decoded:', decoded);
        // Check token expiration
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          throw new Error("Token expired");
        }

        console.log("Setting : ",{
          user: {
            id: decoded.userId,
            email: decoded.email,
            name: decoded.name,
            role: decoded.role,
          },
          isAuthenticated: true,
          isLoading: false
        })

        setAuth({
          user: {
            userId: decoded.userId,
            email: decoded.email,
            name: decoded.name,
            role: decoded.role,
          },
          isAuthenticated: true,
          isLoading: false,
          token
        });
      } catch (error) {
        console.error('Auth error:', error);
        localStorage.removeItem("token");
        setAuth({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          token: null
        });
      }
    };

    checkAuth();
  }, []); // Remove router dependency

  const login = (user: User, token: string) => {
    localStorage.setItem("token", token);
    console.log("Login settings ; ",{
      user,
      isAuthenticated: true,
      isLoading: false,
    })
    setAuth({
      user,
      isAuthenticated: true,
      isLoading: false,
      token
    });
  };

  const logout = async () => {
    setAuth({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null
    });
    localStorage.removeItem("token");
    await router.push('/auth/signin');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);