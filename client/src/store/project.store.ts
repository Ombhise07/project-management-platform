import { create } from "zustand";

import { Project } from "@/types/project";

type ProjectStore = {
  workspaceId: string;
  projectId: string;

  project: Project | null;

  setWorkspaceId: (workspaceId: string) => void;
  setProjectId: (projectId: string) => void;

  setProject: (project: Project | null) => void;

  clearProject: () => void;

  clearSelection: () => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  workspaceId: "",

  projectId: "",

  project: null,

  setWorkspaceId: (workspaceId) =>
    set({
      workspaceId,
    }),

  setProjectId: (projectId) =>
    set({
      projectId,
    }),

  setProject: (project) =>
    set({
      project,
      projectId: project?.id ?? "",
      workspaceId: project?.workspaceId ?? "",
    }),

  clearProject: () =>
    set({
      project: null,
      projectId: "",
    }),

  clearSelection: () =>
    set({
      project: null,
      projectId: "",
      workspaceId: "",
    }),
}));
