import type { Request, Response } from "express";
import { createCommentSchema } from "./comment.validation.js";

import { createComment, getTaskComments } from "./comment.service.js";

export const create = async (req: Request, res: Response) => {
  const data = createCommentSchema.parse(req.body);

  const comment = await createComment(req.user!.userId, data.taskId, data.content);

  res.status(201).json(comment);
};

export const getAll = async (req: Request, res: Response) => {
  const taskId = req.query.taskId as string;

  const comments = await getTaskComments(taskId);

  res.status(200).json(comments);
};
