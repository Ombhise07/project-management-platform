import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3),

  description: z.string().optional(),

  projectId: z.string(),

  assigneeId: z.string().optional(),

  status: z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"]).optional(),

  startDate: z.string().optional(),

  dueDate: z.string().optional(),

  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),

  progress: z.number().min(0).max(100).optional(),
});

export const updateTaskSchema = z.object({
  status: z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"]).optional(),

  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),

  assigneeId: z.string().nullable().optional(),
});

export const createSubtaskSchema = z.object({
  taskId: z.string(),

  title: z.string().min(3),
});
