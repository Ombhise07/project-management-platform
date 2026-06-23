import type { Request, Response } from "express";

import { createAttachment, getTaskAttachments } from "./attachment.service.js";

export const uploadFile = async (req: Request, res: Response) => {
  console.log("FILE:", req.file);
  console.log("BODY:", req.body);

  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  const taskId = req.body.taskId;

  const attachment = await createAttachment(req.user!.userId, taskId, req.file);

  res.status(201).json(attachment);
};

export const getAll = async (req: Request, res: Response) => {
  const taskId = req.query.taskId as string;

  const files = await getTaskAttachments(taskId);

  res.status(200).json(files);
};
