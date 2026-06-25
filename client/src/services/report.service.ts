import { api } from "@/lib/axios";

export const getProjectReport = async (projectId: string) => {
  return api.get(`/reports/project/${projectId}`);
};

export const getTeamProductivity = async (workspaceId: string) => {
  return api.get(`/reports/team/${workspaceId}`);
};

export const getOverdueTasks = async () => {
  return api.get("/reports/overdue");
};

export const getTimeTrackingReport = async () => {
  return api.get("/reports/time");
};
