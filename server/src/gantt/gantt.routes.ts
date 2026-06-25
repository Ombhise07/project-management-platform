import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";

import { getTimeline } from "./gantt.controller.js";

const router = Router();

router.use(authenticate);

router.get("/:projectId", getTimeline);

export default router;
