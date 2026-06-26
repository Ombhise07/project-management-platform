"use client";

import { ProjectOverview } from "@/components/project";
import { useProjectStore } from "@/store/project.store";

export default function ProjectOverviewPage() {
  const project = useProjectStore((state) => state.project);

  if (!project) {
    return <p>Loading project...</p>;
  }

  return <ProjectOverview project={project} />;
}
