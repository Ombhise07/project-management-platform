import { api } from "@/lib/axios";

export const getMyWorkspaces = async () => {
  return api.get("/workspaces");
};

export const getWorkspaceById = async (workspaceId: string) => {
  return api.get(`/workspaces/${workspaceId}`);
};

export const createWorkspace = async (data: { name: string; description?: string }) => {
  return api.post("/workspaces", data);
};
