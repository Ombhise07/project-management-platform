import { prisma } from "../config/prisma.js";
import { createNotification } from "../notification/notification.service.js";

export const createComment = async (userId: string, taskId: string, content: string) => {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  const comment = await prisma.comment.create({
    data: {
      content,
      taskId,
      authorId: userId,
    },

    include: {
      author: true,
    },
  });

  if (task?.assigneeId && task.assigneeId !== userId) {
    await createNotification(
      task.assigneeId,
      "New Comment",
      "Someone commented on your task",
      "TASK_COMMENTED"
    );
  }

  return comment;
};

export const getTaskComments = async (taskId: string) => {
  return prisma.comment.findMany({
    where: {
      taskId,
    },

    include: {
      author: true,
    },

    orderBy: {
      createdAt: "asc",
    },
  });
};
