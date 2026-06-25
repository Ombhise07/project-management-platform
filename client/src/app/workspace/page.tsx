"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { WorkspaceGrid, WorkspaceHeader, CreateWorkspaceModal } from "@/components/workspace";

import { Workspace } from "@/types/workspace";

import { getMyWorkspaces } from "@/services/workspace.service";

import { useProjectStore } from "@/store/project.store";

export default function WorkspacePage() {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);

  /*
      Temporary data

      Later this will come from the backend.
  */

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const [loading, setLoading] = useState(true);

  const setWorkspaceId = useProjectStore((state) => state.setWorkspaceId);

  useEffect(() => {
    const loadWorkspaces = async () => {
      try {
        const response = await getMyWorkspaces();

        const formatted = response.data.map((workspace: any) => ({
          id: workspace.id,

          name: workspace.name,

          description: workspace.description ?? "No description",

          projects: workspace._count.projects,

          members: workspace._count.members,
        }));

        setWorkspaces(formatted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkspaces();
  }, []);

  function handleWorkspaceClick(id: string) {
    /*
        Later:

        Store selected workspace

        Fetch workspace permissions

        Fetch projects

        etc.
    */
    setWorkspaceId(id);

    router.push(`/workspaces/${id}`);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">Loading workspaces...</div>
    );
  }

  {
    workspaces.length === 0 ? (
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold">No Workspaces Yet</h2>

        <p className="mt-3 text-slate-500">Create your first workspace to get started.</p>
      </div>
    ) : (
      <WorkspaceGrid workspaces={workspaces} onWorkspaceClick={handleWorkspaceClick} />
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <WorkspaceHeader onCreateWorkspace={() => setModalOpen(true)} />

        <WorkspaceGrid workspaces={workspaces} onWorkspaceClick={handleWorkspaceClick} />
      </div>

      <CreateWorkspaceModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
