import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";

import {
  create,
  getAll,
  update,
  remove,
  createSubtaskHandler,
  completeSubtaskHandler,
} from "./task.controller.js";

const router = Router();

router.use(authenticate);

router.post("/", create);

router.get("/", getAll);

router.patch("/:taskId", update);

router.delete("/:taskId", remove);

router.post("/subtasks", createSubtaskHandler);

router.patch("/subtasks/:subtaskId/complete", completeSubtaskHandler);

export default router;
