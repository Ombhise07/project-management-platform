import type { Request, Response } from "express";

import { getUserNotifications, markAsRead } from "./notification.service.js";

export const getAll = async (req: Request, res: Response) => {
  const notifications = await getUserNotifications(req.user!.userId);

  res.status(200).json(notifications);
};

export const read = async (req: Request, res: Response) => {
  const notification = await markAsRead(req.params.notificationId);

  res.status(200).json(notification);
};
