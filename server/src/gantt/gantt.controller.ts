import type { Request, Response } from "express";

import { getProjectTimeline } from "./gantt.service.js";

export const getTimeline = async (req: Request, res: Response) => {
  const timeline = await getProjectTimeline(req.params.projectId);

  res.status(200).json(timeline);
};
