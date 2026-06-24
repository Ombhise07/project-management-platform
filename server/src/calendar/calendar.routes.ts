import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";

import { getEvents } from "./calendar.controller.js";

const router = Router();

router.use(authenticate);

router.get("/", getEvents);

export default router;
