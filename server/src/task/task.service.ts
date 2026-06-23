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
