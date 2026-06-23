import { prisma } from "../config/prisma";

export const createComment = async (userId: string, taskId: string, content: string) => {
  return prisma.comment.create({
    data: {
      content,
      taskId,
      authorId: userId,
    },

    include: {
      author: true,
    },
  });
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
