import { prisma } from "../config/prisma.js";

export const createWorkspace = async (userId: string, name: string, description?: string) => {
  return prisma.workspace.create({
    data: {
      name,
      description,

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

export const getUserWorkspaces = async (userId: string) => {
  return prisma.workspace.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },

    include: {
      _count: {
        select: {
          members: true,
          projects: true,
        },
      },
    },
  });
};

export const getWorkspaceById = async (workspaceId: string) => {
  return prisma.workspace.findUnique({
    where: {
      id: workspaceId,
    },
    include: {
      _count: {
        select: {
          members: true,
          projects: true,
        },
      },
    },
  });
};
