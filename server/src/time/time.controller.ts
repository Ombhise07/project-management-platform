import type { Request, Response } from "express";

import { createTimeLogSchema } from "./time.validation.js";

import { createTimeLog, getTaskTimeSummary } from "./time.service.js";

export const create = async (req: Request, res: Response) => {
  const data = createTimeLogSchema.parse(req.body);

  const log = await createTimeLog(req.user!.userId, data.taskId, data.minutes, data.description);

  res.status(201).json(log);
};

export const getSummary = async (req: Request, res: Response) => {
  const summary = await getTaskTimeSummary(req.params.taskId);

  res.status(200).json(summary);
};
