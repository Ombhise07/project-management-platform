import { prisma } from "../config/prisma.js";

export const createActivity = async (
  userId: string,
  taskId: string,
  type: any,
  message: string
) => {
  return prisma.activityLog.create({
    data: {
      userId,
      taskId,
      type,
      message,
    },
  });
};
