import type { Request, Response } from "express";

import { getDashboardData } from "./dashboard.service.js";

export const getDashboard = async (req: Request, res: Response) => {
  const data = await getDashboardData(req.user!.userId);

  res.status(200).json(data);
};
