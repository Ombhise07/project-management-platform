import type { Request, Response } from "express";

import { createTaskSchema } from "./task.validation.js";

import { createTask, getProjectTasks } from "./task.service.js";

import { updateTaskSchema, createSubtaskSchema } from "./task.validation.js";

import { updateTask, deleteTask, createSubtask, completeSubtask } from "./task.service.js";

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

export const update = async (req: Request, res: Response) => {
  try {
    const data = updateTaskSchema.parse(req.body);

    const task = await updateTask(req.params.taskId, data);

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Update failed",
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  await deleteTask(req.params.taskId);

  res.status(200).json({
    message: "Task deleted",
  });
};

export const createSubtaskHandler = async (req: Request, res: Response) => {
  const data = createSubtaskSchema.parse(req.body);

  const subtask = await createSubtask(data.taskId, data.title);

  res.status(201).json(subtask);
};

export const completeSubtaskHandler = async (req: Request, res: Response) => {
  const subtask = await completeSubtask(req.params.subtaskId);

  res.status(200).json(subtask);
};
