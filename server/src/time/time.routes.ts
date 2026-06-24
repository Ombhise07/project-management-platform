import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";

import { create, getSummary } from "./time.controller.js";

const router = Router();

router.use(authenticate);

router.post("/", create);

router.get("/task/:taskId", getSummary);

export default router;
