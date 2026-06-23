import { prisma } from "../config/prisma.js";

export const createProject = async (
  userId: string,
  data: {
    workspaceId: string;
    name: string;
    description?: string;
    startDate?: string;
    endDate?: string;
  }
) => {
  const membership = await prisma.workspaceMember.findFirst({
    where: {
      userId,
      workspaceId: data.workspaceId,
    },
  });

  if (!membership) {
    throw new Error("You are not a member of this workspace");
  }

  return prisma.project.create({
    data: {
      name: data.name,
      description: data.description,

      startDate: data.startDate ? new Date(data.startDate) : undefined,

      endDate: data.endDate ? new Date(data.endDate) : undefined,

      workspaceId: data.workspaceId,

      members: {
        create: {
          userId,
          role: "OWNER",
        },
      },
    },

    include: {
      members: true,
    },
  });
};

export const getWorkspaceProjects = async (workspaceId: string) => {
  return prisma.project.findMany({
    where: {
      workspaceId,
    },

    include: {
      members: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};
