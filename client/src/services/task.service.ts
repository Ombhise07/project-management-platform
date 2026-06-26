import { api } from "@/lib/axios";

import { Task } from "@/types/task";

export const getBoardData = async (projectId: string) => {
  return api.get(`/tasks/board/${projectId}`);
};

export const getProjectTasks = async (projectId: string) => {
  return api.get<Task[]>("/tasks", {
    params: {
      projectId,
    },
  });
};

export const createTask = async (data: {
  title: string;
  description?: string;
  projectId: string;
  assigneeId?: string;
  status?: string;
  priority?: string;
  startDate?: string;
  dueDate?: string;
  progress?: number;
}) => {
  return api.post("/tasks", data);
};

export const updateTask = async (
  taskId: string,
  data: {
    status?: string;
    priority?: string;
    assigneeId?: string | null;
  }
) => {
  return api.patch(`/tasks/${taskId}`, data);
};

export const deleteTask = async (taskId: string) => {
  return api.delete(`/tasks/${taskId}`);
};
