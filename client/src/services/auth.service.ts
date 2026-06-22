import { api } from "@/lib/axios";

export const register = async (data: { name: string; email: string; password: string }) => {
  return api.post("/auth/register", data);
};

export const login = async (data: { email: string; password: string }) => {
  return api.post("/auth/login", data);
};

export const refresh = async () => {
  return api.post("/auth/refresh");
};

export const logout = async () => {
  return api.post("/auth/logout");
};

export const getCurrentUser = async () => {
  return api.get("/auth/me");
};
