import { prisma } from "../config/prisma.js";

export const createNotification = async (
  userId: string,
  title: string,
  message: string,
  type: "TASK_ASSIGNED" | "TASK_UPDATED" | "TASK_COMMENTED" | "PROJECT_INVITE" | "WORKSPACE_INVITE"
) => {
  return prisma.notification.create({
    data: {
      userId,
      title,
      message,
      type,
    },
  });
};

export const getUserNotifications = async (userId: string) => {
  return prisma.notification.findMany({
    where: {
      userId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const markAsRead = async (notificationId: string) => {
  return prisma.notification.update({
    where: {
      id: notificationId,
    },

    data: {
      isRead: true,
    },
  });
};
