import { prisma } from "../config/prisma.js";
import { createActivity } from "../activity/activity.service.js";

export const createTimeLog = async (
  userId: string,
  taskId: string,
  minutes: number,
  description?: string
) => {
  const log = await prisma.timeLog.create({
    data: {
      userId,
      taskId,
      minutes,
      description,
    },
  });

  await createActivity(userId, taskId, "TASK_UPDATED", `${minutes} minutes logged`);

  return log;
};

export const getTaskTimeSummary = async (taskId: string) => {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },

    select: {
      title: true,
    },
  });

  const logs = await prisma.timeLog.findMany({
    where: {
      taskId,
    },
  });

  const totalMinutes = logs.reduce((acc, log) => acc + log.minutes, 0);

  return {
    task,
    totalMinutes,
    logs,
  };
};
