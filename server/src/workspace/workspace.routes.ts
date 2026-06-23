import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";

import { create, getAll } from "./workspace.controller.js";

const router = Router();

router.use(authenticate);

router.post("/", create);
router.get("/", getAll);

export default router;
