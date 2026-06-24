import { api } from "@/lib/axios";

export const getCalendarEvents = async () => {
  return api.get("/calendar");
};
