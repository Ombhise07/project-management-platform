import { z } from "zod";

export const createTimeLogSchema = z.object({
  taskId: z.string(),

  minutes: z.number().min(1),

  description: z.string().optional(),
});
