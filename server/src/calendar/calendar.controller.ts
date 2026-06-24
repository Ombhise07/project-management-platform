import type { Request, Response } from "express";

import { getCalendarEvents } from "./calendar.service.js";

export const getEvents = async (req: Request, res: Response) => {
  const events = await getCalendarEvents(req.user!.userId);

  res.status(200).json(events);
};
