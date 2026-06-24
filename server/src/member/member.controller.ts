import type { Request, Response } from "express";

import { addMemberSchema } from "./member.validation.js";

import {
  addWorkspaceMember,
  getWorkspaceMembers,
  removeMember,
  getUserWorkload,
} from "./member.service.js";

export const addMember = async (req: Request, res: Response) => {
  const data = addMemberSchema.parse(req.body);

  const member = await addWorkspaceMember(data.workspaceId, data.email, data.role);

  res.status(201).json(member);
};

export const getMembers = async (req: Request, res: Response) => {
  const members = await getWorkspaceMembers(req.params.workspaceId);

  res.status(200).json(members);
};

export const deleteMember = async (req: Request, res: Response) => {
  await removeMember(req.params.memberId);

  res.status(200).json({
    message: "Member removed",
  });
};

export const getWorkload = async (req: Request, res: Response) => {
  const workload = await getUserWorkload(req.params.userId);

  res.status(200).json(workload);
};
