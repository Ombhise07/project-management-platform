"use client";

import { ReactNode, useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { ProjectLayout } from "@/components/layouts/project";

import { getProjectById } from "@/services/project.service";

import { useProjectStore } from "@/store/project.store";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const params = useParams();

  const workspaceId = params.workspaceId as string;

  const projectId = params.projectId as string;

  const project = useProjectStore((state) => state.project);

  const setProject = useProjectStore((state) => state.setProject);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await getProjectById(projectId);

        setProject(response.data);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId, setProject]);

  if (loading) {
    return (
      <ProjectLayout workspaceId={workspaceId} projectId={projectId} projectName="Loading...">
        <p>Loading project...</p>
      </ProjectLayout>
    );
  }

  if (!project) {
    return (
      <ProjectLayout workspaceId={workspaceId} projectId={projectId} projectName="Project">
        <p>Project not found.</p>
      </ProjectLayout>
    );
  }

  return (
    <ProjectLayout
      workspaceId={workspaceId}
      projectId={projectId}
      projectName={project.name}
      description={project.description ?? ""}
    >
      {children}
    </ProjectLayout>
  );
}
