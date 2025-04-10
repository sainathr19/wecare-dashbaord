export type UserRole = "DOCTOR" | "PATIENT" | "ADMIN";

export interface User {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}