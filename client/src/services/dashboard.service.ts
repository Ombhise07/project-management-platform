import { api } from "@/lib/axios";

export const getDashboard = (workspaceId: string) => {
  return api.get("/dashboard", {
    params: {
      workspaceId,
    },
  });
};
