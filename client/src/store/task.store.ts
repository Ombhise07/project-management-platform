import { create } from "zustand";

import { Task } from "@/types/task";

type TaskStore = {
  selectedTask: Task | null;

  isDrawerOpen: boolean;

  setSelectedTask: (task: Task | null) => void;

  openDrawer: () => void;

  closeDrawer: () => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  selectedTask: null,

  isDrawerOpen: false,

  setSelectedTask: (task) =>
    set({
      selectedTask: task,
    }),

  openDrawer: () =>
    set({
      isDrawerOpen: true,
    }),

  closeDrawer: () =>
    set({
      isDrawerOpen: false,
      selectedTask: null,
    }),
}));
