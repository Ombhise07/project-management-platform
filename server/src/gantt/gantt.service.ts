import { prisma } from "../config/prisma.js";

export const getProjectTimeline = async (projectId: string) => {
  const tasks = await prisma.task.findMany({
    where: {
      projectId,
    },

    include: {
      assignee: true,

      dependencies: {
        include: {
          dependsOn: true,
        },
      },
    },
  });

  return tasks;
};
