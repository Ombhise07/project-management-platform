import { prisma } from "../config/prisma.js";

export const addWorkspaceMember = async (
  workspaceId: string,
  email: string,
  role: "OWNER" | "ADMIN" | "MEMBER"
) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return prisma.workspaceMember.create({
    data: {
      workspaceId,
      userId: user.id,
      role,
    },

    include: {
      user: true,
    },
  });
};

export const getWorkspaceMembers = async (workspaceId: string) => {
  return prisma.workspaceMember.findMany({
    where: {
      workspaceId,
    },

    include: {
      user: true,
    },
  });
};

export const removeMember = async (memberId: string) => {
  return prisma.workspaceMember.delete({
    where: {
      id: memberId,
    },
  });
};

export const getUserWorkload = async (userId: string) => {
  return prisma.task.groupBy({
    by: ["status"],

    where: {
      assigneeId: userId,
    },

    _count: true,
  });
};
