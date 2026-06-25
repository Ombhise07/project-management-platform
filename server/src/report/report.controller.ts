import type { Request, Response } from "express";

import {
  getProjectReport,
  getTeamProductivity,
  getOverdueTasks,
  getTimeTrackingReport,
} from "./report.service.js";

export const getProjectReportHandler = async (req: Request, res: Response) => {
  const report = await getProjectReport(req.params.projectId);

  res.status(200).json(report);
};

export const getTeamProductivityHandler = async (req: Request, res: Response) => {
  const report = await getTeamProductivity(req.params.workspaceId);

  res.status(200).json(report);
};

export const getOverdueTasksHandler = async (req: Request, res: Response) => {
  const report = await getOverdueTasks();

  res.status(200).json(report);
};

export const getTimeTrackingReportHandler = async (req: Request, res: Response) => {
  const report = await getTimeTrackingReport(req.user!.userId);

  res.status(200).json(report);
};
