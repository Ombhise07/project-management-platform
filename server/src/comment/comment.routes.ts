import { Router } from "express";

import { authenticate } from "../middleware/authenticate";

import { create, getAll } from "./comment.controller";

const router = Router();

router.use(authenticate);

router.post("/", create);

router.get("/", getAll);

export default router;
