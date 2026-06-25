import { prisma } from "../config/prisma.js";

export const getProjectReport = async (projectId: string) => {
  const totalTasks = await prisma.task.count({
    where: { projectId },
  });

  const completedTasks = await prisma.task.count({
    where: {
      projectId,
      status: "DONE",
    },
  });

  const overdueTasks = await prisma.task.count({
    where: {
      projectId,
      status: {
        not: "DONE",
      },
      dueDate: {
        lt: new Date(),
      },
    },
  });

  return {
    totalTasks,
    completedTasks,
    overdueTasks,
    completionRate: totalTasks === 0 ? 0 : Number(((completedTasks / totalTasks) * 100).toFixed(2)),
  };
};

export const getTeamProductivity = async (workspaceId: string) => {
  return prisma.user.findMany({
    where: {
      workspaces: {
        some: {
          workspaceId,
        },
      },
    },

    select: {
      id: true,
      name: true,
      email: true,

      assignedTasks: {
        select: {
          id: true,
          status: true,
        },
      },

      timeLogs: {
        select: {
          minutes: true,
        },
      },
    },
  });
};

export const getTimeTrackingReport = async (userId: string) => {
  const logs = await prisma.timeLog.findMany({
    where: {
      userId,
    },

    include: {
      task: {
        select: {
          id: true,
          projectId: true,
        },
      },
    },
  });

  const totalMinutes = logs.reduce((sum, log) => sum + log.minutes, 0);

  const totalHours = Number((totalMinutes / 60).toFixed(2));

  const uniqueProjects = new Set(logs.map((log) => log.task.projectId));

  const uniqueTasks = new Set(logs.map((log) => log.task.id));

  return {
    totalHours,
    totalMinutes,
    projects: uniqueProjects.size,
    tasks: uniqueTasks.size,
    logs,
  };
};

export const getOverdueTasks = async () => {
  return prisma.task.findMany({
    where: {
      dueDate: {
        lt: new Date(),
      },

      status: {
        not: "DONE",
      },
    },

    include: {
      assignee: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      project: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    orderBy: {
      dueDate: "asc",
    },
  });
};
