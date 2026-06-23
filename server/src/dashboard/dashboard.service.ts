import { prisma } from "../config/prisma.js";

export const getDashboardData = async (userId: string) => {
  const now = new Date();

  const [
    totalProjects,
    totalTasks,
    completedTasks,
    overdueTasks,
    recentActivities,
    recentNotifications,
    taskStatusAnalytics,
    taskPriorityAnalytics,
  ] = await Promise.all([
    prisma.project.count(),

    prisma.task.count(),

    prisma.task.count({
      where: {
        status: "DONE",
      },
    }),

    prisma.task.count({
      where: {
        dueDate: {
          lt: now,
        },
        status: {
          not: "DONE",
        },
      },
    }),

    prisma.activityLog.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.notification.findMany({
      where: {
        userId,
      },

      take: 10,

      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.task.groupBy({
      by: ["status"],

      _count: true,
    }),

    prisma.task.groupBy({
      by: ["priority"],

      _count: true,
    }),
  ]);

  return {
    summary: {
      totalProjects,
      totalTasks,
      completedTasks,
      overdueTasks,
    },

    analytics: {
      taskStatusAnalytics,
      taskPriorityAnalytics,
    },

    recentActivities,

    recentNotifications,
  };
};
