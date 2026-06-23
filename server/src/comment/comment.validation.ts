import { z } from "zod";

export const createCommentSchema = z.object({
  taskId: z.string(),

  content: z.string().min(1),
});
