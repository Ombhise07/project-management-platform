import { z } from "zod";

export const addMemberSchema = z.object({
  workspaceId: z.string(),
  email: z.email(),
  role: z.enum(["OWNER", "ADMIN", "MEMBER"]),
});
