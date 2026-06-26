import type { Request, Response } from "express";

import { createProjectSchema } from "./project.validation.js";

import { createProject, getWorkspaceProjects, getProjectById } from "./project.service.js";

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

export const getOne = async (req: Request, res: Response) => {
  try {
    const project = await getProjectById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to fetch project",
    });
  }
};
