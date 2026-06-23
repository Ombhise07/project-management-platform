import { api } from "@/lib/axios";

export const getDashboard = async () => {
  return api.get("/dashboard");
};
