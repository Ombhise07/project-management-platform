import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";

import { getAll, read } from "./notification.controller.js";

const router = Router();

router.use(authenticate);

router.get("/", getAll);

router.patch("/:notificationId/read", read);

export default router;
