import { prisma } from "../config/prisma.js";
import { createNotification } from "../notification/notification.service.js";

export const createTask = async (data: {
  title: string;
  description?: string;
  projectId: string;
  assigneeId?: string;
  dueDate?: string;
  priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
}) => {
  const task = await prisma.task.create({
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

  if (data.assigneeId) {
    await createNotification(
      data.assigneeId,
      "New Task Assigned",
      `You have been assigned task ${task.title}`,
      "TASK_ASSIGNED"
    );
  }

  return task;
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
  const task = await prisma.task.update({
    where: {
      id: taskId,
    },

    data,

    include: {
      assignee: true,
      subtasks: true,
    },
  });

  if (data.status && task.assigneeId) {
    await createNotification(
      task.assigneeId,
      "Task Updated",
      `Task status changed to ${data.status}`,
      "TASK_UPDATED"
    );
  }

  return task;
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
