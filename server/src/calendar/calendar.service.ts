import { prisma } from "../config/prisma.js";

export const getCalendarEvents = async (userId: string) => {
  const tasks = await prisma.task.findMany({
    where: {
      assigneeId: userId,
    },

    include: {
      project: true,
    },
  });

  const events = tasks
    .filter((task) => task.dueDate)
    .map((task) => ({
      id: task.id,

      title: task.title,

      date: task.dueDate,

      type: "TASK",

      project: task.project.name,

      priority: task.priority,
    }));

  const projects = await prisma.project.findMany();

  const milestoneEvents = projects.flatMap((project) => {
    const milestones = [];

    if (project.startDate) {
      milestones.push({
        id: `${project.id}-start`,
        title: `${project.name} Started`,
        date: project.startDate,
        type: "PROJECT_START",
      });
    }

    if (project.endDate) {
      milestones.push({
        id: `${project.id}-end`,
        title: `${project.name} Deadline`,
        date: project.endDate,
        type: "PROJECT_END",
      });
    }

    return milestones;
  });

  return [...events, ...milestoneEvents];
};
