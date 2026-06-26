import { prisma } from "../config/prisma.js";

export const getDashboardData = async (userId: string, workspaceId: string) => {
  const now = new Date();

  const [
    totalProjects,
    totalTasks,
    completedTasks,
    overdueTasks,
    recentProjects,
    recentActivities,
    recentNotifications,
    taskStatusAnalytics,
    taskPriorityAnalytics,
  ] = await Promise.all([
    prisma.project.count({
      where: {
        workspaceId,
      },
    }),

    prisma.task.count({
      where: {
        project: {
          workspaceId,
        },
      },
    }),

    prisma.task.count({
      where: {
        status: "DONE",

        project: {
          workspaceId,
        },
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

        project: {
          workspaceId,
        },
      },
    }),

    prisma.project.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        members: {
          where: { role: "OWNER" },
          select: {
            user: {
              select: { id: true, name: true },
            },
          },
          take: 1,
        },
        _count: { select: { tasks: true } },
      },
    }),

    prisma.activityLog.findMany({
      where: {
        task: {
          project: {
            workspaceId,
          },
        },
      },

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

      where: {
        project: {
          workspaceId,
        },
      },

      _count: true,
    }),

    prisma.task.groupBy({
      by: ["priority"],

      where: {
        project: {
          workspaceId,
        },
      },

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

    recentProjects,

    recentActivities,

    recentNotifications,
  };
};
