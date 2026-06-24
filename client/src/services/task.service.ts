import { api } from "@/lib/axios";

export const getBoardData = async (projectId: string) => {
  return api.get(`/tasks/board/${projectId}`);
};

export const updateTask = async (
  taskId: string,
  data: {
    status?: string;
  }
) => {
  return api.patch(`/tasks/${taskId}`, data);
};
