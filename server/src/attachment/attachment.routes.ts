import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";

import { upload } from "../middleware/upload.js";

import { uploadFile, getAll } from "./attachment.controller.js";

const router = Router();

router.use(authenticate);

router.post("/", upload.single("file"), uploadFile);

router.get("/", getAll);

export default router;
