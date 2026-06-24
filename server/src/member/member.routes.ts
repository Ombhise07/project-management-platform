import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";

import { addMember, getMembers, deleteMember, getWorkload } from "./member.controller.js";

const router = Router();

router.use(authenticate);

router.post("/", addMember);

router.get("/workspace/:workspaceId", getMembers);

router.get("/workload/:userId", getWorkload);

router.delete("/:memberId", deleteMember);

export default router;
