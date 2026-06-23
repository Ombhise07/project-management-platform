import type { Request, Response } from "express";

import { createTaskSchema } from "./task.validation.js";

import { createTask, getProjectTasks } from "./task.service.js";

export const create = async (req: Request, res: Response) => {
  try {
    const data = createTaskSchema.parse(req.body);

    const task = await createTask(data);

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Task creation failed",
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const projectId = req.query.projectId as string;

  const tasks = await getProjectTasks(projectId);

  res.status(200).json(tasks);
};
