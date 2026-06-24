import { api } from "@/lib/axios";

export const getTaskTimeSummary = async (taskId: string) => {
  return api.get(`/time/task/${taskId}`);
};
