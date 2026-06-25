import { api } from "@/lib/axios";

export const getProjectTimeline = async (projectId: string) => {
  return api.get(`/gantt/${projectId}`);
};
