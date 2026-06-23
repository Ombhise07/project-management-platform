import { prisma } from "../config/prisma.js";

export const createTask = async (data: {
  title: string;
  description?: string;
  projectId: string;
  assigneeId?: string;
  dueDate?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
}) => {
  return prisma.task.create({
    data: {
      title: data.title,

      description: data.description,

      projectId: data.projectId,

      assigneeId: data.assigneeId,

      priority: data.priority,

      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    },

    include: {
      assignee: true,
    },
  });
};

export const getProjectTasks = async (projectId: string) => {
  return prisma.task.findMany({
    where: {
      projectId,
    },

    include: {
      assignee: true,
      subtasks: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateTask = async (
  taskId: string,
  data: {
    status?: string;
    priority?: string;
    assigneeId?: string | null;
  }
) => {
  return prisma.task.update({
    where: {
      id: taskId,
    },

    data,

    include: {
      assignee: true,
      subtasks: true,
    },
  });
};

export const deleteTask = async (taskId: string) => {
  return prisma.task.delete({
    where: {
      id: taskId,
    },
  });
};

export const createSubtask = async (taskId: string, title: string) => {
  return prisma.subtask.create({
    data: {
      taskId,
      title,
    },
  });
};

export const completeSubtask = async (subtaskId: string) => {
  return prisma.subtask.update({
    where: {
      id: subtaskId,
    },

    data: {
      completed: true,
    },
  });
};
