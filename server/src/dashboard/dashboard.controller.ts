import type { Request, Response } from "express";

import { getDashboardData } from "./dashboard.service.js";

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const workspaceId = req.query.workspaceId as string;

    if (!workspaceId) {
      return res.status(400).json({
        message: "workspaceId is required",
      });
    }

    const data = await getDashboardData(req.user!.userId, workspaceId);

    res.status(200).json(data);
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to load dashboard",
    });
  }
};
