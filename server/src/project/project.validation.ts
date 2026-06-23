import { z } from "zod";

export const createProjectSchema = z.object({
  workspaceId: z.string(),

  name: z.string().min(3),

  description: z.string().optional(),

  startDate: z.string().optional(),

  endDate: z.string().optional(),
});
