import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";

import {
  getProjectReportHandler,
  getTeamProductivityHandler,
  getOverdueTasksHandler,
  getTimeTrackingReportHandler,
} from "./report.controller.js";

const router = Router();

router.use(authenticate);

router.get("/project/:projectId", getProjectReportHandler);

router.get("/team/:workspaceId", getTeamProductivityHandler);

router.get("/overdue", getOverdueTasksHandler);

router.get("/time", getTimeTrackingReportHandler);

export default router;
