export interface ApiResponse<T> {
  status: "Ok" | "Error";
  data?: T;
  error?: string;
}