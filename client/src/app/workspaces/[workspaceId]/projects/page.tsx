"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { WorkspaceLayout } from "@/components/layout";

import {
  ProjectsHeader,
  ProjectsGrid,
  EmptyProjects,
  CreateProjectModal,
} from "@/components/dashboard";

import { getWorkspaceProjects } from "@/services/project.service";
import { getWorkspaceById } from "@/services/workspace.service";

import { useAuthStore } from "@/store/auth.store";

import { Project } from "@/types/project";

export default function ProjectsPage() {
  const router = useRouter();

  const params = useParams();

  const workspaceId = params.workspaceId as string;

  const user = useAuthStore((state) => state.user);

  const [projects, setProjects] = useState<Project[]>([]);
  const [workspaceName, setWorkspaceName] = useState("Workspace");
  const [loading, setLoading] = useState(true);
  const [projectLoading, setProjectLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const loadProjects = async () => {
    try {
      const response = await getWorkspaceProjects(workspaceId);

      setProjects(response.data);
    } finally {
      setProjectLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      router.replace("/login");

      return;
    }

    const loadWorkspaceData = async () => {
      setLoading(true);

      try {
        const workspaceResponse = await getWorkspaceById(workspaceId);
        setWorkspaceName(workspaceResponse.data.name ?? "Workspace");
      } catch (workspaceError) {
        console.error(workspaceError);
      } finally {
        setLoading(false);
      }
    };

    loadWorkspaceData();
    loadProjects();
  }, [workspaceId, user, router]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => project.name.toLowerCase().includes(search.toLowerCase()));
  }, [projects, search]);

  if (!user) return null;

  return (
    <WorkspaceLayout workspaceId={workspaceId} workspaceName={workspaceName}>
      <ProjectsHeader
        search={search}
        onSearchChange={setSearch}
        onCreateProject={() => setModalOpen(true)}
      />

      {projectLoading ? (
        <p>Loading projects...</p>
      ) : filteredProjects.length === 0 ? (
        <EmptyProjects onCreateProject={() => setModalOpen(true)} />
      ) : (
        <ProjectsGrid projects={filteredProjects} />
      )}

      <CreateProjectModal
        open={modalOpen}
        workspaceId={workspaceId}
        onClose={() => setModalOpen(false)}
        onCreated={loadProjects}
      />
    </WorkspaceLayout>
  );
}
