import type { Request, Response } from "express";

import { createWorkspaceSchema } from "./workspace.validation.js";

import { createWorkspace, getUserWorkspaces, getWorkspaceById } from "./workspace.service.js";

export const create = async (req: Request, res: Response) => {
  try {
    const data = createWorkspaceSchema.parse(req.body);

    const workspace = await createWorkspace(req.user!.userId, data.name, data.description);

    res.status(201).json(workspace);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Failed to create workspace",
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const workspaces = await getUserWorkspaces(req.user!.userId);

  res.status(200).json(workspaces);
};

export const getById = async (req: Request, res: Response) => {
  const workspace = await getWorkspaceById(req.params.workspaceId);

  if (!workspace) {
    return res.status(404).json({ message: "Workspace not found" });
  }

  res.status(200).json(workspace);
};
