import type { Request, Response } from "express";

import { createProjectSchema } from "./project.validation.js";

import { createProject, getWorkspaceProjects } from "./project.service.js";

export const create = async (req: Request, res: Response) => {
  try {
    const data = createProjectSchema.parse(req.body);

    const project = await createProject(req.user!.userId, data);

    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Project creation failed",
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const workspaceId = req.query.workspaceId as string;

  const projects = await getWorkspaceProjects(workspaceId);

  res.status(200).json(projects);
};
