import { api } from "@/lib/axios";

export const getWorkspaceProjects = async (workspaceId: string) => {
  return api.get("/projects", {
    params: {
      workspaceId,
    },
  });
};

export const createProject = async (data: {
  workspaceId: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}) => {
  return api.post("/projects", data);
};

export const getProjectById = async (projectId: string) => {
  return api.get(`/projects/${projectId}`);
};
