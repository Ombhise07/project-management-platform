import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";

import { create, getAll, getOne } from "./project.controller.js";

const router = Router();

router.use(authenticate);

router.post("/", create);

router.get("/", getAll);

router.get("/:projectId", getOne);

export default router;
