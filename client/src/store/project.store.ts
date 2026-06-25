import { create } from "zustand";

type ProjectStore = {
  projectId: string;
  workspaceId: string;

  setProjectId: (projectId: string) => void;

  setWorkspaceId: (workspaceId: string) => void;

  clearSelection: () => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  projectId: "",

  workspaceId: "",

  setProjectId: (projectId) => set({ projectId }),

  setWorkspaceId: (workspaceId) => set({ workspaceId }),

  clearSelection: () =>
    set({
      projectId: "",
      workspaceId: "",
    }),
}));
